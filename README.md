# Crypto Dashboard

Dashboard de seguimiento de criptomonedas en tiempo real con diseño glassmorphism futurista.

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Django 6 + Django REST Framework |
| Base de datos | SQLite |
| API externa | CoinGecko API |
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 |
| Charts | Recharts |
| Fetching | TanStack React Query |
| Routing | React Router DOM v7 |
| Iconos | Lucide React |

---

## 📁 Arquitectura del Frontend (guía de aprendizaje)

```
dashboard_project_front/
├── index.html              # Entry point + Google Fonts (Outfit + Plus Jakarta Sans)
├── vite.config.js           # Vite + proxy /api → backend Django
└── src/
    ├── main.jsx             # Bootstrap: React Query Provider + BrowserRouter
    ├── App.jsx              # Router: 2 rutas (Dashboard + Detalle)
    ├── index.css            # Sistema de diseño Tailwind v4 + animaciones glass
    │
    ├── api/
    │   └── cryptoApi.js     # 🧠 CAPA DE SERVICIOS: funciones fetch puras
    │
    ├── hooks/
    │   ├── useCoins.js      # 🧠 REACT QUERY: lista de monedas (caché 30s)
    │   ├── useSnapshots.js  # 🧠 REACT QUERY: snapshots (auto-refetch cada 15s)
    │   └── useCoinHistory.js# 🧠 REACT QUERY: historial + último snapshot
    │
    ├── utils/
    │   └── formatters.js    # Formateo de precios, market cap, %, fechas
    │
    ├── components/
    │   ├── ui/              # Base: GlassCard, LoadingSkeleton, PriceDisplay...
    │   ├── layout/          # AppLayout, Sidebar, Header
    │   └── crypto/          # CoinTable, PriceChart, MarketOverview...
    │
    └── pages/
        ├── DashboardPage.jsx   # Vista general
        └── CoinDetailPage.jsx  # Detalle por moneda
```

---

## 🧠 Conceptos Clave Explicados

### 1. ¿Cómo se conecta el frontend con el backend?

```
Navegador → localhost:5173/api/coins/ → Vite proxy → localhost:8000/api/coins/
```

**El problema:** Normalmente el frontend en `:5173` no puede llamar al backend en `:8000` por **CORS** (el navegador bloquea peticiones a distinto origen).

**Solución A (actual):** Configuramos un **proxy** en `vite.config.js`. Vite intercepta las llamadas a `/api/*` y las redirige al backend. El navegador cree que todo viene del mismo origen. Así:

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
    },
  },
}
```

**Solución B (alternativa):** `django-cors-headers` ya está configurado en el backend. Podríamos eliminar el proxy y llamar directamente a `http://127.0.0.1:8000/api/coins/`, pero el proxy es más limpio y las URLs quedan relativas (`/api/coins/` en vez de la URL completa).

---

### 2. ¿Qué hace React Query? (useQuery)

Sin React Query, harías:
```jsx
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
useEffect(() => {
  fetch('/api/coins/')
    .then(r => r.json())
    .then(d => { setData(d); setLoading(false) })
}, [])
```

Problemas: No hay caché, no hay refetch automático, si cambias de página y vuelves, se refetcha. Múltiples componentes que piden lo mismo hacen N llamadas.

Con React Query:
```jsx
const { data, isLoading } = useQuery({
  queryKey: ['coins'],       // Identificador único para caché
  queryFn: fetchCoins,       // Función que hace el fetch
  staleTime: 30000,          // 30s antes de considerar datos "viejos"
  refetchInterval: 15000,    // Auto-refresh cada 15s (para "tiempo real")
})
```

Automáticamente:
- Cachea los datos por `queryKey`
- Refetch en segundo plano cuando los datos están "stale"
- Refetch al hacer focus en la ventana
- Deduplica peticiones (2 componentes que usan `useCoins` hacen 1 sola llamada)
- Provee `isLoading`, `isError`, `data`, `isFetching`...

---

### 3. Glassmorphism con Tailwind v4

Tailwind v4 cambió: ahora se configura con `@theme` en CSS en vez de `tailwind.config.js`.

```css
@import "tailwindcss";

@theme {
  --color-glass: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.06);
}
```

El efecto glass es una combinación de:
- `bg-glass` → fondo semitransparente
- `backdrop-blur-xl` → desenfoque del fondo detrás
- `border border-glass-border` → borde sutil
- `rounded-2xl` → esquinas redondeadas

El `GlassCard` componente encapsula esto para reutilizarlo en todo el dashboard.

---

### 4. Flujo de datos en el Dashboard

```
1. AppLayout monta el Header + Sidebar
2. AppLayout usa useSnapshots() → fetch a /api/snapshots/ cada 15s
3. DashboardPage recibe coins (useCoins) + snapshots (useSnapshots)
4. MarketOverview: calcula totales desde los snapshots
5. CoinTable: agrupa snapshots por moneda, muestra el más reciente
6. CoinDetailPage: al hacer click en una moneda, navega a /coin/:id
7. CoinDetailPage: usa useCoinHistory(id) + useLastSnapshot(id)
8. PriceChart: renderiza con Recharts los datos históricos
```

---

### 5. ¿Por qué estas dependencias?

| Librería | ¿Para qué? | ¿Alternativa? |
|---|---|---|
| `react-router-dom` | Navegación entre Dashboard (/) y detalle (/coin/bitcoin) | Sin router = una sola página |
| `@tanstack/react-query` | Caché, auto-refetch, estados loading/error | Custom hooks con useEffect |
| `recharts` | Gráficos interactivos de precio | Canvas/SVG a mano, Chart.js |
| `lucide-react` | Iconos consistentes | SVGs inline, Heroicons |

Cada una resuelve un problema específico en vez de reinventar la rueda.

---

## 🚀 Cómo ejecutar

### Backend

```bash
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py generate_snapshots
python manage.py runserver
```

### Frontend

```bash
cd dashboard_project_front
npm install
npm run dev
```

Abrir `http://localhost:5173` 🚀

---

## 🛠️ Próximos pasos para aprender

Si quieres profundizar, intenta:

1. **Agregar WebSocket** (Django Channels + Socket.io) en vez de polling
2. **Agregar filtros** (por precio, market cap) a la tabla
3. **AGREGAR MÁS RUTAS**: comparativa entre monedas, portafolio personal
4. **Persistencia de búsqueda** en URL con searchParams
5. **Modo oscuro/claro** toggle
6. **Testing**: Vitest + React Testing Library
7. **Estado global**: Context API o Zustand para preferencias de usuario

---

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/coins/` | Lista de monedas (name, symbol, coingecko_id) |
| `GET` | `/api/coins/<id>/` | Detalle de una moneda |
| `GET` | `/api/coins/<id>/history` | Historial de precios (timestamp + price) |
| `GET` | `/api/coins/<id>/latest` | Último snapshot |
| `GET` | `/api/snapshots/` | Últimos 100 snapshots con datos anidados |

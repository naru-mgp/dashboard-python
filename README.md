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

# Crypto Dashboard

Dashboard de seguimiento de criptomonedas en tiempo real con diseño glassmorphism.

| Capa | Tecnología |
|------|-----------|
| Backend | Django 6 + Django REST Framework |
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 |
| Base de datos | SQLite |
| API externa | CoinGecko API |
| Charts | Recharts |
| Data fetching | TanStack React Query |
| Routing | React Router DOM v7 |
| Iconos | Lucide React |

---

## Requisitos

- **Python 3.10+** instalado
- **Node.js 20+** y **npm** instalados
- Conexión a Internet (para llamar a CoinGecko API)

Verificar instalaciones:

```bash
python --version
node --version
npm --version
```

---

## 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd proyecto_cripto
```

---

## 2. Backend (Django)

### 2.1 Crear y activar entorno virtual

**Linux / macOS:**

```bash
cd backend
python -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```cmd
cd backend
python -m venv venv
venv\Scripts\activate
```

### 2.2 Instalar dependencias

```bash
pip install -r requirements.txt
```

### 2.3 Ejecutar migraciones

```bash
python manage.py migrate
```

### 2.4 Crear superusuario (opcional, para acceder al admin)

```bash
python manage.py createsuperuser
```

### 2.5 Poblar la base de datos con monedas

Hay dos formas:

**Opción A — Cargar desde el admin:**

1. Inicia el servidor: `python manage.py runserver`
2. Ve a `http://127.0.0.1:8000/admin/`
3. Inicia sesión con el superusuario creado antes
4. Agrega monedas en la sección **Coins** (nombre, símbolo, coingecko_id)

Ejemplos de monedas:

| name | symbol | coingecko_id |
|------|--------|-------------|
| Bitcoin | BTC | bitcoin |
| Ethereum | ETH | ethereum |
| Solana | SOL | solana |
| Cardano | ADA | cardano |
| Polkadot | DOT | polkadot |

**Opción B — Cargar desde la shell:**

```bash
python manage.py shell
```

```python
from core.models import Coin
coins_data = [
    ("Bitcoin", "BTC", "bitcoin"),
    ("Ethereum", "ETH", "ethereum"),
    ("Solana", "SOL", "solana"),
    ("Cardano", "ADA", "cardano"),
    ("Polkadot", "DOT", "polkadot"),
]
for name, symbol, cg_id in coins_data:
    Coin.objects.get_or_create(name=name, symbol=symbol, coingecko_id=cg_id)
exit()
```

### 2.6 Generar datos de precios

```bash
python manage.py generate_snapshots
```

Este comando consulta CoinGecko y guarda el precio, market cap y volumen de cada moneda.

### 2.7 Iniciar servidor backend

```bash
python manage.py runserver
```

El backend queda corriendo en `http://127.0.0.1:8000/`.

---

## 3. Frontend (React + Vite)

Abre **otra terminal** (el backend debe seguir corriendo).

### 3.1 Instalar dependencias

```bash
cd dashboard_project_front
npm install
```

### 3.2 Iniciar servidor de desarrollo

```bash
npm run dev
```

El frontend arranca en `http://localhost:5173/`.

Vite está configurado con un proxy que redirige las llamadas a `/api/*` hacia el backend en `http://127.0.0.1:8000`, por lo que no hay problemas de CORS en desarrollo.

---

## 4. Abrir la aplicación

Ve a **http://localhost:5173/** en el navegador.

---

## Comandos rápidos (resumen)

```bash
# Terminal 1 — Backend
cd backend
source venv/bin/activate          # Linux
# venv\Scripts\activate           # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # opcional
python manage.py generate_snapshots
python manage.py runserver

# Terminal 2 — Frontend
cd dashboard_project_front
npm install
npm run dev
```

---

## API endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/coins/` | Lista de monedas |
| GET | `/api/coins/<id>/` | Detalle de una moneda |
| GET | `/api/coins/<id>/history` | Historial de precios |
| GET | `/api/coins/<id>/latest` | Último snapshot |
| GET | `/api/snapshots/` | Últimos 100 snapshots |
| GET | `/admin/` | Panel de administración Django |

---

## Build de producción

```bash
cd dashboard_project_front
npm run build
```

Genera los archivos estáticos en `dashboard_project_front/dist/`. Puedes servirlos con cualquier servidor estático o configurar Django para que los sirva en producción.

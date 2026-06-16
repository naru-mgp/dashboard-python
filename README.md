# Crypto Dashboard

Dashboard de seguimiento de criptomonedas en tiempo real. Consulta precios, capitalización de mercado y volumen de trading de las principales criptomonedas usando la API de CoinGecko.

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Django 6 + Django REST Framework |
| Base de datos | SQLite |
| API externa | CoinGecko API |
| Frontend | React 19 + Vite |
| CORS | django-cors-headers |

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/coins/` | Lista de monedas rastreadas |
| `GET` | `/api/coins/<id>/` | Detalle de una moneda |
| `GET` | `/api/coins/<id>/history` | Historial de precios |
| `GET` | `/api/coins/<id>/lastest` | Último snapshot |
| `GET` | `/api/snapshots/` | Últimos 100 snapshots |

## Cómo ejecutar

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py generate_snapshots   # obtiene datos de CoinGecko
python manage.py runserver
```

### Frontend

```bash
cd dashboard_project_front
npm install
npm run dev
```

## Comandos útiles

```bash
python manage.py generate_snapshots   # actualizar snapshots manualmente
```

El frontend corre en `http://localhost:5173` y el backend en `http://localhost:8000`.

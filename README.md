# Full CI/CD Pipeline

A full CI/CD pipeline using **GitHub Actions** that builds, tests, and pushes Dockerized frontend and backend services to Docker Hub — with a live MySQL service for integration testing.

---

## Architecture

```
  GitHub Push (main)
        │
        ▼
  GitHub Actions
        │
  ┌─────┴──────────────────────────────────┐
  │  1. Install backend dependencies       │
  │  2. Spin up MySQL service container    │
  │  3. Initialize database (init.sql)     │
  │  4. Start backend & test API           │
  │  5. Build Docker images                │
  │  6. Push to Docker Hub                 │
  └────────────────────────────────────────┘
        │
        ▼
  Docker Hub
  ├── <username>/task-backend
  └── <username>/task-frontend
```

---

## Project Structure

```
ci-cdproject/
├── backend/          # Node.js Express API (port 8080)
│   └── Dockerfile
├── frontend/         # Nginx static frontend (port 80)
│   └── Dockerfile
├── mysql/
│   └── init.sql      # Database initialization script
└── docker-compose.yml
```

---

## CI/CD Pipeline Steps

| Step                      | Description                                      |
|---------------------------|--------------------------------------------------|
| Checkout Code             | Clones the repository                            |
| Setup Node 18             | Installs Node.js runtime                         |
| Install Dependencies      | Runs `npm install` in the backend directory      |
| MySQL Service             | Spins up MySQL 8 container with healthcheck      |
| Initialize Database       | Runs `init.sql` against the MySQL service        |
| Start Backend             | Starts the Node.js server in the background      |
| Test API                  | `curl http://localhost:8080/tasks` smoke test    |
| Build Images              | Builds backend and frontend Docker images        |
| Push to Docker Hub        | Pushes both images to Docker Hub                 |

---

## Run Locally

```bash
# Copy and fill in environment variables
cp .env.example .env

# Start all services
docker compose up --build
```

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:3000     |
| Backend  | http://localhost:8080     |
| MySQL    | localhost:3307            |

---

## Secrets Required

Add these in **GitHub → Settings → Secrets → Actions**:

| Secret            | Description               |
|-------------------|---------------------------|
| `DOCKER_USERNAME` | Your Docker Hub username  |
| `DOCKER_PASSWORD` | Your Docker Hub password  |

---

## Tech Stack

- Node.js 18 / Express — Backend
- Nginx — Frontend
- MySQL 8 — Database
- Docker & Docker Compose
- GitHub Actions

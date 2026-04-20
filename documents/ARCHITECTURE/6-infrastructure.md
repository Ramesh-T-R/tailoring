# 6. Infrastructure
## Environment Management
The system requires the following environment variables (defined in `.env`):
- `PORT`: API server port (default: 5001).
- `MONGODB_URI`: Connection string for MongoDB Atlas or local instance.

## Deployment Strategy
- **Frontend:** Static hosting (Vercel/Netlify) via Vite build output.
- **Backend:** Containerized Express app (Docker) or Node-ready PaaS (Railway/Heroku).
- **Database:** MongoDB Atlas (Managed Document Store).

## Monitoring
- (Roadmap) Integration with Sentry for frontend error tracking.
- (Roadmap) Prometheus/Grafana for API metrics and database performance monitoring.

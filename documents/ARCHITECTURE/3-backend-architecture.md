# 3. Backend Architecture
The backend is a TypeScript-driven REST service optimized for JSON document persistence.

## Service Stack
- **Runtime:** Node.js with Express.
- **Data Modeling:** Mongoose for schema-based MongoDB interactions.
- **Validation:** Zod schemas are used to enforce physical constraints (e.g., non-negative measurements) at the API gateway, preventing invalid data from entering the database.

## Domain Models
### Project Model (`IProject`)
The central document containing:
- **Identity:** Unique project and customer IDs.
- **Measurements:** Nested profile with strict numeric bounds.
- **Fabric:** Material properties including stretch coefficients and recommended tool settings.
- **DesignCategory:** Managed list of pattern categories (e.g., Sleeves, Collars).
- **Pieces:** Array of geometric points representing the pattern pieces.

## Planned Middleware
- **Morgan/Winston:** For structured logging of API requests and error states.
- **Health Check Endpoint:** `/api/health` for monitoring service availability.
- **Rate Limiting:** (Roadmap) To prevent abuse of the measurement update endpoints.

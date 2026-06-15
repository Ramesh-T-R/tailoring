# 3. Backend Architecture
The backend is a TypeScript REST service (Express 5) optimized for JSON document persistence.

## Service Stack
- **Runtime:** Node.js with Express 5 (run via `ts-node-dev` in development).
- **Data Modeling:** Mongoose for schema-based MongoDB interactions.
- **Validation:** Zod schemas validate request bodies at the controller layer (e.g. `ProjectSchema`, `FabricSchema`). Update endpoints validate against a partial schema.
- **Middleware:** `cors` and JSON body parsing. Sentry packages (`@sentry/node`, `@sentry/profiling-node`) are installed.
- **Entry point:** `server/src/index.ts` connects to MongoDB, then starts the HTTP listener.

## API Surface (routes)
Mounted under `/api`:
- `/api/projects`
- `/api/measurement-types`
- `/api/size-charts` (also exposes size types)
- `/api/dress-types`
- `/api/design-categories`
- `/api/designs`

Each resource follows routes → controller → Zod schema → Mongoose model.

## Domain Models
### Core Entities
- **Project (`IProject`):** Central document linking customer info, a Dress Type reference, selected design combinations, a size type, a `measurements` array of `{ measurementTypeId, value }`, a `fabric` sub-document, `pieces`, and a `version`.
- **Dress Type:** Garment blueprint `{ name, gender, description, sizeChartId, designCombinations[] }`.
- **Size Chart:** `{ name, gender, entries[] }`, where each entry is `{ sizeTypeId, measurementTypeId, unit (cm/in), value }`.
- **Size Type:** Standard size label (e.g. S/M/L).
- **Measurement Type:** `{ name, description }`. *(No icons or validation ranges are stored on the model today — value-range checks like 0–250 are enforced in the Size Chart UI.)*
- **Design Category & Design:** Modular components — a Design `{ name, category, description }` belongs to a Design Category `{ name }`.

### Relationships
- Projects reference a **Dress Type**.
- Dress Types reference a **Size Chart** and contain **Design Combinations** (arrays of Design IDs).
- Size Chart entries reference **Size Types** and **Measurement Types**.

## Known Schema Divergence
- The project `fabric` sub-document uses `recommendedPresserFoot` (and has no thread field) on the server, while the frontend sends `recommendedFoot` / `recommendedThread`. Because Zod strips unknown keys, these client fields are dropped on save. This should be reconciled to a single naming.

## Planned / Not Yet Implemented
- **Structured request logging** (e.g. Morgan/Winston) — not present.
- **Health Check Endpoint** (`/api/health`) — not present.
- **Rate Limiting** — not present.
- **Server-side physical/geometric validation** — currently minimal (type/shape validation only); richer domain validation is a roadmap item.

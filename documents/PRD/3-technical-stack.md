# 3. Technical Stack

> Reverse-engineered from `package.json`, `server/package.json`, and source. Reflects the dependencies actually in use.

## Frontend
- **Framework:** React 18 + TypeScript, built with **Vite 5**.
- **UI:** **Material UI v9** (`@mui/material`, `@mui/icons-material`) with Emotion (`@emotion/react`, `@emotion/styled`); Tailwind CSS utilities are also present for some custom styling.
- **3D/Graphics:** **Three.js** via `@react-three/fiber` and `@react-three/drei` for the real-time garment visualizer.
- **Icons:** `lucide-react` (in addition to MUI icons).
- **Monitoring:** `@sentry/react`.
- **State Management:** Local React state via the `useAppLogic` hook plus component-level state (e.g. `ProjectSetup`). Data is synced to the backend through fetch-based service modules. *(Note: a custom `StoreManager` class exists but is not part of the live app.)*

## Backend
- **Runtime:** Node.js with **Express 5** (TypeScript), run via `ts-node-dev` in development.
- **Data Modeling:** **Mongoose** for schema-based MongoDB access.
- **Validation:** **Zod** schemas validate request bodies at the controller layer.
- **Monitoring:** `@sentry/node`, `@sentry/profiling-node` (dependencies present).
- **Middleware:** `cors` and JSON body parsing.

## Database
- **MongoDB** (local by default: `mongodb://localhost:27017/thaiyalagam`; MongoDB Atlas supported via `MONGODB_URI`).
- Stores projects and all configuration entities (Measurement Types, Size Charts, Size Types, Dress Types, Design Categories, Designs).

## Architecture
- **Feature-based modular frontend** (`src/features/{tailoring,config,visualization}`) with a shared service/type layer.
- **REST API** backend organized into routes → controllers → Zod schemas → Mongoose models.

## Known Build Caveat
- The Vite dev server runs, but `npm run build` (which runs `tsc`) currently **fails type-checking** (notably a missing `MeasurementProfile` type and an MUI v5-vs-v9 `Grid` API mismatch). Type-safety is therefore **not currently guaranteed at build time** — see Current Status.

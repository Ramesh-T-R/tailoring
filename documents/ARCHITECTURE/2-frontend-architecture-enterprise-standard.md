# 2. Frontend Architecture (Feature-Based)
The frontend uses a feature-based modular structure to isolate domain logic.

## Feature Organization
- `src/features/tailoring/`: Project lifecycle — the dashboard/home (`HomePage`), the project setup/edit screen (`ProjectSetup`), and the `useAppLogic` orchestration hook.
- `src/features/config/`: The administrative configuration suite (Measurement Types, Size Charts, Size Types, Dress Types, Design Categories, Designs) — each with its own components, types, and API service.
- `src/features/visualization/`: The real-time 3D garment visualizer (`PatternVisualizer`) built on `@react-three/fiber`. *(An experimental 2D `ConstraintSolver` in `logic/geometry.ts` also lives here but is not on the live render path.)*

## Core Components

### 1. Application State (`useAppLogic`)
Located in `src/features/tailoring/hooks/useAppLogic.ts`, this hook is the actual state and navigation controller.
- **View Routing:** A `view` state string selects which screen `App.tsx` renders (home, setup, studio/edit, and the config pages).
- **Project State:** Holds the project list and current project in React state; loads via `projectService.getAll()` on mount; creates/updates/deletes via the service layer.
- **Save Model:** Persistence is explicit (on save), sending the full project payload. There is no optimistic/debounced sync.

### 2. Project Setup (`ProjectSetup`)
The single-page project definition screen.
- Renders a measurement input **per Measurement Type** loaded from the backend (dynamic, not hardcoded).
- Auto-populates measurements from the selected `SizeChart` entry for a chosen `SizeType`, with cm/in conversion.
- Embeds the live `PatternVisualizer` for immediate feedback.

### 3. Garment Geometry (`PatternVisualizer`)
The live geometry engine.
- Maps named Measurement Types (Chest, Waist, Length, Shoulder Width, Shoulder to Bust, Apex to Apex) to a parametric **"Princess Cut"** bodice built with `three.js` shapes/curves, with defaults when a measurement is absent.

### 4. Service Layer
Domain-specific services in `src/features/config/api/` and `src/services/` abstract fetch-based communication with the backend.
- **Type Safety:** Shared TypeScript interfaces describe API entities (Project, DressType, SizeChart, MeasurementType, etc.).
- **Error Handling:** Services throw on non-OK responses; callers log and surface errors in the UI.

## Components Present But Not Wired
To keep this document accurate, the following exist in the codebase but are **not rendered** by the current app:
- `ProjectDashboard` (the "studio" edit screen is served by `ProjectSetup` instead).
- `MeasurementForm` (fixed-field parametric sliders) — superseded by dynamic capture.
- `StoreManager` (`src/store/projectStore.ts`) — in-memory undo/history stack.
- `ConstraintSolver` (`src/features/visualization/logic/geometry.ts`) — 2D pattern solver.
- `StitchToolkit` / `FabricExpert` — fabric/tooling recommendation UI and logic.

## Key Design Principles
- **Segregation of Concerns:** Components (JSX), hooks/logic, and styled/theme modules are separated.
- **Feature Modularity:** Each domain owns its components, types, and services.
- **Honest State:** State is plain React today; richer state management (history/undo, optimistic sync) is a future direction, not a current guarantee.

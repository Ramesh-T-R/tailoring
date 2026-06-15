# 2. Frontend Architecture (Enterprise Standard)
The frontend utilizes a feature-based modular structure to isolate domain logic and ensure horizontal scalability of the codebase.

## Core Architectural Components

### 1. State Management (`StoreManager`)
Located in `src/store/projectStore.ts`, the `StoreManager` is an in-memory state orchestrator. 
- **Volatile History:** Implements a stack-based undo/redo mechanism for the active session. Snapshots are not persisted to the database.
- **Pruning:** History is limited to the last 50 snapshots to prevent memory exhaustion.
- **Sync Pattern:** Local state is updated immediately (optimistic), followed by a debounced background synchronization to the server for the latest project state.

### 2. Geometric Logic (`ConstraintSolver`)
The `ConstraintSolver` (in `src/features/visualization/logic/geometry.ts`) is the "brain" of the application.
- **Parametric Ripple:** Maps physical measurements (chest, waist, etc.) to 2D vector coordinates (`Vector2D`).
- **Terminology:** Replaces the vague "Scientific Measurement System" with a formal constraint-based geometric engine.

### 3. View Management (`useAppLogic`)
The application navigation and workflow state is controlled by the `useAppLogic` hook (in `src/features/tailoring/hooks/useAppLogic.ts`).
- **Workflow Stepper:** Manages the transition between different project setup stages (Selection, Configuration, Visualization).
- **View Routing:** A virtual router that determines which component to render based on the current context (e.g., `ATELIER_CONFIG`, `PROJECT_DASHBOARD`).

### 4. Service Layer
Domain-specific services (e.g., `designService`, `sizeChartService`) in `src/features/config/api/` abstract the fetch-based communication with the backend.
- **Type Safety:** Shared TypeScript interfaces ensure consistency between API responses and frontend state.
- **Error Handling:** Standardized response parsing and error notification integration.

## Feature Organization
- `src/features/tailoring/`: Manages the project lifecycle, dashboard, and the project setup wizard.
- `src/features/config/`: Contains the administrative tools for defining atelier blueprints (Size Charts, Dress Types, etc.).
- `src/features/visualization/`: Contains the Three.js 3D mannequin and HTML5 Canvas 2D blueprint engines.

## Key Design Principles
- **Segregation of Concerns:** Explicit separation of UI components (JSX), business logic (Hooks/Solvers), and presentation (Styled Components).
- **Debounced Sync:** User inputs are debounced at the component level before reaching the `ProjectService` to protect the API from excessive load.

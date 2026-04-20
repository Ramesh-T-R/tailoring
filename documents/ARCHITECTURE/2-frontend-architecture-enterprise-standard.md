# 2. Frontend Architecture (Enterprise Standard)
The frontend utilizes a feature-based modular structure to isolate domain logic and ensure horizontal scalability of the codebase.

## Core Architectural Components

### 1. State Management (`StoreManager`)
Located in `src/store/projectStore.ts`, the `StoreManager` is an in-memory state orchestrator. 
- **History Support:** Implements a stack-based undo/redo mechanism.
- **Pruning:** History is limited to the last 50 snapshots to prevent memory exhaustion during long design sessions.
- **Optimistic Updates:** Local state is updated immediately, with background synchronization to the server.

### 2. Geometric Logic (`ConstraintSolver`)
The `ConstraintSolver` (in `src/features/visualization/logic/geometry.ts`) is the "brain" of the application.
- **Parametric Ripple:** Maps physical measurements (chest, waist, etc.) to 2D vector coordinates (`Vector2D`).
- **Terminology:** Replaces the vague "Scientific Measurement System" with a formal constraint-based geometric engine.

### 3. Feature Organization
- `src/features/tailoring/`: Manages the project lifecycle and atelier configurations.
- `src/features/visualization/`: Contains the Three.js 3D mannequin and HTML5 Canvas 2D blueprint engines.

## Key Design Principles
- **Segregation of Concerns:** Explicit separation of UI components (JSX), business logic (Hooks/Solvers), and presentation (Styled Components).
- **Debounced Sync:** User inputs are debounced at the component level before reaching the `ProjectService` to protect the API from excessive load.

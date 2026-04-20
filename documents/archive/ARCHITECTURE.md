# Architecture: Thaiyalagam (Scientific Atelier)

## 1. High-Level Overview
The system follows a modern **Enterprise-Grade React** frontend architecture coupled with a **Node.js/Express REST API** and a **Document Database (MongoDB)** for persistent, version-controlled craftsmanship.

## 2. Frontend Architecture (Enterprise Standard)
The frontend is organized using a **Feature-Based** structure (Udacity Standard) to ensure high maintainability and horizontal scalability.

### Core Directory Structure:
- `src/features/`: Domain-specific logic, components, and hooks.
    - `tailoring/`: Project lifecycle management.
    - `visualization/`: 2D/3D parametric engines (Three.js/Canvas).
- `src/layouts/`: Shared layout components (Sidebar, AppContainer).
- `src/components/`: Atomic, reusable UI elements.
- `src/services/`: Global API client and service layer.
- `src/store/`: State management with history support.
- `src/styles/`: Centralized MUI theme and styled-component layouts.

### Key Design Principles:
- **Segregation of Concerns:** Separation of XML (JSX), Code (Hooks), and Styles (Styled Components).
- **Colocation:** Feature-specific assets live within their respective feature folders.
- **Parametric Ripple Logic:** Changes in measurements ripple through the geometric constraint solver to update 2D/3D visualizations.

## 3. Backend Architecture
The backend is a lightweight, scalable REST service.

- **Stack:** Node.js, Express, TypeScript, Mongoose.
- **Pattern:** Controller-Model architecture.
- **Persistence:** MongoDB Atlas (Document Database) for JSON-serializable project snapshots.

## 4. Data Flow
1. **Input:** User adjusts "Parametric Sliders" in the UI.
2. **Local Sync:** `useAppLogic` updates the `StoreManager`.
3. **Geometric Solver:** `ConstraintSolver` recalculates pattern points.
4. **Persistence:** `ProjectService` pushes an asynchronous update to the REST API.
5. **Storage:** MongoDB stores the updated project document with an incremented version number.

## 5. Security & Stability
- **Type Safety:** Full-stack TypeScript integration.
- **Scalability:** Feature-based modularity allows for easy addition of new garment types or atelier tools.
- **Version Control:** Immutable state snapshots stored in the document DB.

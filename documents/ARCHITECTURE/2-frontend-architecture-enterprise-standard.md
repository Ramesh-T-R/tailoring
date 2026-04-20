# 2. Frontend Architecture (Enterprise Standard)
The frontend is organized using a **Feature-Based** structure (Udacity Standard) to ensure high maintainability and horizontal scalability.

## Core Directory Structure:
- `src/features/`: Domain-specific logic, components, and hooks.
    - `tailoring/`: Project lifecycle management.
    - `visualization/`: 2D/3D parametric engines (Three.js/Canvas).
- `src/layouts/`: Shared layout components (Sidebar, AppContainer).
- `src/components/`: Atomic, reusable UI elements.
- `src/services/`: Global API client and service layer.
- `src/store/`: State management with history support.
- `src/styles/`: Centralized MUI theme and styled-component layouts.

## Key Design Principles:
- **Segregation of Concerns:** Separation of XML (JSX), Code (Hooks), and Styles (Styled Components).
- **Colocation:** Feature-specific assets live within their respective feature folders.
- **Parametric Ripple Logic:** Changes in measurements ripple through the geometric constraint solver to update 2D/3D visualizations.

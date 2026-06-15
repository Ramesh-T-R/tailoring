# 4. Data Flow
The system employs a "Push-on-Change" data flow with local-first characteristics.

## Project Initialization Flow
The creation of a new bespoke project follows a strict multi-step workflow orchestrated by the `ProjectSetup` wizard:
1. **Template Selection:** User chooses a `DressType` (e.g., Formal Shirt).
2. **Standard Selection:** User selects a base size from the associated `SizeChart`. This populates the project with default measurements.
3. **Design Configuration:** User selects options for each `DesignCategory` linked to the `DressType`.
4. **Fabric Selection:** User defines material properties (Color, Roughness, Clearcoat) which influence the 3D shader.
5. **Finalization:** The `ProjectService.create()` call persists the complete project configuration to the database.

## Update Lifecycle
1.  **Interaction:** User modifies a measurement slider in the `MeasurementForm`.
2.  **Debounce:** The `ProjectDashboard` captures the event but waits (500ms) for the user to finish adjusting.
3.  **Local Sync:**
    - `StoreManager` creates a new immutable state snapshot.
    - `ConstraintSolver` recalculates all `PatternPiece` points.
    - Local UI (3D and 2D) updates immediately.
4.  **Remote Sync:** `ProjectService.update()` is called with the new project state.
5.  **Validation Gate:** The API validates the request body using Zod schemas.
6.  **Persistence:** MongoDB persists the document with an incremented version number.

## Error Handling
- **Network Failure:** Current implementation logs failures to the console.
- **Rollback (Roadmap):** Implementation of state reconciliation or UI rollback is required if a debounced persistence call fails after optimistic local updates have been applied.
- **Validation Failure:** If API returns a 400 error, the client currently remains in the invalid state; automated revert logic is a roadmap item.

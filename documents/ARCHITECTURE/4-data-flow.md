# 4. Data Flow
The system employs a "Push-on-Change" data flow with local-first characteristics.

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
- **Network Failure:** If the API is unreachable, an error is logged to the console (Roadmap: implementation of a retry-queue or offline-sync notification).
- **Validation Failure:** If measurements are physically impossible, the API returns a 400 error, and the client should revert the local state (Roadmap: implementation of state reconciliation).

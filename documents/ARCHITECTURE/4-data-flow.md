# 4. Data Flow
1. **Input:** User adjusts "Parametric Sliders" in the UI.
2. **Local Sync:** `useAppLogic` updates the `StoreManager`.
3. **Geometric Solver:** `ConstraintSolver` recalculates pattern points.
4. **Persistence:** `ProjectService` pushes an asynchronous update to the REST API.
5. **Storage:** MongoDB stores the updated project document with an incremented version number.

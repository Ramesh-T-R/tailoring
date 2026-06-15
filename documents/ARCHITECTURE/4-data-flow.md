# 4. Data Flow
The system uses explicit, user-driven persistence with local-first preview rendering.

## Project Initialization Flow
New/edited projects are defined on the single-page `ProjectSetup` screen (not a multi-step wizard):
1. **General Info:** User enters a project name, selects gender, and picks a `DressType` (filtered by gender).
2. **Design Combination:** User selects a predefined design combination from the chosen Dress Type (via a modal).
3. **Standard Size & Measurements:** User picks a `SizeType`; measurement inputs are auto-populated from the Dress Type's `SizeChart` entries (with cm/in conversion) and can be edited per Measurement Type.
4. **Live Preview:** The `PatternVisualizer` updates in real time as measurements change.
5. **Save:** `handleSave` assembles the payload (`measurements` mapped to `{ measurementTypeId, value }`) and calls `projectService.create()` or `projectService.update()`.

## Measurement Update Lifecycle
1.  **Interaction:** User edits a measurement field (or selects a standard size that populates many) in `ProjectSetup`.
2.  **Local State:** React state updates immediately.
3.  **Preview Recompute:** `PatternVisualizer` re-derives garment geometry from the updated measurement map on the next render.
4.  **Persistence:** Occurs only when the user clicks **Save** — the full project payload is sent.
5.  **Validation Gate:** The API validates the body with Zod.
6.  **Persistence:** MongoDB stores the document (with a `version` field; `timestamps` enabled).

> There is **no debounced background synchronization** and no optimistic remote sync in the current implementation. Persistence is explicit.

## Error Handling
- **Network/Save Failure:** Errors are caught and logged to the console; the setup screen surfaces a load error via an `Alert` when configuration data fails to load.
- **Validation Failure:** A 400 from the API is logged; there is no automated client-side revert/rollback yet (roadmap).

## Note on Legacy Flow
An older flow based on `ProjectDashboard` + `MeasurementForm` + `StoreManager` + `ConstraintSolver` (with a 500ms debounce and undo history) exists in the codebase but is **not active** — `ProjectSetup` serves both creation and editing.

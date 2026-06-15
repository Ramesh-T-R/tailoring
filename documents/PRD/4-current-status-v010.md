# 4. Current Status (v0.1.0)

> Reverse-engineered from the codebase. Legend: ✅ implemented & wired · 🟡 partial · ⚪ present in code but not wired · ❌ documented previously but not true.

- ✅ **Guild Admin Interface:** Sidebar navigation across the project home and the configuration pages.
- ✅ **Configuration Suite:** CRUD management for Measurement Types, Size Charts (with cloning, cm/in units, and 0–250 validation), Size Types, Dress Types, Design Categories, and Designs.
- ✅ **Dynamic Measurement Capture:** Measurements are driven by Measurement Types + Size Charts; project setup renders one field per measurement type and auto-populates from the selected standard size with unit conversion.
- ✅ **Project Lifecycle:** Create, edit, and delete projects from the dashboard; persisted via REST API.
- ✅ **Real-time 3D Visualization:** Live `PatternVisualizer` ("Princess Cut" bodice) scales from named measurement types using `react-three-fiber`.
- ✅ **Persistence Layer:** REST API with **Zod validation** for projects and configuration entities.
- 🟡 **Project Setup UX:** Implemented as a **single-page form** (General Info → Design Combinations → Size & Measurements + live visualizer), **not** a multi-step wizard as earlier documented.
- 🟡 **Fabric Recommendations:** `FabricExpert` logic exists, but fabric is hardcoded to "Linen" on save and the Stitch Toolkit display is not wired; fabric field names also diverge between client and server (data loss on save).
- ⚪ **Parametric Sliders / `MeasurementForm`:** Present but not rendered (superseded by dynamic capture).
- ⚪ **2D `ConstraintSolver` (Formal Shirt):** Present but not on the live render path; has a known piece-name matching defect.
- ⚪ **Session History / Undo (`StoreManager`):** Implemented (50-snapshot stack) but not wired, because `ProjectDashboard` is no longer rendered.
- ❌ **Debounced background sync:** Not implemented. Saves are explicit (Save button → full create/update). Earlier docs describing automatic debounced sync do not reflect the code.
- ❌ **"Type-safe build":** `npm run build` currently fails `tsc`. Type-safety is a goal, not a current guarantee.

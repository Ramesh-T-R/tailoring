# 2. Core Features (MVP)

> **Note:** This document is reverse-engineered from the implemented codebase (v0.1.0). It describes what the application actually does today, and explicitly flags capabilities that exist in the code but are **not wired into the running app** ("dead code"), so requirements stay honest.

## 2.1 Project Management Dashboard
- **Feature:** A central home screen (`HomePage`) for managing bespoke projects.
- **Requirement:** List existing projects as cards, create a new project, edit an existing project, and delete a project.
- **Data Source:** Projects are loaded from the backend via `projectService.getAll()` on app mount.
- **Navigation:** A persistent left `Sidebar` switches between the project home and the configuration pages.

## 2.2 Dynamic Measurement Capture
- **Feature:** Measurements are **fully dynamic** — there is no fixed, hardcoded set of body measurements.
- **Requirement:** The set of measurements is defined at runtime through the **Measurement Types** feature (a CRUD catalog of metrics, e.g. "Chest", "Waist") and standardized values are supplied through the **Size Chart** feature.
- **Capture flow (in `ProjectSetup`):**
  1. The form renders one numeric input **per Measurement Type** retrieved from the database.
  2. Selecting a **Standard Size** (a `SizeType` such as S/M/L) auto-populates the measurement inputs from the relevant `SizeChart` entries.
  3. Values can be toggled and converted between **inches and centimeters** (2.54 conversion factor).
  4. Each captured value is persisted on the project as `{ measurementTypeId, value }`.
- **Status note:** A legacy fixed-field UI with "Parametric Sliders" (`MeasurementForm`) exists in the codebase but is **not rendered** in the current app; it is superseded by the dynamic capture above.

## 2.3 Real-Time Garment Visualization (3D)
- **Feature:** A live 3D blueprint (`PatternVisualizer`) rendered with `@react-three/fiber` and `three.js`, shown alongside the project form.
- **Requirement:** The visualizer reads named Measurement Types (e.g. Chest, Waist, Length, Shoulder Width, Shoulder to Bust, Apex to Apex) and recomputes garment panel geometry in real time as measurements change.
- **Current garment:** The implemented shape is a hardcoded **"Princess Cut"** bodice (front center + side panels with princess seams), with sensible defaults when a measurement type is absent.
- **Rendering:** Physically-based material (`meshPhysicalMaterial`), orbit controls, environment lighting, and contact shadows.

## 2.4 2D Constraint Solver (Experimental / Not Wired)
- **Feature:** A separate 2D vector pattern engine (`ConstraintSolver` in `geometry.ts`) intended to map measurements to `Vector2D` pattern points for a Formal Shirt front.
- **Status:** **Not part of the live render path.** It is only referenced by the unused `StoreManager`. It also has a known matching defect (it only acts on pieces whose name contains both "shirt" and "front", while projects create pieces named "Front Panel"/"Back Panel"). Treat as experimental.

## 2.5 Fabric & Tooling Recommendations (Partially Wired)
- **Feature:** A static expert system (`FabricExpert`) mapping fabric type (Silk, Denim, Linen, Jersey) to recommended needle, presser foot, thread, and weight.
- **Reality:** On project save, fabric is currently **hardcoded to "Linen"** defaults in `useAppLogic`; the `FabricExpert` lookup and the `StitchToolkit` display component exist in the codebase but are **not wired** into the active screens.
- **Known data issue:** Frontend fabric fields (`recommendedFoot`, `recommendedThread`) do not match the backend persistence schema (`recommendedPresserFoot`, no thread), so these values are dropped on save.

## 2.6 Session History & Undo (Not Wired)
- **Feature:** An in-memory `StoreManager` implementing a stack-based undo with history pruning to 50 snapshots.
- **Status:** **Dead code.** It is instantiated only inside `ProjectDashboard`, which is no longer rendered (the "edit project" path routes to `ProjectSetup`). No undo capability is exposed in the live UI today.

## 2.7 Configuration Management (Atelier Settings)
Fully implemented CRUD suite backing the dynamic project setup. All persist via REST + MongoDB + Zod validation.
- **Measurement Types:** CRUD over `{ name, description }` — defines the available measurement metrics.
- **Size Charts:** CRUD over a chart of `{ sizeTypeId, measurementTypeId, unit (cm/in), value }` entries, scoped by gender. Supports:
  - **Unit handling** per entry (cm/in).
  - **Cloning** entries to a different target Size Type / unit.
  - **Validation** that values fall within 0–250 and duplicates are rejected.
- **Size Types:** Standard size labels (e.g. S, M, L) referenced by size chart entries.
- **Dress Types:** CRUD over `{ name, gender, description, sizeChartId, designCombinations[] }` garment blueprints. Each blueprint links a Size Chart and a set of valid **Design Combinations** (`{ designIds[] }`).
- **Design Categories:** CRUD over `{ name }` — groupings for modular components.
- **Designs:** CRUD over `{ name, category, description }` — individual modular components (e.g. a collar or cuff) belonging to a Design Category.

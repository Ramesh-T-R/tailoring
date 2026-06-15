# 6. Project Epics

This document breaks the Thaiyalagam platform into Epics based on the **actual implementation state** (v0.1.0). Status reflects what is wired into the running app.

## Epic 1: Atelier Configuration Suite
**Goal:** Provide the "Master Recipe" foundation for tailoring projects.
- **User Story:** As a Guild Admin, I want to define standardized measurement types, dress types, and size charts so that projects have consistent, reusable starting points.
- **Key Features:**
    - CRUD for **Measurement Types** (`{ name, description }`).
    - CRUD for **Size Charts** with cm/in units, 0–250 validation, and entry **cloning**.
    - CRUD for **Size Types** (standard size labels).
    - CRUD for **Dress Types** (garment blueprints linking a Size Chart and Design Combinations).
    - CRUD for **Design Categories** and **Designs** (modular components).
- **Status:** ✅ Implemented.

## Epic 2: Bespoke Project Management
**Goal:** Centralize the lifecycle of individual customer projects.
- **User Story:** As a Tailor, I want a dashboard to create, edit, and delete my bespoke projects.
- **Key Features:**
    - Card-based project home (`HomePage`).
    - Persistent storage of measurements, design combinations, and size selection via REST API.
- **Status:** ✅ Implemented.

## Epic 3: Project Setup
**Goal:** Capture an accurate, technically-complete project definition.
- **User Story:** As a Tailor, I want to define a project's garment, design combination, standard size, and measurements on one screen with a live preview.
- **Key Features (single-page `ProjectSetup`):**
    - **General Info:** name, gender, dress type (filtered by gender).
    - **Design Combinations:** select a predefined combination from the dress type.
    - **Size & Measurements:** pick a standard size, auto-populate measurements from the size chart, edit per measurement type, toggle cm/in.
    - **Live 3D Preview:** real-time `PatternVisualizer`.
- **Status:** ✅ Implemented (single page; not a multi-step wizard).

## Epic 4: Garment Visualization
**Goal:** Translate measurements into a real-time digital garment preview.
- **User Story:** As a Tailor, I want to see how measurement changes affect the garment in real time.
- **Key Features:**
    - **3D Visualizer (`PatternVisualizer`):** hardcoded "Princess Cut" bodice driven by named measurement types via `react-three-fiber`.
- **Status:** 🟡 Partial — single garment shape; measurement→geometry binding is by measurement-type name.
- **Experimental (not wired):** 2D `ConstraintSolver` (Formal Shirt) — present in code, off the live path.

## Epic 5: Technical State & Persistence
**Goal:** Ensure data integrity and a responsive experience.
- **User Story:** As a User, I want my project data validated and reliably persisted.
- **Key Features:**
    - **Zod Validation:** type-checked API gateway.
    - **Explicit Save:** create/update on demand via the service layer.
- **Status:** 🟡 Partial.
- **Not wired:** `StoreManager` session history/undo (present but unused).
- **Not implemented:** debounced background sync (earlier docs were aspirational).

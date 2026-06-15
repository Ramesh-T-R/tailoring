# 6. Project Epics

This document breaks down the Thaiyalagam platform into high-level Epics based on the current implementation state (v0.1.0).

## Epic 1: Atelier Configuration Suite
**Goal:** Provide the "Master Recipe" foundation for tailoring projects.
- **User Story:** As a Guild Admin, I want to define standardized dress types and size charts so that projects have consistent starting points.
- **Key Features:**
    - CRUD for **Measurement Types** (Metrics definitions).
    - CRUD for **Size Charts** with unit conversion (cm/in) and cloning support.
    - CRUD for **Dress Types** (Garment blueprints).
    - CRUD for **Design Categories** (Modular pattern components).
- **Status:** ✅ Implemented.

## Epic 2: Bespoke Project Management
**Goal:** Centralize the lifecycle of individual customer projects.
- **User Story:** As a Tailor, I want a dashboard to manage all my bespoke projects and track their progress.
- **Key Features:**
    - Project Dashboard with card-based status overview.
    - Integration with user branding ("Master Ramesh").
    - Persistent storage of customer measurements and design choices via REST API.
- **Status:** ✅ Implemented.

## Epic 3: Scientific Project Setup Wizard
**Goal:** Ensure technical accuracy during the project initialization phase.
- **User Story:** As a Tailor, I want a guided multi-step process to set up a new project to ensure no technical details are missed.
- **Key Features:**
    - Step 1: **Template Selection** (Dress Type).
    - Step 2: **Standard Selection** (Size Chart mapping).
    - Step 3: **Design Configuration** (Component selection).
    - Step 4: **Fabric Selection** (Material properties).
- **Status:** ✅ Implemented.

## Epic 4: Parametric Geometry & Visualization (Beta)
**Goal:** Translate physical measurements into digital blueprints and 3D simulations.
- **User Story:** As a Tailor, I want to see how measurement changes impact the pattern and 3D fit in real-time.
- **Key Features:**
    - **ConstraintSolver:** Initial logic for Formal Shirt pattern piece recalculation.
    - **2D Pattern Plotter:** SVG/Canvas representation of pattern pieces.
    - **3D Visualization:** Scaling mannequin based on physical measurements using `react-three-fiber`.
- **Status:** 🟡 Partial (Formal Shirt support only).

## Epic 5: Technical State & Persistence
**Goal:** Ensure data integrity and provide a responsive user experience.
- **User Story:** As a User, I want my changes to be saved automatically and have the ability to undo mistakes during my session.
- **Key Features:**
    - **StoreManager:** In-memory session history (Undo/Redo).
    - **Push-on-Change:** Debounced background synchronization with the server.
    - **Zod Validation:** Type-safe API gateway to prevent data corruption.
- **Status:** 🟡 Partial (Session-based history; persistence roadmap).

# 2. Core Features (MVP)

## 2.1 Project Management Dashboard
- **Feature:** A central "Guild Admin" interface.
- **Requirement:** List, open, and create bespoke projects.
- **Requirement:** Professional header with user branding ("Master Ramesh").

## 2.2 Scientific Measurement System
- **Feature:** Precision-driven data entry.
- **Requirement:** Capture Gender, Height, Chest, Waist, Hips, Shoulder Width, Arm Length, and Neck Circumference.
- **UI Pattern:** "Parametric Sliders" for high-precision tactile adjustment.

## 2.3 Geometric Pattern Plotter (Beta)
- **Feature:** Basic vector-based pattern visualization.
- **Requirement:** Initial support for Formal Shirt front/back panels using a custom `ConstraintSolver`.
- **Limitation:** Changes in measurements currently recalculate a fixed set of geometric points (Ripple logic) with limited constraints.

## 2.4 3D Visualization
- **Feature:** Real-time 3D garment scaling.
- **Requirement:** Render a 3D model that scales along X/Y/Z axes based on physical measurements using `react-three-fiber`.
- **Fabric Rendering:** Basic shader adjustment for Color, Roughness, and Clearcoat to approximate different material types.

## 2.5 Technical Recommendations (Roadmap)
- **Feature:** Automated tailoring expertise.
- **Status:** Currently provides static recommendations for needle types and presser feet based on fabric category.
- **Future Requirement:** Dynamic recommendations based on weight/stretch and "Completeness Checks" for pattern pieces.

## 2.6 State Management & History
- **Feature:** Project snapshot history.
- **Requirement:** In-memory stack for "Undo" capability during the current design session.
- **Limitation:** Snapshots are not currently persisted to the database and are lost on session refresh.

## 2.7 Configuration Management
- **Feature:** Technical Atelier Settings.
- **Measurement Types:** CRUD interface for defining custom measurement parameters.
- **Size Charts:** CRUD interface for defining standardized size tables (S, M, L, etc.) with configurable units (cm/in). Includes cloning capability to quickly create new charts based on existing templates.
- **Dress Types:** CRUD interface for defining standardized garment blueprints.
- **Design category:** CRUD interface for modular pattern component definitions.

# 7. User Stories

This document details the user stories for the Thaiyalagam platform, organized by primary feature areas and screens.

## 7.1 Guild Admin: Atelier Configurations
**Screen:** Configuration Pages (Dress Types, Size Charts, etc.)

- **Manage Measurement Types:** As a Guild Admin, I want to create and edit measurement definitions (e.g., Chest, Waist) so that I can control which metrics are captured for different garment types.
- **Configure Size Charts:** As a Guild Admin, I want to define standard sizing tables (S, M, L) so that projects can be initialized with accurate industry-standard measurements.
- **Clone Size Charts:** As a Guild Admin, I want to clone an existing size chart so that I can quickly create a new one for a similar garment category without starting from scratch.
- **Define Dress Types:** As a Guild Admin, I want to create blueprints for garments (e.g., Formal Shirt) that link to specific size charts and design categories.
- **Manage Design Components:** As a Guild Admin, I want to categorize and define modular design options (e.g., Collar styles, Cuff styles) so that tailors can configure bespoke options.

## 7.2 Tailor: Project Management & Dashboard
**Screen:** Home Page & Project Dashboard

- **Project Overview:** As a Tailor, I want to see a list of all my active bespoke projects so that I can track my current workload.
- **Quick Action Menu:** As a Tailor, I want to open or delete projects directly from the dashboard for efficient management.
- **Measurement Adjustment:** As a Tailor, I want to use precision sliders to adjust customer measurements and see the impact on the pattern immediately.
- **Undo/Redo Actions:** As a Tailor, I want to undo or redo changes made to measurements or design choices during my session so that I can experiment safely.
- **Version Tracking:** As a Tailor, I want to see the current version of the project to ensure I am working on the latest saved state.

## 7.3 Tailor: Project Setup Wizard
**Screen:** New Project Wizard

- **Guided Setup:** As a Tailor, I want a step-by-step wizard (Template -> Size -> Design -> Fabric) so that I don't miss any critical technical configuration when creating a new project.
- **Template-Based Starting Point:** As a Tailor, I want to select a Dress Type template so that the project is pre-populated with relevant measurements and design categories.
- **Standard Sizing Default:** As a Tailor, I want to select a size (e.g., \"M\") from a chart so that I can start with a base measurement profile before making bespoke adjustments.
- **Design Configuration:** As a Tailor, I want to choose specific style options (e.g., \"Spread Collar\") within the wizard to define the garment's design.
- **Material Preview:** As a Tailor, I want to adjust fabric color and properties (Roughness/Clearcoat) and see a real-time preview of the material in 3D.

## 7.4 Visualization & Pattern Planning
**Screen:** Pattern Visualizer & ThreeScene

- **3D Mannequin Review:** As a Tailor, I want to view a 3D model of the garment that scales dynamically based on measurements so that I can visualize the fit and proportions.
- **Technical Blueprint View:** As a Tailor, I want to see a 2D vector plot of the pattern pieces (Digital Chalk) to understand how the garment will be cut.
- **Interactive Rotation:** As a Tailor, I want to rotate and zoom into the 3D model to inspect the design and fit from all angles.
- **Dynamic Point Recalculation:** As a Tailor, I want the pattern points to update automatically when I move a measurement slider, ensuring the digital blueprint remains accurate.

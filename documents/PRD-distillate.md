---
type: bmad-distillate
sources:
  - "documents/PRD/1-executive-summary.md"
  - "documents/PRD/2-core-features-mvp.md"
  - "documents/PRD/3-technical-stack.md"
  - "documents/PRD/4-current-status-v010.md"
  - "documents/PRD/5-success-metrics.md"
  - "documents/PRD/index.md"
  - "documents/ARCHITECTURE/1-high-level-overview.md"
  - "documents/ARCHITECTURE/2-frontend-architecture-enterprise-standard.md"
  - "documents/ARCHITECTURE/3-backend-architecture.md"
  - "documents/ARCHITECTURE/4-data-flow.md"
  - "documents/ARCHITECTURE/5-security-stability.md"
  - "documents/ARCHITECTURE/6-infrastructure.md"
  - "documents/ARCHITECTURE/index.md"
downstream_consumer: "general"
created: "2026-04-24"
token_estimate: 1050
parts: 1
---

## Core Concept
- Thaiyalagam: specialized CAD/CAM platform bridging traditional tailoring craftsmanship with digital precision (Scientific Atelier).
- Primary objectives: technical cutting accuracy; material waste reduction (ghost-nesting); modular/reusable pattern blueprints (Master Recipes).
- Target users: professional tailors (precision/versioning); apprentices (simulation); bespoke designers (modular recipes).

## System Architecture
- Client Tier: React 18, TypeScript, Material UI 6+ (Styled Components); local optimistic state for zero-latency feedback.
- API Tier: Node.js (Express), TypeScript REST service; stateless service layer; gateway for document persistence.
- Data Tier: MongoDB Atlas; stores versioned snapshots of tailoring projects and complex measurement profiles.
- Communication: RESTful CRUD for project management; asynchronous local geometric recalculations; debounced client-to-API synchronization.

## Frontend Technical Logic
- StoreManager: in-memory state orchestrator (src/store/projectStore.ts); optimistic updates; immutable snapshots.
- History Engine: stack-based undo/redo; pruning limited to last 50 snapshots to prevent memory exhaustion.
- ConstraintSolver: parametric geometric engine (src/features/visualization/logic/geometry.ts); maps measurements to 2D Vector2D coordinates via parametric ripple logic.
- Visualization: Three.js (React Three Fiber) for 3D mannequin rendering; HTML5 Canvas for 2D blueprints.
- Organization: feature-based modular structure (src/features/tailoring for lifecycle/config; src/features/visualization for 3D/2D engines).

## Backend & Data Persistence
- Service Stack: Node.js/Express with Mongoose for MongoDB interactions.
- Validation Gate: Zod schemas enforce physical/geometric constraints (e.g., non-negative measurements) at API gateway.
- IProject Model: includes unique IDs; nested measurement profiles (strict bounds); fabric properties (stretch coefficients, tool settings); DesignCategory; pattern piece geometric points.
- Diagnostics: Morgan/Winston logging; /api/health monitoring endpoint.

## Functional Features (MVP)
- Guild Admin: central dashboard for project CRUD with professional user branding.
- Measurement System: parametric sliders for high-precision entry (Gender, Height, Chest, Waist, Hips, Shoulder, Arm, Neck).
- Digital Chalk: vector-based planning with ripple logic; automatic 2D coordinate recalculation upon measurement change.
- Digital Dress Rehearsal: fabric-aware 3D rendering (Silk, Denim, Linen) scaling dynamically with measurements.
- Stitch Toolkit: automated technical recommendations (needles, presser feet, thread) based on fabric weight/stretch; completeness checks for pattern pieces.
- Configuration Management: CRUD interfaces for Measurement Types, Size Charts (cm/in), Dress Types, and Design Categories.

## Operational Lifecycle & Stability
- Update Lifecycle: User input -> 500ms debounce -> local immutable snapshot -> ConstraintSolver recalculation -> UI update (3D/2D) -> API persistence (Zod validation) -> MongoDB version increment.
- Stability Features: End-to-end TypeScript types; input validation preventing data corruption; state updates via object spreading.
- Infrastructure: Vite build output for static frontend hosting; Docker/PaaS for backend; PORT (default 5001) and MONGODB_URI environment variables.
- Security Posture: Internal tooling phase; Zero-Auth (trusted internal access); no tenant isolation; client-side geometric point trust.

## Success Metrics
- Fabric waste reduction via ghost-nesting optimization.
- First-cut accuracy improvement (reduced trial cuttings for complex designs).
- Community growth: volume of Master Recipes shared/forked.

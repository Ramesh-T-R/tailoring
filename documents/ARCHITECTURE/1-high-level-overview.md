# 1. High-Level Overview
Thaiyalagam is a web platform for bespoke tailoring that translates configurable body measurements into a real-time digital garment preview and persists reusable garment/size "recipes."

## System Context
The architecture has three tiers:
1.  **Client Tier (React/TypeScript + Vite):** Renders the configuration suite, the project setup screen, and a real-time 3D garment visualizer (`@react-three/fiber`). UI state is held locally in React (the `useAppLogic` hook and component state) and synced to the API on explicit user actions.
2.  **API Tier (Node.js/Express 5):** A stateless REST service that validates request payloads with Zod and persists documents via Mongoose. It is the gateway to the document store.
3.  **Data Tier (MongoDB):** A document database storing projects and configuration entities (Measurement Types, Size Types, Size Charts, Dress Types, Design Categories, Designs).

## Communication Patterns
-   **Synchronous:** RESTful CRUD calls for projects and all configuration entities.
-   **Local recomputation:** Garment geometry in `PatternVisualizer` recomputes in the React render cycle (main thread) when measurements change.
-   **Persistence:** Explicit create/update calls triggered by user save actions. *(There is no automatic/debounced background synchronization in the current implementation.)*

## Notes on Current State
-   The client maintains simple local state, not an "optimistic state engine." A `StoreManager`/optimistic-history abstraction exists in the codebase but is not wired into the running app.
-   Web Worker offloading of geometry is a potential future optimization, not a current feature.

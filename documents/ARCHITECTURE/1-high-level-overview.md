# 1. High-Level Overview
The Thaiyalagam system is a specialized CAD/CAM platform for bespoke tailoring, designed to bridge the gap between human measurements and digital pattern drafting. 

## System Context
The architecture is divided into three primary tiers:
1.  **Client Tier (React/TypeScript):** Responsible for real-time 3D visualization and parametric pattern calculation. It maintains a local "Optimistic State" to ensure zero-latency feedback for the tailor.
2.  **API Tier (Node.js/Express):** A stateless service layer that validates geometric constraints and manages persistence. It acts as the gateway to the document store.
3.  **Data Tier (MongoDB):** A document-oriented database storing versioned snapshots of tailoring projects, including complex nested measurement profiles and piece geometry.

## Communication Patterns
-   **Synchronous:** RESTful API calls for project management (CRUD).
-   **Asynchronous (Local):** Geometric recalculations occur in the main thread (optimizable via Web Workers in v0.2.0) triggered by state changes.
-   **Persistent:** Automated, debounced synchronization between the Client Tier and API Tier to minimize network overhead while ensuring data durability.

# 5. Security & Stability
## Current Security Posture
The system is currently in a "Internal Tooling" security phase. 

### Known Limitations (Roadmap v0.2.0)
-   **Authentication:** Zero-Auth. The API is open and assumes trusted internal access.
-   **Authorization:** No tenant isolation; any user can access any project.
-   **Client Trust:** The backend currently trusts the geometric points provided by the client, though it validates the input measurements.

## Stability Features
-   **Type Safety:** End-to-end TypeScript types shared between `src/types/` and `server/src/models/`.
-   **Input Validation:** Server-side Zod validation prevents "garbage-in" data corruption.
-   **Stability Monitoring (Sentry):** 
    - **Error Tracking:** Real-time capture of unhandled exceptions across both Client and API tiers.
    - **Breadcrumbs:** Automatic logging of user interactions and network requests to facilitate root-cause analysis.
    - **Telemetry:** Capture of performance metrics and warning/info level logs for system health monitoring.
-   **Snapshot Pruning:** Prevents client-side memory bloat from infinite history.
-   **Immutability:** State updates use object spreading to ensure predictable state transitions.

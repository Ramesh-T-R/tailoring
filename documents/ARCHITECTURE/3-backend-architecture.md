# 3. Backend Architecture
The backend is a TypeScript-driven REST service optimized for JSON document persistence.

## Service Stack
- **Runtime:** Node.js with Express.
- **Data Modeling:** Mongoose for schema-based MongoDB interactions.
- **Validation:** Zod schemas are used to enforce data types and presence at the API gateway. 
- **Constraint Roadmap:** Full physical validation (e.g., non-negative measurements, geometric feasibility) is currently handled on the client, with server-side enforcement planned for future releases.

## Domain Models
### Core Entities
- **Project (`IProject`):** The central document linking a customer profile, selected dress type, measurements, and design choices.
- **Dress Type (`IDressType`):** Garment blueprints (e.g., "Formal Shirt", "Trouser") that define valid design combinations and default measurement sets.
- **Size Chart (`ISizeChart`):** Mapping of standard sizes (S, M, L, etc.) to specific measurement values across different measurement types. Supports unit conversion (cm/in).
- **Measurement Type (`IMeasurementType`):** Definitions for individual metrics (e.g., "Chest Circumference") including icons and validation ranges.
- **Design & Design Category:** Modular components (e.g., "Spread Collar", "French Cuff") organized by category to allow for configuration of garment styles.

### Relationships
- Projects are instantiated from a **Dress Type**.
- Dress Types are associated with specific **Size Charts** and **Design Categories**.
- Size Charts contain multiple **Size Types** (e.g., "Standard Sizing") and their corresponding values for various **Measurement Types**.

## Planned Middleware
- **Morgan/Winston:** For structured logging of API requests and error states.
- **Health Check Endpoint:** `/api/health` for monitoring service availability.
- **Rate Limiting:** (Roadmap) To prevent abuse of the measurement update endpoints.

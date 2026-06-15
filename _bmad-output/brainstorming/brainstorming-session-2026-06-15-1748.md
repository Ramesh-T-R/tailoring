---
stepsCompleted: [1, 2, 3]
inputDocuments: []
session_topic: 'Progressing the Edit Project screen so visualization represents correct cloth-cutting suggestions driven by design type + size chart/measurements'
session_goals: 'Measurement + design-type driven visualization that produces accurate pattern pieces / cutting guidance; ideas for how the Edit Project screen should present and verify it'
selected_approach: 'ai-recommended'
techniques_used: ['First Principles Thinking', 'Cross-Pollination']
techniques_pending: ['Morphological Analysis', 'SCAMPER (optional)']
ideas_generated: 25
context_file: ''
schema:
  idea_id: 'IDEA-NNN'
  fields: [title, phase, technique, concept, novelty, tags, status]
  decision_id: 'DEC-NNN'
---

# Brainstorming Session Results

**Facilitator:** Rameshramnath
**Date:** 2026-06-15
**Topic:** Edit Project screen → correct cloth-cutting suggestions from Dress Type + Design Combinations + Measurements

> This document is chunked for AI retrieval: each idea/decision is a self-contained block with a stable ID, a one-line summary, and tags. Read the INDEX first, then jump to any `IDEA-NNN` / `DEC-NNN` chunk directly.

---

## INDEX

### Decisions
| ID | Decision | Status |
|----|----------|--------|
| DEC-001 | Driver hierarchy is Dress Type → Design Combinations → Measurements (measurements solve last) | Accepted |
| DEC-002 | Use complete pre-drawn "pattern recipes" per (Type, Design Combo) now; refactor to base-block+modifiers later | Accepted (a→b) |
| DEC-003 | Hero output of Edit Project screen is the **2D flat cutting layout**; 3D is a secondary preview | Accepted |
| DEC-004 | Recipe authoring lives in the **Dress Type edit screen**, with one recipe per **Design Combination** | Accepted |
| DEC-005 | Authoring is **visual-first**: the author draws/constructs, and the editor **derives the formulae/ops** | Accepted |

### Ideas
| ID | Title | Phase / Technique | Tags |
|----|-------|-------------------|------|
| IDEA-001 | Driver Hierarchy (Type→Design→Measurements) | First Principles | model, binding |
| IDEA-002 | Pattern Recipe as the Core Unit | First Principles | model, data |
| IDEA-003 | Recipe-First, Block-Later (a→b) | First Principles | architecture, roadmap |
| IDEA-004 | Cut Layout Is the Deliverable; 3D Is the Preview | First Principles | output, ux |
| IDEA-005 | Anatomy of a Trustworthy Piece | 2D Layout | output, trust |
| IDEA-006 | Fabric-Width Nesting ("Will it fit?") | 2D Layout | fabric, cost |
| IDEA-007 | Dimension Annotations On-Line | 2D Layout | trust, audit |
| IDEA-008 | Grain & Stretch Awareness | 2D Layout | fabric-physics |
| IDEA-009 | Confidence / Completeness Badge | 2D Layout | trust, no-NaN |
| IDEA-010 | Three Decoupled Artifacts (Pattern / Measurements / Layout) | Cross-Pollination (Seamly2D) | architecture, core |
| IDEA-011 | Canonical Measurement Taxonomy (the SVG) | Cross-Pollination (Seamly2D) | measurement, binding |
| IDEA-012 | Measurement Diagrams for Capture | Cross-Pollination (Seamly2D) | ux, capture |
| IDEA-013 | Formula Engine + "Increments" | Cross-Pollination (Seamly2D) | formula, engine |
| IDEA-014 | Construction-Operation Recipe Language | Cross-Pollination (Seamly2D) | recipe, engine |
| IDEA-015 | Body-Agnostic Pattern (auto re-solve) | Cross-Pollination (Seamly2D) | engine, core |
| IDEA-016 | Export to Plotter Formats (DXF/SVG/PDF tiling) | Cross-Pollination (Seamly2D) | output, export |
| IDEA-017 | Built-in Seam Allowance + Layout Nesting Mode | Cross-Pollination (Seamly2D) | output, fabric |
| IDEA-018 | The Minimal Op-Set (primitives) | Deep Dive on #14 | recipe, engine |
| IDEA-019 | Every Value Is a Formula, Not a Number | Deep Dive on #14 | formula, engine |
| IDEA-020 | Pieces = Closed Paths Over Constructed Points | Deep Dive on #14 | recipe, geometry |
| IDEA-021 | It's a DAG — Solve in Topological Order | Deep Dive on #14 | engine, no-NaN |
| IDEA-022 | Design Combination as a Patch Layer | Deep Dive on #14 | architecture, a→b |
| IDEA-023 | Recipe Self-Test Across the Size Chart | Deep Dive on #14 | trust, verification |
| IDEA-024 | Authoring Surface — Visual vs DSL | Deep Dive on #14 | authoring, ux |
| IDEA-025 | Visual-First Authoring with Formula Derivation | User vision | authoring, ux, core |

---

## DECISIONS

### DEC-001 — Driver hierarchy
**Summary:** Cutting is selected top-down; body measurements are the final solving step, not the selector.
**Detail:** Dress Type sets the macro piece-set and cutting strategy. Design Combinations modify it (e.g., slim-fit, full-arm, mini vs. maxi). Measurements parameterize the already-chosen shapes. Contrasts with current app, which guesses geometry from measurement *names*.
**Tags:** model, binding, core

### DEC-002 — Recipe-first (a→b)
**Summary:** Begin with complete pre-drawn recipes per (Type, Design Combo); evolve to base-block + reusable modifiers when repetition appears.
**Detail:** Option-a = explicit, easy to get correct, recipe author owns correctness (a master tailor can author truth). Option-b = base "block/sloper" + modifier operations, adopted later to remove duplication. Consumer interface should stay stable across the migration.
**Tags:** architecture, roadmap

### DEC-003 — 2D cut layout is the hero
**Summary:** The Edit Project deliverable is the flat, cut-ready pattern layout; 3D garment becomes an optional preview.
**Detail:** A 3D draped garment shows the worn look; a tailor about to cut needs flat pieces with seam allowance, grain, fold, notches, and cut counts. Aligns the screen with the real job-to-be-done.
**Tags:** output, ux

### DEC-004 — Authoring lives in the Dress Type edit screen
**Summary:** Recipes are authored where garments are defined — the Dress Type edit screen — with one recipe per Design Combination.
**Detail:** Confirms ideas #18–#24 match the user's mental model. The project "Edit Project" screen *consumes* recipes; the Dress Type screen *authors* them. Each Design Combination (e.g., slim-fit + full-arm) gets its own recipe (option-a), consistent with DEC-002.
**Tags:** authoring, architecture

### DEC-005 — Visual-first authoring with formula derivation
**Summary:** The author works visually; the editor derives the underlying formulae / construction ops from that visual work rather than requiring hand-typed math.
**Detail:** The vision is a drawing surface where constructing points/lines/curves emits the recipe (IDEA-014 ops + IDEA-019 formulas) automatically. Open crux: how a drawn distance becomes a formula bound to a measurement code vs. a fixed constant (see OPEN THREADS).
**Tags:** authoring, ux, core

---

## IDEAS

### IDEA-001 — Driver Hierarchy (Type→Design→Measurements)
**Concept:** Cutting geometry identity comes from (Dress Type, Design Combination); measurements only parameterize the chosen shapes.
**Novelty:** Inverts the current name-guessing approach; makes the binding deterministic and authored.
**Tags:** model, binding · **Status:** accepted

### IDEA-002 — Pattern Recipe as the Core Unit
**Concept:** The atomic asset is a "recipe" keyed by (Dress Type, Design Combination) defining which pieces exist and the anchors/formulas that build them from measurement types.
**Novelty:** Data-driven, extensible per garment vs. one hardcoded Princess Cut.
**Tags:** model, data · **Status:** accepted

### IDEA-003 — Recipe-First, Block-Later (a→b)
**Concept:** Ship complete per-combo recipes first; later refactor shared structure into base block + modifiers.
**Novelty:** "Earn the abstraction" — correctness now, generalization once repetition is visible.
**Tags:** architecture, roadmap · **Status:** accepted

### IDEA-004 — Cut Layout Is the Deliverable; 3D Is the Preview
**Concept:** Primary view = flat pattern layout; 3D = optional "how it looks worn."
**Novelty:** Reverses today's 3D-first design; matches the cutting job.
**Tags:** output, ux · **Status:** accepted

### IDEA-005 — Anatomy of a Trustworthy Piece
**Concept:** Each piece carries: true outline, seam-allowance offset (dashed), grain-line arrow, fold line, notches/match points, cut quantity ("Cut 2" / "Cut 1 on fold"), and a label (piece name + size).
**Novelty:** Turns a vague shape into a cut-ready instruction; removes cutter guesswork.
**Tags:** output, trust · **Status:** open

### IDEA-006 — Fabric-Width Nesting ("Will it fit?")
**Concept:** Lay pieces on a simulated bolt at a chosen width (44"/58"); show total length required + waste.
**Novelty:** Answers "how much cloth do I buy?" — a question 3D can't.
**Tags:** fabric, cost · **Status:** open

### IDEA-007 — Dimension Annotations On-Line
**Concept:** Each derived line exposes its formula + value on hover/tap (e.g., "1/4 chest + 2cm ease = 27cm"), traceable to the driving measurement.
**Novelty:** Makes correctness auditable; the "Scientific Atelier" promise becomes visible.
**Tags:** trust, audit · **Status:** open

### IDEA-008 — Grain & Stretch Awareness
**Concept:** Flag pieces where grain/stretch direction matters and warn if nesting rotates a piece off-grain.
**Novelty:** Encodes fabric behavior; prevents geometrically-correct-but-physically-wrong cuts.
**Tags:** fabric-physics · **Status:** open

### IDEA-009 — Confidence / Completeness Badge
**Concept:** A piece renders only if all measurements its formulas need are present; otherwise it greys out with a specific "needs X" flag.
**Novelty:** No silent NaN — the screen states exactly why a piece can't be drawn.
**Tags:** trust, no-NaN · **Status:** open

---

## IDEAS — Phase 2: Cross-Pollination (Seamly2D)

### IDEA-010 — Three Decoupled Artifacts (Pattern / Measurements / Layout)
**Concept:** Separate the pattern (construction logic), the measurements (a body), and the layout (cutting on cloth). One pattern works for any body.
**Novelty:** Architectural backbone: Recipe (Type+Design) ⟂ Size Chart/project measurements ⟂ Cut layout.
**Tags:** architecture, core · **Status:** accepted

### IDEA-011 — Canonical Measurement Taxonomy (the SVG)
**Concept:** Adopt a standard measurement library with stable codes (Seamly-style: height, bust_circ, waist_to_hip…) instead of free-form Measurement Types; recipes reference the codes, Size Charts supply values.
**Novelty:** Resolves the Phase-1 binding problem — the code is the shared vocabulary between recipe formulas and a person's measurements. No name-guessing.
**Tags:** measurement, binding · **Status:** strong-candidate

### IDEA-012 — Measurement Diagrams for Capture
**Concept:** Each Measurement Type shows the body illustration of how to measure it; possibly an interactive figure highlighting the line as the field is filled.
**Novelty:** Turns measurement entry into a guided, error-resistant ritual.
**Tags:** ux, capture · **Status:** open

### IDEA-013 — Formula Engine + "Increments"
**Concept:** Recipe lines are formulas referencing measurement codes plus user-defined increments (named intermediate variables — ease, dart depth) reused across pieces.
**Novelty:** Correctness expressed as readable math; shared constants in one place per recipe.
**Tags:** formula, engine · **Status:** accepted

### IDEA-014 — Construction-Operation Recipe Language
**Concept:** A recipe = an ordered list of geometric ops (point-at-distance/angle, perpendicular, intersection, curve-through-points); replay the ops with a body's numbers and the pattern draws itself.
**Novelty:** Concrete answer to how a recipe is stored/authored — a replayable construction graph, not static coordinates.
**Tags:** recipe, engine · **Status:** accepted (deep-dived → #18–#24)

### IDEA-015 — Body-Agnostic Pattern (auto re-solve)
**Concept:** Because the recipe is formulas + ops, swapping size or editing a measurement re-solves the whole pattern automatically.
**Novelty:** The session goal stated as a mechanism: design type + size → correct shape, live.
**Tags:** engine, core · **Status:** accepted

### IDEA-016 — Export to Plotter Formats (DXF/SVG/PDF tiling)
**Concept:** Output the finished layout to cut-ready files — full-scale DXF/SVG for a plotter, or tiled PDF across A4 pages to assemble.
**Novelty:** Closes the loop from screen → physical cloth.
**Tags:** output, export · **Status:** open

### IDEA-017 — Built-in Seam Allowance + Layout Nesting Mode
**Concept:** A dedicated layout mode nests finished pieces on a chosen fabric width with seam allowances and grain (reinforces IDEA-005/006).
**Novelty:** Treats the cutting marker as a first-class artifact, decoupled from the pattern.
**Tags:** output, fabric · **Status:** open

## IDEAS — Deep Dive on IDEA-014 (Recipe Language internals)

### IDEA-018 — The Minimal Op-Set (primitives)
**Concept:** A small sufficient vocabulary: PointAtOrigin, PointAtDistanceAngle(from, dist, angle), PointAlongLine(a, b, pct), PerpendicularFoot(point, line), Intersection(a, b), Midpoint(a, b), Mirror(point, axis).
**Novelty:** If ~7–8 primitives can draft a shirt and a skirt, that's the engine's instruction set.
**Tags:** recipe, engine · **Status:** open (pivotal — enumerate for Shirt + Skirt)

### IDEA-019 — Every Value Is a Formula, Not a Number
**Concept:** dist/angle/pct are expressions like `bust_circ/4 + ease_bust` over measurement codes (IDEA-011) and increments (IDEA-013).
**Novelty:** Body-agnostic by construction.
**Tags:** formula, engine · **Status:** accepted

### IDEA-020 — Pieces = Closed Paths Over Constructed Points
**Concept:** A piece is an ordered boundary of point IDs joined by line/curve segments, with grain/fold/notch metadata.
**Novelty:** Separates construction (point cloud) from piece definition; one construction can yield multiple pieces.
**Tags:** recipe, geometry · **Status:** accepted

### IDEA-021 — It's a DAG — Solve in Topological Order
**Concept:** Points depend on earlier points; re-solve in dependency order. Missing measurement → downstream points flagged unresolved, not NaN.
**Novelty:** Powers the Completeness Badge (IDEA-009); failure is local and explainable.
**Tags:** engine, no-NaN · **Status:** accepted

### IDEA-022 — Design Combination as a Patch Layer
**Concept:** A design combo isn't a new recipe — it's a patch overriding increments or appending/replacing ops on a base.
**Novelty:** Stealth bridge from option-a to option-b; the base-block refactor is half-done if variants are patches.
**Tags:** architecture, a→b · **Status:** open

### IDEA-023 — Recipe Self-Test Across the Size Chart
**Concept:** Before publishing, auto-run a recipe against every size in the linked Size Chart and assert no degenerate geometry (self-intersections, negative lengths, zero-area pieces).
**Novelty:** Makes "Scientific Atelier" provable — publishable only if it solves for the whole size range.
**Tags:** trust, verification · **Status:** open

### IDEA-024 — Authoring Surface — Visual vs DSL
**Concept:** Author via a visual editor and/or a declarative JSON/DSL that the editor reads/writes; start hand-authored JSON, add visual layer later.
**Novelty:** Truth definable without code, in a diffable, version-controllable source format.
**Tags:** authoring, ux · **Status:** open

## IDEAS — User Vision

### IDEA-025 — Visual-First Authoring with Formula Derivation
**Concept:** In the Dress Type edit screen, per Design Combination, the author constructs the pattern visually (drawing points/lines/curves), and the editor derives the recipe ops + formulas from that visual work automatically.
**Novelty:** Inverts typical CAD (type formula → see result): here, draw → system infers the parametric formula. Lowers authoring to a tailor's natural drawing skill.
**Tags:** authoring, ux, core · **Status:** accepted (user vision; central)

---

## OPEN THREADS (parking lot)
- **Formula derivation crux (DEC-005):** when an author draws a distance, how does the system decide it means `bust_circ/4 + ease` vs a fixed constant? (binding a drawn dimension to a measurement code / proportion).
- **Minimal op-set (IDEA-018):** enumerate the ~6–8 primitives that draft a Shirt and a Skirt.
- 2D layout interaction details: real-time editing, mirror/symmetry, multi-size overlay.
- Migration trigger criteria for a→b (when does repetition justify base-block refactor?).

## NEXT
- Deepen the **formula-derivation crux** for visual-first authoring (DEC-005 / IDEA-025), and/or
- Enumerate the **minimal op-set** (IDEA-018) for Shirt + Skirt.
- Remaining techniques available: **Morphological Analysis**, **SCAMPER** (optional).

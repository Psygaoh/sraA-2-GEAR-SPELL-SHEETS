# GOAL.md - Shadowrun Spell Sheet Web App

## Project Vision

Build a lightweight, beautiful web application for preparing and rendering easy-to-print spell sheets for Shadowrun Anarchy 2 tabletop RPG. The app should evoke a gritty, high-tech cyberpunk aesthetic—streets influence, lowlife energy, technological edge—reminiscent of Shadowrun Anarchy 2's visual identity.

This is a local-first tool: no backend, no cloud dependency, pure client-side rendering optimized for offline use and print.

---

## Phase 1: Foundation (Current Phase)

### Objectives

1. **Beautiful Cyberpunk Front End**
   - Custom Tailwind palette with neon accents (cyan, magenta, lime green) blended with shadow blacks and grungy grays
   - Two-column layout: narrow sidebar with spell list + main viewport for spell detail
   - Responsive design (desktop-first, mobile-friendly)
   - Keyboard-first navigation (arrow keys, search, shortcuts)
   - Print-optimized styling (crisp typography, clear hierarchy)

2. **Modular JSON Data Schema**
   - Single source of truth: `data/spells.json`
   - Spell structure with French field names reflecting Shadowrun Anarchy mechanics
   - Support for future extensibility (tags, prerequisites, variants)

3. **Interactive Spell Renderer**
   - Display spell card with all details from JSON
   - Sidebar list with real-time search filtering
   - Keyboard shortcuts: `/` to search, arrow keys to navigate, `Escape` to clear, `P` to print

### Spell Data Schema

```json
{
  "spells": [
    {
      "id": "string (unique identifier)",
      "nom": "string (spell name in French)",
      "type": "string (e.g., 'Combat (direct, I)')",
      "seuil": "string (threshold/opposing pool description)",
      "effet": "string (main effect)",
      "notes": "string (additional notes, mechanics, conditions)",
      "categorie": "string (combat|utility|detection|manipulation)",
      "tags": ["string (optional tags for filtering)"],
      "niveau": "number (spell level, optional)",
      "duree": "string (duration, optional)",
      "distance": "string (range/distance, optional)"
    }
  ]
}
```

### Success Criteria (Phase 1 Complete When)

- [ ] Vite + Tailwind + Vue 3 project initialized and running locally
- [ ] Cyberpunk color palette defined and applied to UI shell
- [ ] Sidebar spell list renders from `data/spells.json`
- [ ] Search functionality filters spells in real-time
- [ ] Keyboard navigation works (arrows, search, escape)
- [ ] Spell detail card displays all JSON fields cleanly
- [ ] Simple placeholder icon (book symbol) for spells
- [ ] No external dependencies beyond Vite/Tailwind/Vue
- [ ] README with local dev instructions (vite dev, build, preview)

---

## Phase 2: Data & Extensibility (Future)

- Bulk import spells from CSV/JSON
- Spell templates/variants system
- Gear data structure (similar to spells)
- Advanced filtering (by type, level, duration)
- Favorites/marked spells for quick access

---

## Phase 3: Print & Export (Future)

- Print stylesheet optimized for single-page or multi-page layouts
- PDF export capability (via print-to-PDF)
- Custom sheet templates (character spell cards, gear manifests)

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Build** | Vite | Fast HMR, minimal config, modern ES modules |
| **Styling** | Tailwind CSS | Utility-first, custom palette, responsive, no bloat |
| **Framework** | Vue 3 (Composition API) | Lightweight, reactive state, modular components |
| **Data** | JSON (local file) | No backend, offline-ready, human-readable, portable |
| **Icons** | Feather/Lucide or Emoji | Simple, scalable, no external asset overhead |
| **Target** | Modern browsers (Chrome, Firefox, Safari, Edge) | Desktop-first, no IE11 support needed |

---

## Non-Goals (Phase 1)

- User accounts or authentication
- Backend database or API
- Gear system (spells only)
- PDF generation (use browser print)
- Live collaboration
- Real-time data sync
- Mobile app (web only)
- Multiple languages (French only)

---

## File Structure (Target)

```
srA-2-gear-spell-sheets/
├── GOAL.md
├── AGENT.md
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── components/
│   │   ├── SpellList.vue
│   │   ├── SpellDetail.vue
│   │   ├── SearchBar.vue
│   │   └── Sidebar.vue
│   ├── stores/
│   │   └── spellStore.js
│   ├── data/
│   │   └── spells.json
│   └── styles/
│       ├── main.css (Tailwind imports)
│       └── custom-palette.css (cyberpunk overrides)
├── public/
│   └── (favicon, static assets)
└── dist/ (build output)
```

---

## Development Workflow

1. Clone repo locally
2. Run `npm install`
3. Run `npm run dev` to start Vite dev server
4. Edit components, styles, data in real-time HMR
5. Commit changes with clear messages (see AGENT.md)
6. Run `npm run build` for production
7. Serve from `dist/` for testing or deployment

---

## Key Decisions

1. **Vue 3 Composition API**: Minimal state management via reactive store, no Pinia/Vuex overhead
2. **No build complexity**: Single-file components, standard imports, minimal config
3. **JSON-first data**: Hand-editable, version-control friendly, no database migration
4. **Keyboard-centric UX**: Power users can navigate entirely via keyboard
5. **Custom Tailwind palette**: Define cyberpunk colors upfront, reuse throughout
6. **Print-ready from day one**: CSS media queries for clean print output

---

## References

- Shadowrun Anarchy 2 ruleset (French)
- Cyberpunk aesthetic inspiration: Neuromancer, Blade Runner, Ghost in the Shell
- Vite documentation: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Vue 3: https://vuejs.org

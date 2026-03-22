# Shadowrun Spell Sheet Web App

A lightweight, cyberpunk-themed web application for preparing and rendering easy-to-print spell sheets for **Shadowrun Anarchy 2** tabletop RPG.

> *High-tech, low-life, streets influence. Local-first, offline-ready, print-optimized.*

---

## Original Vision

> *I want you to build me a very simple web-app, that I can run locally, to be able to render and prepare easy-to-print spell sheets, for a cyberpunk/shadowrun table top rpg.*
>
> *Let's do it in three times:*
> 1. *A basic beautiful front end, reminiscing of shadowrun anarchy 2 in the visual. Hightech, lowlife, with streets influence. Cyberpunk.*
> 2. *A JSON template for spells and gears, with names, effect, description, image, type and so on (gear, spell).*
> 3. *A renderer to be able to view them in the web-app, with a scrolling list allowing us to switch the spell we're viewing with a basic on key search.*

This project delivers **Phase 1** (cyberpunk UI) and the foundation for Phase 2 & 3.

---

## Features

- ✨ **Cyberpunk Aesthetic** — Neon accents (cyan, magenta, lime), grungy grays, deep blacks
- ⌨️ **Keyboard-First Navigation** — Power users navigate entirely via keyboard
- 🔍 **Real-Time Search** — Instant filtering of spells with debouncing
- 🖨️ **Print-Optimized** — Crisp layouts, optimal typography for printing
- 📱 **Responsive Design** — Desktop-first, mobile-friendly fallback
- 🚀 **No Backend** — 100% client-side, offline-capable, no dependencies
- 📝 **French-Language** — Full support for Shadowrun Anarchy French ruleset
- 🎯 **Modular Components** — Easy to extend with new spells/gears

---

## Quick Start

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)
- A modern browser (Chrome, Firefox, Safari, Edge)
- Terminal/command line access

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/srA-2-gear-spell-sheets.git
cd srA-2-gear-spell-sheets

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173 (Vite default)
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview

# Output is in dist/ folder
```

---

## Project Structure

```
srA-2-gear-spell-sheets/
├── GOAL.md                      # Project vision & roadmap
├── AGENT.md                     # Development standards & best practices
├── README.md                    # This file
├── package.json
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind + custom cyberpunk palette
├── index.html                   # Entry HTML
├── src/
│   ├── main.js                  # App bootstrap
│   ├── App.vue                  # Root component
│   ├── components/
│   │   ├── SpellList.vue        # Sidebar spell list with keyboard nav
│   │   ├── SpellDetail.vue      # Main spell display viewport
│   │   ├── SearchBar.vue        # Search input + filter controls
│   │   └── Sidebar.vue          # Container (list + search)
│   ├── stores/
│   │   └── spellStore.js        # Reactive spell data, filters, methods
│   ├── data/
│   │   ├── spells/
│   │   │   ├── index.js         # Aggregates per-category spell files
│   │   │   ├── combat.json
│   │   │   ├── detection.json
│   │   │   ├── manipulation.json
│   │   │   ├── illusion.json
│   │   │   └── sante.json
│   │   └── spells.json          # Flattened all-spells compatibility file
│   └── styles/
│       ├── main.css             # Tailwind imports + global styles
│       └── custom-palette.css   # Cyberpunk color definitions
├── public/
│   └── favicon.svg
└── dist/                        # Production build output (generated)
```

---

## Keyboard Shortcuts

| Key(s) | Action | Notes |
|--------|--------|-------|
| `/` | Focus search bar | Jump to search input from anywhere |
| `Escape` | Clear search / close modal | Reset filters and selection |
| `↑ Arrow Up` | Previous spell in list | Navigate up through spell list |
| `↓ Arrow Down` | Next spell in list | Navigate down through spell list |
| `Enter` | Select highlighted spell | Confirm selection and view detail |
| `Ctrl+P` / `Cmd+P` | Print current spell | Opens browser print dialog |
| `Tab` | Focus next element | Standard accessibility navigation |

---

## Data Format

### Spell JSON Schema

Spells are stored in `src/data/spells.json` with the following structure:

```json
{
  "spells": [
    {
      "id": "eclairManaEtourdissant",
      "nom": "Éclair mana / étourdissant",
      "type": "Combat (direct, I)",
      "seuil": "Selon aire d'effet",
      "effet": "Inflige des dommages létaux et Éclair étourdissant des dommages étourdissants",
      "notes": "Si l'attaque est réussie, les dommages sont appliqués : VD (Succès nets) dommages létaux et Éclair étourdissant des dommages étourdissants",
      "categorie": "combat",
      "tags": ["direct", "damage", "stun"],
      "niveau": 1,
      "duree": "Instantané",
      "distance": "Ligne de vue"
    }
  ]
}
```

### Field Reference

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | String | ✅ | Unique identifier (camelCase) | `"eclairManaEtourdissant"` |
| `nom` | String | ✅ | Spell name (French) | `"Éclair mana / étourdissant"` |
| `type` | String | ✅ | Spell type / category | `"Combat (direct, I)"` |
| `seuil` | String | ✅ | Threshold / opposing pool | `"Selon aire d'effet"` |
| `effet` | String | ✅ | Main effect description | `"Inflige des dommages..."` |
| `notes` | String | ✅ | Additional mechanics / conditions | Long text |
| `categorie` | String | ✅ | Category for filtering | `"combat"`, `"utility"`, `"detection"` |
| `tags` | Array | ❌ | Tags for advanced filtering | `["direct", "damage"]` |
| `niveau` | Number | ❌ | Spell level / power | `1`, `2`, `3` |
| `duree` | String | ❌ | Duration | `"Instantané"`, `"1 round"` |
| `distance` | String | ❌ | Range / distance | `"Ligne de vue"`, `"10 mètres"` |
| `image` | String | ❌ | Image URL or base64 | `"data:image/png;base64,..."` |

### Adding New Spells

Edit the category file in `src/data/spells/` (`combat.json`, `detection.json`, `manipulation.json`, `illusion.json`, `sante.json`).  
Each file is focused on one category so updates are easier to maintain. The app hot-reloads automatically during development.

---

## Development

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Build** | Vite | Fast HMR, minimal config, modern ES modules |
| **Styling** | Tailwind CSS | Utility-first, custom palette, zero bloat |
| **Framework** | Vue 3 (Composition API) | Lightweight, reactive, modular components |
| **Data** | JSON (local) | No backend, offline-ready, version-control friendly |

### Development Workflow

```bash
# Watch for changes and hot-reload
npm run dev

# Check for type/lint errors
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

### Code Standards

For detailed coding guidelines, see [AGENT.md](AGENT.md):

- **Naming**: camelCase variables, PascalCase components, kebab-case CSS classes
- **Components**: Vue 3 Composition API with single-file components (`.vue`)
- **State Management**: Lightweight store pattern in `stores/spellStore.js`
- **Styling**: Tailwind utilities + custom cyberpunk palette
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Debounced search, computed properties, lazy evaluation

### Cyberpunk Color Palette

Defined in `tailwind.config.js`:

```javascript
{
  'neon-cyan': '#00F7FF',      // Bright cyan accent
  'neon-magenta': '#FF006E',   // Hot magenta
  'neon-lime': '#39FF14',      // Acid lime green
  'shadow-black': '#0A0E27',   // Deep space black
  'shadow-dark': '#1A1F3A',    // Lighter dark gray
  'street-gray': '#3D4656',    // Grungy gray
  'muted-purple': '#6A0572',   // Deep purple undertone
  'corp-white': '#E8E8E8'      // Off-white
}
```

Use in templates:

```vue
<div class="bg-shadow-black text-neon-cyan border border-neon-magenta">
  Cyberpunk card
</div>
```

---

## Project Phases

### Phase 1 ✅ Current

- Beautiful cyberpunk UI (Vite + Tailwind + Vue 3)
- Spell renderer from JSON
- Search + keyboard navigation
- French language support

### Phase 2 (Planned)

- Gear system (alongside spells)
- Bulk import from CSV/JSON
- Advanced filtering (by type, level, duration)
- Spell variants/templates
- Favorites / marked spells

### Phase 3 (Planned)

- Print stylesheet optimization
- PDF export
- Custom sheet templates
- Character spell card manifests

See [GOAL.md](GOAL.md) for full roadmap.

---

## Testing

### Manual Testing Checklist

- [ ] Search filters spells in real-time
- [ ] Keyboard navigation works (arrows, Enter, Escape)
- [ ] `/` focuses search bar
- [ ] Spell detail displays all fields correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Print preview looks clean (Ctrl+P)
- [ ] No console errors in DevTools
- [ ] Works offline (after initial load)

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

(No IE11 support)

---

## Contributing

This is a personal project, but contributions are welcome!

### Before You Start

1. Read [GOAL.md](GOAL.md) for project vision
2. Read [AGENT.md](AGENT.md) for code standards
3. Open an issue or discussion first for major changes

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`

**Example**:
```
feat(SpellList): add keyboard navigation wrapping

Arrow keys now correctly wrap from last to first spell and vice versa.

Closes #12
```

---

## Performance & Accessibility

### Performance

- ⚡ Vite HMR: near-instant reloads during development
- 🎯 Debounced search: prevents excessive filtering on every keystroke
- 🖨️ Lazy image loading: images load only when needed
- 📦 Tree-shaking: unused code removed in production builds

### Accessibility

- ⌨️ Full keyboard navigation (no mouse required)
- 🏷️ Semantic HTML + ARIA labels
- 🎨 High contrast cyberpunk colors (WCAG AA compliant)
- 📱 Responsive design
- 🔊 Screen reader support

---

## Troubleshooting

### Port already in use (5173)

```bash
# Use a different port
npm run dev -- --port 3000
```

### Search not working

- Check browser console for errors (F12)
- Verify `spells.json` is valid JSON (use JSONLint)
- Ensure spell names contain search query

### Build fails

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

### Styles not updating

- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check Tailwind config has correct `content` paths
- Clear `.next` or `dist` folder and rebuild

---

## File Sizes (Production Build)

Expected after `npm run build`:

```
dist/
├── index.html           ~2 KB
├── assets/
│   ├── main.js          ~50 KB (Vue 3 + app)
│   └── style.css        ~15 KB (Tailwind)
└── Total:               ~70 KB gzipped
```

---

## Privacy & Data

- ✅ **No tracking**: No analytics, no telemetry
- ✅ **No backend**: All data stored locally in browser
- ✅ **No API calls**: Works 100% offline
- ✅ **No cookies**: No session data stored
- ✅ **Open source**: Inspect code freely

---

## License

MIT (specify if different)

---

## Credits & Inspiration

- **Shadowrun Anarchy 2** ruleset (French edition)
- Cyberpunk aesthetic: Neuromancer, Blade Runner, Ghost in the Shell
- Icons: Feather Icons / Lucide
- Framework: Vue 3, Tailwind CSS, Vite

---

## Roadmap & TODOs

- [ ] Phase 1: Core UI + spell rendering (IN PROGRESS)
- [ ] Phase 2: Gear system + advanced filtering (PLANNED)
- [ ] Phase 3: Print optimization + PDF export (PLANNED)
- [ ] Bulk import wizard (PLANNED)
- [ ] Custom color themes (FUTURE)
- [ ] Mobile app (FUTURE)

---

## Questions?

Refer to:
- [GOAL.md](GOAL.md) for project vision & scope
- [AGENT.md](AGENT.md) for code standards & practices
- Browser console (F12) for error messages
- GitHub Issues for bugs or feature requests

---

**Built with ⚡ Vite, 🎨 Tailwind, and 💜 Vue 3**

*High-tech. Low-life. Streets. Cyberpunk.*

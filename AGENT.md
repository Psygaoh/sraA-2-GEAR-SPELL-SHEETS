# AGENT.md - Development Standards & Best Practices

## Code Standards

### Naming Conventions

**Variables & Functions**
```javascript
// camelCase for variables and functions
const currentSpell = ref(null);
const filterSpellsByType = (spells, type) => { ... };
const isSearchOpen = ref(false);
```

**Components (Vue .vue files)**
```vue
<!-- PascalCase for component names -->
<!-- File: SpellDetail.vue, SpellList.vue, SearchBar.vue -->
<template>
  <div class="spell-detail">...</div>
</template>
```

**CSS Classes & IDs**
```css
/* kebab-case for CSS classes (Tailwind favors this) */
.spell-card { ... }
.sidebar-list { ... }
.search-bar-input { ... }

/* Avoid IDs for styling; use classes instead */
```

**Constants**
```javascript
const DEBOUNCE_DELAY = 300;
const MAX_SPELL_NAME_LENGTH = 60;
const DEFAULT_CATEGORY = 'utility';
```

### Code Organization

**Component Structure**
```vue
<template>
  <!-- Semantic HTML -->
  <section class="spell-detail">
    <h1>{{ spell.nom }}</h1>
    ...
  </section>
</template>

<script setup>
// Imports
import { ref, computed } from 'vue';
import { spellStore } from '@/stores/spellStore';

// Props
defineProps({
  spellId: String
});

// Reactive state
const isLoading = ref(false);

// Computed
const spell = computed(() => spellStore.getSpellById(props.spellId));

// Methods
const handlePrint = () => { ... };

// Lifecycle hooks (if needed)
onMounted(() => { ... });
</script>

<style scoped>
/* Component-scoped styles; override with Tailwind classes when possible */
.spell-detail { ... }
</style>
```

**File Naming**
- Vue components: `PascalCase.vue`
- JavaScript utilities: `camelCase.js`
- Store files: `spellStore.js`, `uiStore.js`
- Data files: `spells.json`, `config.json`

---

## Project Structure

```
src/
├── main.js                      # App entry point
├── App.vue                      # Root component
├── components/
│   ├── SpellList.vue           # Sidebar list of spells
│   ├── SpellDetail.vue         # Main spell display
│   ├── SearchBar.vue           # Search input + controls
│   ├── Sidebar.vue             # Container for list + search
│   └── SpellCard.vue           # Reusable spell card snippet (optional)
├── stores/
│   └── spellStore.js           # Reactive spell data + filters
├── data/
│   └── spells.json             # Master spell database (French)
└── styles/
    ├── main.css                # Tailwind + global imports
    └── custom-palette.css      # Cyberpunk color overrides
```

---

## Vue 3 Composition API Guidelines

### Reactive State

```javascript
// ✅ DO: Use ref() for primitive values
const currentSpellId = ref('spell-001');
const isSearchOpen = ref(false);

// ✅ DO: Use reactive() for objects
const filters = reactive({
  type: 'all',
  search: '',
  favorited: false
});

// ❌ DON'T: Mutate without ref/reactive
let spellCount = 0; // Will not be reactive
```

### Computed Properties

```javascript
// ✅ DO: Use computed() for derived state
const filteredSpells = computed(() => {
  return spellStore.spells.filter(spell => {
    return spell.nom.toLowerCase().includes(filters.search.toLowerCase());
  });
});

// ❌ DON'T: Compute in template or methods repeatedly
```

### Methods & Event Handlers

```javascript
// ✅ DO: Define methods as regular functions
const handleSearchInput = (query) => {
  filters.search = query;
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') clearSearch();
  if (event.key === 'ArrowDown') selectNextSpell();
};

// ❌ DON'T: Use arrow functions for component methods with 'this' context
// (Vue 3 Composition API doesn't need 'this', so this is moot)
```

---

## Tailwind CSS & Custom Palette

### Cyberpunk Color Palette (tailwind.config.js)

```javascript
const colors = {
  'neon-cyan': '#00F7FF',      // Bright cyan accent
  'neon-magenta': '#FF006E',   // Hot magenta
  'neon-lime': '#39FF14',      // Acid lime green
  'shadow-black': '#0A0E27',   // Deep space black
  'shadow-dark': '#1A1F3A',    // Slightly lighter black
  'street-gray': '#3D4656',    // Grungy gray (neon container)
  'muted-purple': '#6A0572',   // Deep purple undertone
  'corp-white': '#E8E8E8',     // Off-white (not pure white)
};
```

### Usage in Components

```vue
<!-- ✅ DO: Use Tailwind utility classes -->
<div class="bg-shadow-black text-neon-cyan border border-neon-magenta rounded-lg p-4">
  Cyberpunk Card
</div>

<!-- ❌ DON'T: Use inline styles when Tailwind class exists -->
<div style="background-color: #0A0E27; color: #00F7FF;">
  ❌ Avoid this
</div>
```

### Responsive Design

```vue
<!-- Mobile-first approach -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Adapts to screen size -->
</div>
```

---

## Accessibility & Keyboard Navigation

### Keyboard Shortcuts (Global)

| Key(s) | Action | Implementation |
|--------|--------|-----------------|
| `/` | Focus search bar | `@keydown.slash` in App.vue |
| `Escape` | Clear search / close modal | `@keydown.esc` in SearchBar.vue |
| `Arrow Up` | Previous spell in list | `@keydown.up` in SpellList.vue |
| `Arrow Down` | Next spell in list | `@keydown.down` in SpellList.vue |
| `Enter` | Select highlighted spell | `@keydown.enter` in SpellList.vue |
| `Ctrl+P` or `Cmd+P` | Print current spell | `@keydown.ctrl.p` in SpellDetail.vue |

### ARIA & Semantic HTML

```vue
<!-- ✅ DO: Use semantic HTML + ARIA labels -->
<nav class="sidebar" role="navigation" aria-label="Spell list">
  <ul role="listbox" aria-label="Available spells">
    <li v-for="spell in spells" :key="spell.id" role="option" @click="selectSpell(spell)">
      {{ spell.nom }}
    </li>
  </ul>
</nav>

<!-- ✅ DO: Provide alternative text for icons -->
<button aria-label="Print spell sheet" title="Print (Ctrl+P)">
  <IconPrint />
</button>

<!-- ❌ DON'T: Forget labels on inputs -->
<input type="text" placeholder="Search..." /> <!-- Missing label! -->
```

---

## Store Pattern (spellStore.js)

```javascript
import { ref, computed } from 'vue';
import spellsData from '@/data/spells.json';

export const spellStore = {
  // State
  spells: ref(spellsData.spells || []),
  currentSpellId: ref(null),
  
  // Computed
  currentSpell: computed(() => {
    return spellStore.spells.value.find(s => s.id === spellStore.currentSpellId.value);
  }),
  
  // Methods
  getSpellById(id) {
    return spellStore.spells.value.find(s => s.id === id);
  },
  
  filterByType(type) {
    return spellStore.spells.value.filter(s => s.type === type);
  },
  
  searchSpells(query) {
    const q = query.toLowerCase();
    return spellStore.spells.value.filter(s => 
      s.nom.toLowerCase().includes(q) || 
      s.effet.toLowerCase().includes(q)
    );
  }
};
```

---

## Data Schema (spells.json)

### Example Spell Entry

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

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | String | Unique identifier (camelCase, no spaces) | `"eclairManaEtourdissant"` |
| `nom` | String | Spell name in French | `"Éclair mana / étourdissant"` |
| `type` | String | Spell type/category | `"Combat (direct, I)"` |
| `seuil` | String | Threshold or opposing pool | `"Selon aire d'effet"` |
| `effet` | String | Main effect description | `"Inflige des dommages..."` |
| `notes` | String | Additional mechanics/conditions | Long text |
| `categorie` | String | Category for filtering | `"combat"`, `"utility"`, `"detection"` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `tags` | Array | Tags for advanced filtering | `["direct", "damage"]` |
| `niveau` | Number | Spell level/power | `1`, `2`, `3` |
| `duree` | String | Duration | `"Instantané"`, `"1 round"` |
| `distance` | String | Range/distance | `"Ligne de vue"`, `"10 mètres"` |
| `image` | String | Image URL or base64 | `"data:image/png;base64,..."` |

---

## Git Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature (new component, new spell field)
- `fix`: Bug fix (search not working, styling issue)
- `style`: Code style changes (no logic changes)
- `refactor`: Restructure code without changing behavior
- `test`: Add or update tests
- `docs`: Update documentation (README, GOAL.md)
- `chore`: Dependency updates, build config

### Examples

```
feat(SearchBar): add debounced search filtering

Implement real-time spell filtering with 300ms debounce to improve performance
when searching large spell lists.

Closes #5
```

```
fix(SpellList): fix keyboard navigation wrapping

Arrow keys now correctly wrap from last to first spell and vice versa.

Fixes #12
```

```
docs(GOAL.md): add Phase 2 extensibility goals
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start dev server with HMR
npm run dev

# Access at http://localhost:5173 (Vite default)
```

### Code Review Checklist

Before committing, ensure:

- [ ] Component props are documented
- [ ] Computed properties have clear intent
- [ ] Event handlers are named `handle*` (e.g., `handleClick`)
- [ ] Async operations are wrapped in `try/catch`
- [ ] No unused imports or variables
- [ ] Tailwind classes used instead of custom CSS (when possible)
- [ ] Keyboard accessibility tested (Tab, arrows, Enter)
- [ ] Responsive design tested (mobile, tablet, desktop)

### Testing Approach

- Manual testing: Use browser DevTools and keyboard navigation
- Responsive testing: Chrome DevTools responsive mode
- Browser compatibility: Test on Chrome, Firefox, Safari
- Print testing: Use browser print preview (Ctrl+P)

---

## Performance Guidelines

### Debouncing

```javascript
// Search input: debounce to avoid filtering on every keystroke
const debouncedSearch = ref('');
const searchQuery = ref('');

const updateSearch = debounce((query) => {
  searchQuery.value = query;
}, 300);

// Helper function
const debounce = (fn, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};
```

### Lazy Evaluation

```javascript
// ✅ DO: Compute filtered spells only when needed
const filteredSpells = computed(() => { ... });

// ❌ DON'T: Filter in every render
// <div v-for="spell in spells.filter(...)">
```

---

## Error Handling

```javascript
// ✅ DO: Handle missing data gracefully
const currentSpell = computed(() => {
  return spellStore.getSpellById(props.spellId) || {
    nom: 'Unknown',
    effet: 'No data available'
  };
});

// ❌ DON'T: Assume data is always present
const spell = spellStore.spells[0]; // May crash if spells is empty
```

---

## Documentation

### Component Comments

```vue
<!-- SpellDetail.vue: Display full spell details in main viewport -->
<template>
  <!-- ... -->
</template>

<script setup>
/**
 * Props:
 *   - spellId (String): ID of the spell to display
 * 
 * Events:
 *   - spell-selected (id): Emitted when user clicks related spell
 */
defineProps({
  spellId: String
});
</script>
```

### README Sections

The README should cover:
1. Project overview
2. Installation & setup
3. Local development (`npm run dev`)
4. Build & deploy (`npm run build`)
5. Project structure
6. Keyboard shortcuts
7. Data format
8. Contributing guidelines (reference AGENT.md)

---

## Questions? Refer to GOAL.md for project vision, or discuss with team before major refactors.

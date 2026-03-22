import { ref, computed, reactive } from 'vue'
import { allSpells } from '@/data/spells/index.js'

const spellsArray = Array.isArray(allSpells) ? allSpells : []

// Reactive state
const spells = ref(spellsArray)
const currentSpellId = ref(spells.value.length > 0 ? spells.value[0].id : null)
const filters = reactive({
  search: '',
  category: 'all',
})

// Computed properties
const currentSpell = computed(() => {
  return spells.value.find(s => s.id === currentSpellId.value) || null
})

const filteredSpells = computed(() => {
  let result = spells.value.filter(s => s && s.id) // Safety check

  // Filter by search query
  if (filters.search.trim()) {
    const query = filters.search.toLowerCase()
    result = result.filter(spell =>
      (spell.nom && spell.nom.toLowerCase().includes(query)) ||
      (spell.effet && spell.effet.toLowerCase().includes(query)) ||
      (spell.type && spell.type.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (filters.category !== 'all') {
    result = result.filter(spell => spell.categorie === filters.category)
  }

  return result
})

const categories = computed(() => {
  const cats = new Set(spells.value.filter(s => s).map(s => s.categorie))
  return Array.from(cats).sort()
})

// Methods
const selectSpell = (id) => {
  if (spells.value.some(s => s.id === id)) {
    currentSpellId.value = id
  }
}

const searchSpells = (query) => {
  filters.search = query
}

const clearSearch = () => {
  filters.search = ''
}

const filterByCategory = (category) => {
  filters.category = category
}

const getSpellById = (id) => {
  return spells.value.find(s => s.id === id)
}

const getNextSpellId = () => {
  const index = filteredSpells.value.findIndex(s => s.id === currentSpellId.value)
  if (index === -1) return filteredSpells.value[0]?.id || null
  const nextIndex = (index + 1) % filteredSpells.value.length
  return filteredSpells.value[nextIndex]?.id || null
}

const getPreviousSpellId = () => {
  const index = filteredSpells.value.findIndex(s => s.id === currentSpellId.value)
  if (index === -1) return filteredSpells.value[filteredSpells.value.length - 1]?.id || null
  const prevIndex = (index - 1 + filteredSpells.value.length) % filteredSpells.value.length
  return filteredSpells.value[prevIndex]?.id || null
}

const selectNextSpell = () => {
  const nextId = getNextSpellId()
  if (nextId) selectSpell(nextId)
}

const selectPreviousSpell = () => {
  const prevId = getPreviousSpellId()
  if (prevId) selectSpell(prevId)
}

export const spellStore = {
  // State
  spells,
  currentSpellId,
  filters,

  // Computed
  currentSpell,
  filteredSpells,
  categories,

  // Methods
  selectSpell,
  searchSpells,
  clearSearch,
  filterByCategory,
  getSpellById,
  selectNextSpell,
  selectPreviousSpell,
}

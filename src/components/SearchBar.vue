<template>
  <div class="search-bar bg-shadow-dark border-b border-street-gray p-3">
    <div class="flex flex-col gap-2">
      <div class="relative">
        <input
          data-search
          type="text"
          :value="spellStore.filters.search"
          @input="updateSearch"
          @keydown.escape="clearSearch"
          placeholder="Search spells... (/ to focus)"
          class="input-field w-full"
          aria-label="Search spells"
        />
        <span v-if="spellStore.filters.search" class="absolute right-3 top-2 text-neon-cyan text-xs cursor-pointer" @click="clearSearch">
          ✕ Clear
        </span>
      </div>
      
      <!-- Results count -->
      <div v-if="spellStore.filters.search" class="text-xs text-street-gray">
        {{ spellStore.filteredSpells.length }} spell(s) found
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { spellStore } from '@/stores/spellStore'

// Debounce search input
let debounceTimer = null
const updateSearch = (event) => {
  const query = event.target.value
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    spellStore.searchSpells(query)
  }, 300)
}

const clearSearch = () => {
  spellStore.clearSearch()
  const input = document.querySelector('input[data-search]')
  if (input) {
    input.value = ''
    input.focus()
  }
}
</script>

<style scoped>
.search-bar {
  flex-shrink: 0;
}
</style>

<template>
  <aside class="sidebar w-80 flex flex-col bg-shadow-dark border-r border-street-gray">
    <!-- Header -->
    <div class="sidebar-header bg-shadow-black border-b border-street-gray p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-bold text-neon-cyan text-glitch">
            🔮 Grimoire
          </h1>
        </div>
        <button
          type="button"
          class="sidebar-close border border-neon-cyan text-neon-cyan"
          @click="emit('close')"
          aria-label="Close spell list"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <SearchBar />

    <!-- Spell List -->
    <SpellList @select-spell="handleSelectSpell" />
  </aside>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import SpellList from '@/components/SpellList.vue'

const emit = defineEmits(['select-spell', 'close'])

const handleSelectSpell = (id) => {
  emit('select-spell', id)
}
</script>

<style scoped>
.sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
  height: 100%;
}

.sidebar-header {
  flex-shrink: 0;
}

.sidebar-close {
  background-color: rgba(var(--color-neon-cyan-rgb), 0.08);
  border-radius: 4px;
  cursor: pointer;
  display: none;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 6px 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.sidebar-close:hover {
  background-color: rgba(var(--color-neon-cyan-rgb), 0.2);
  box-shadow: 0 0 12px rgba(var(--color-neon-cyan-rgb), 0.45);
}

@media (max-width: 900px) {
  .sidebar-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

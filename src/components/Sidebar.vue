<template>
  <aside class="sidebar w-80 flex flex-col bg-shadow-dark border-r border-street-gray">
    <!-- Header -->
    <div class="sidebar-header bg-shadow-black border-b border-street-gray p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-bold text-neon-cyan text-glitch">
            🔮 Spells
          </h1>
          <p class="text-secondary text-xs mt-1">Shadowrun Anarchy</p>
        </div>
        <button
          type="button"
          class="theme-toggle border border-neon-magenta text-neon-magenta"
          @click="handleToggleTheme"
        >
          {{ currentTheme === 'gold-pink' ? 'Cyber Theme' : 'Gold Theme' }}
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <SearchBar />

    <!-- Spell List -->
    <SpellList />
  </aside>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import SpellList from '@/components/SpellList.vue'

const { currentTheme } = defineProps({
  currentTheme: {
    type: String,
    default: 'cyber',
  },
})

const emit = defineEmits(['toggle-theme'])

const handleToggleTheme = () => {
  emit('toggle-theme')
}
</script>

<style scoped>
.sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
}

.sidebar-header {
  flex-shrink: 0;
}

.theme-toggle {
  background-color: rgba(var(--color-neon-magenta-rgb), 0.08);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 6px 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.theme-toggle:hover {
  background-color: rgba(var(--color-neon-magenta-rgb), 0.2);
  box-shadow: 0 0 12px rgba(var(--color-neon-magenta-rgb), 0.45);
}
</style>

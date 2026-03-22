<template>
  <aside class="sidebar w-80 flex flex-col bg-shadow-dark border-r border-street-gray">
    <!-- Header -->
    <div class="sidebar-header bg-shadow-black border-b border-street-gray p-4">
      <h1 class="text-xl font-bold text-neon-cyan text-glitch">
        🔮 Spells
      </h1>
      <p class="text-xs text-street-gray mt-1">Shadowrun Anarchy</p>
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
</style>

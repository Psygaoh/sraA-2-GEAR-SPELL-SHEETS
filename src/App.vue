<script setup>
import { onMounted } from 'vue'
import { spellStore } from '@/stores/spellStore'
import Sidebar from '@/components/Sidebar.vue'
import SpellDetail from '@/components/SpellDetail.vue'

// Handle keyboard shortcuts globally
const handleKeyboardEvent = (event) => {
  const key = event.key
  const ctrlOrCmd = event.ctrlKey || event.metaKey

  // "/" key - focus search
  if (key === '/' && !event.shiftKey) {
    event.preventDefault()
    const searchInput = document.querySelector('input[data-search]')
    if (searchInput) searchInput.focus()
  }

  // "Escape" key - clear search
  if (key === 'Escape') {
    spellStore.clearSearch()
  }

  // "ArrowUp" key - previous spell
  if (key === 'ArrowUp') {
    event.preventDefault()
    spellStore.selectPreviousSpell()
  }

  // "ArrowDown" key - next spell
  if (key === 'ArrowDown') {
    event.preventDefault()
    spellStore.selectNextSpell()
  }

  // "Ctrl+P" or "Cmd+P" - print
  if (ctrlOrCmd && key.toLowerCase() === 'p') {
    event.preventDefault()
    window.print()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardEvent)
})
</script>

<template>
  <div class="flex h-screen w-screen bg-shadow-black text-corp-white overflow-hidden">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Detail Area -->
    <SpellDetail />
  </div>
</template>

<style scoped>
/* App level styles */
</style>

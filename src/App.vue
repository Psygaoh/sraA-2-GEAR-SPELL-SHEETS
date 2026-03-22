<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { spellStore } from '@/stores/spellStore'
import Sidebar from '@/components/Sidebar.vue'
import SpellDetail from '@/components/SpellDetail.vue'

const THEME_STORAGE_KEY = 'sra-theme'
const DEFAULT_THEME = 'cyber'
const ALT_THEME = 'gold-pink'
const currentTheme = ref(DEFAULT_THEME)

const applyTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
}

const toggleTheme = () => {
  const nextTheme = currentTheme.value === DEFAULT_THEME ? ALT_THEME : DEFAULT_THEME
  applyTheme(nextTheme)
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
}

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
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  const startingTheme = savedTheme === ALT_THEME ? ALT_THEME : DEFAULT_THEME

  applyTheme(startingTheme)
  window.addEventListener('keydown', handleKeyboardEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})
</script>

<template>
  <div class="flex h-screen w-screen bg-shadow-black text-corp-white overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :current-theme="currentTheme" @toggle-theme="toggleTheme" />

    <!-- Main Detail Area -->
    <SpellDetail />
  </div>
</template>

<style scoped>
/* App level styles */
</style>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { spellStore } from '@/stores/spellStore'
import Sidebar from '@/components/Sidebar.vue'
import SpellDetail from '@/components/SpellDetail.vue'

const THEME_STORAGE_KEY = 'sra-theme'
const DEFAULT_THEME = 'cyber'
const ALT_THEME = 'gold-pink'
const currentTheme = ref(DEFAULT_THEME)
const isSidebarOpen = ref(false)

const applyTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
}

const toggleTheme = () => {
  const nextTheme = currentTheme.value === DEFAULT_THEME ? ALT_THEME : DEFAULT_THEME
  applyTheme(nextTheme)
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
}

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
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
    closeSidebar()
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
  <div class="app-root">
    <header class="app-topbar">
      <button type="button" class="burger-button border border-neon-cyan text-neon-cyan" @click="isSidebarOpen ? closeSidebar() : openSidebar()" aria-label="Toggle spell list">
        ☰
      </button>
      <div class="topbar-title">
        <div class="topbar-title-main">SRA2 Companion</div>
      </div>
      <button
        type="button"
        class="theme-toggle border border-neon-magenta text-neon-magenta"
        @click="toggleTheme"
      >
        {{ currentTheme === 'gold-pink' ? 'Cyber Theme' : 'Gold Theme' }}
      </button>
    </header>
    <div class="app-shell flex bg-shadow-black text-corp-white overflow-hidden">
      <div class="sidebar-drawer" :class="{ open: isSidebarOpen }">
        <Sidebar @close="closeSidebar" />
      </div>
      <button type="button" class="drawer-overlay" :class="{ open: isSidebarOpen }" @click="closeSidebar" aria-label="Close spell list overlay"></button>

      <!-- Main Detail Area -->
      <SpellDetail />
    </div>
  </div>
</template>

<style scoped>
/* App level styles */
</style>

<template>
  <div
    class="spell-detail flex-1 flex flex-col bg-shadow-black overflow-hidden"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Header -->
    <div v-if="spellStore.currentSpell.value" class="spell-header bg-gradient-to-r from-shadow-dark to-shadow-black border-b border-neon-cyan p-6">
      <div class="flex items-start gap-6">
        <!-- Icon placeholder -->
        <div class="spell-icon bg-shadow-dark border-2 border-neon-cyan rounded flex items-center justify-center flex-shrink-0" :class="categoryClass">
          <span class="spell-icon-block"></span>
          <span class="material-symbols-outlined">{{ categoryIcon }}</span>
        </div>
        
        <!-- Title section -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-neon-cyan mb-2 text-glitch">
            {{ spellStore.currentSpell.value.nom }}
          </h1>
          <div class="flex flex-wrap gap-4 text-sm">
            <div class="badge">
              <span class="label">Type:</span>
              <span class="value text-neon-magenta">{{ spellStore.currentSpell.value.type }}</span>
            </div>
            <div class="badge">
              <span class="label">Category:</span>
              <span class="value text-neon-lime">{{ spellStore.currentSpell.value.categorie }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-if="spellStore.currentSpell.value" class="spell-content flex-1 overflow-y-auto p-6">
      <div class="space-y-6">
        <!-- Threshold/Seuil -->
        <div class="field">
          <h2 class="field-label text-neon-magenta">Seuil / Réserve Opposée</h2>
          <p class="field-value">{{ spellStore.currentSpell.value.seuil }}</p>
        </div>

        <!-- Effect -->
        <div class="field">
          <h2 class="field-label text-neon-lime">Effet</h2>
          <p class="field-value">{{ spellStore.currentSpell.value.effet }}</p>
        </div>

        <!-- Duration -->
        <div v-if="spellStore.currentSpell.value.duree" class="field">
          <h2 class="field-label text-neon-cyan">Durée</h2>
          <p class="field-value">{{ spellStore.currentSpell.value.duree }}</p>
        </div>

        <!-- Distance -->
        <div v-if="spellStore.currentSpell.value.distance" class="field">
          <h2 class="field-label text-neon-cyan">Distance</h2>
          <p class="field-value">{{ spellStore.currentSpell.value.distance }}</p>
        </div>

        <!-- Notes -->
        <div v-if="spellStore.currentSpell.value.notes" class="field bg-shadow-dark border border-street-gray rounded p-4">
          <h2 class="field-label text-neon-magenta mb-2">Notes</h2>
          <p class="field-value text-sm leading-relaxed">{{ spellStore.currentSpell.value.notes }}</p>
        </div>

        <!-- Tags -->
        <div v-if="spellStore.currentSpell.value.tags && spellStore.currentSpell.value.tags.length > 0" class="field">
          <h2 class="field-label text-secondary mb-2">Tags</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in spellStore.currentSpell.value.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="flex items-center justify-center flex-1 text-secondary">
      <div class="text-center">
        <p class="text-xl mb-2">No spell selected</p>
        <p class="text-sm">Use the list on the left to select a spell</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { spellStore } from '@/stores/spellStore'

const startX = ref(0)
const startY = ref(0)
const isSwipeCandidate = ref(false)
const SWIPE_THRESHOLD = 60

const categoryIcon = computed(() => {
  const category = spellStore.currentSpell.value?.categorie?.toLowerCase?.() || ''
  const icons = {
    sante: 'health_and_safety',
    illusion: 'theater_comedy',
    combat: 'sword_rose',
    detection: 'search',
    manipulation: 'joystick'
  }
  return icons[category] || 'menu_book'
})

const categoryClass = computed(() => {
  const category = spellStore.currentSpell.value?.categorie?.toLowerCase?.() || 'default'
  return `category-${category}`
})

const handleTouchStart = (event) => {
  if (!event.touches || event.touches.length !== 1) return
  const touch = event.touches[0]
  startX.value = touch.clientX
  startY.value = touch.clientY
  isSwipeCandidate.value = true
}

const handleTouchMove = (event) => {
  if (!isSwipeCandidate.value || !event.touches || event.touches.length !== 1) return
  const touch = event.touches[0]
  const deltaX = touch.clientX - startX.value
  const deltaY = touch.clientY - startY.value
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    isSwipeCandidate.value = false
  }
}

const handleTouchEnd = (event) => {
  if (!isSwipeCandidate.value) return
  const touch = event.changedTouches && event.changedTouches[0]
  if (!touch) return
  const deltaX = touch.clientX - startX.value
  const deltaY = touch.clientY - startY.value
  if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) {
    isSwipeCandidate.value = false
    return
  }

  if (deltaX < 0) {
    spellStore.selectNextSpell()
  } else {
    spellStore.selectPreviousSpell()
  }
  isSwipeCandidate.value = false
}
</script>

<style scoped>
.spell-detail {
  background: linear-gradient(135deg, var(--color-shadow-black) 0%, var(--color-shadow-dark) 100%);
}

.spell-header {
  box-shadow: 0 0 20px rgba(var(--color-neon-cyan-rgb), 0.2);
}

.spell-icon {
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  isolation: isolate;
  box-shadow: 0 0 20px rgba(var(--color-neon-cyan-rgb), 0.45);
}

.material-symbols-outlined {
  font-size: 3.7rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.96);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
}

.spell-icon-block {
  position: absolute;
  left: 22px;
  right: 22px;
  top: 50%;
  height: 60px;
  transform: translateY(-50%);
  border-radius: 2px;
  background: linear-gradient(90deg, #40d9ff 0%, #5ef0d1 50%, #72a7ff 100%);
  box-shadow: 0 0 18px rgba(94, 240, 209, 0.18);
  z-index: 0;
}

.spell-icon::after {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  pointer-events: none;
}

.spell-icon::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
  z-index: -1;
}

.spell-icon > .material-symbols-outlined {
  position: relative;
  z-index: 1;
}

.spell-icon.category-sante {
  background: linear-gradient(135deg, #0d3b3d 0%, #0a1f2d 100%);
}

.spell-icon.category-sante .spell-icon-block {
  background: linear-gradient(90deg, #34f5b2 0%, #2be2ca 50%, #4fc4ff 100%);
  box-shadow: 0 0 18px rgba(52, 245, 178, 0.22);
}

.spell-icon.category-illusion {
  background: linear-gradient(135deg, #351a51 0%, #0f1838 100%);
}

.spell-icon.category-illusion .spell-icon-block {
  background: linear-gradient(90deg, #7c66ff 0%, #ff6ad5 52%, #9d7dff 100%);
  box-shadow: 0 0 18px rgba(179, 92, 255, 0.22);
}

.spell-icon.category-combat {
  background: linear-gradient(135deg, #5a1122 0%, #261022 100%);
}

.spell-icon.category-combat .spell-icon-block {
  background: linear-gradient(90deg, #ff9ca8 0%, #ff4b7e 50%, #ffbf8a 100%);
  box-shadow: 0 0 18px rgba(255, 75, 126, 0.24);
}

.spell-icon.category-detection {
  background: linear-gradient(135deg, #55400f 0%, #12323a 100%);
}

.spell-icon.category-detection .spell-icon-block {
  background: linear-gradient(90deg, #f5d25a 0%, #ffd86b 50%, #5ad9ff 100%);
  box-shadow: 0 0 18px rgba(255, 216, 107, 0.22);
}

.spell-icon.category-manipulation {
  background: linear-gradient(135deg, #281156 0%, #0d1c33 100%);
}

.spell-icon.category-manipulation .spell-icon-block {
  background: linear-gradient(90deg, #7a5cff 0%, #aa63ff 50%, #ff6abf 100%);
  box-shadow: 0 0 18px rgba(122, 92, 255, 0.24);
}

.spell-icon.category-default .spell-icon-block {
  background: linear-gradient(90deg, #40d9ff 0%, #5ef0d1 50%, #72a7ff 100%);
  box-shadow: 0 0 18px rgba(94, 240, 209, 0.22);
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: rgba(var(--color-neon-cyan-rgb), 0.1);
  border: 1px solid rgba(var(--color-neon-cyan-rgb), 0.26);
  border-radius: 4px;
}

.label {
  color: var(--color-corp-white);
  opacity: 0.72;
  font-weight: 600;
}

.value {
  font-weight: 500;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-value {
  color: var(--color-corp-white);
  line-height: 1.6;
  margin: 0;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: rgba(var(--color-neon-cyan-rgb), 0.12);
  border: 1px solid var(--color-neon-cyan);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--color-neon-cyan);
}

/* Print styles */
@media print {
  .spell-header {
    page-break-after: avoid;
  }

  .spell-detail {
    padding: 0;
    max-height: none;
    overflow: visible;
  }

  .spell-content {
    overflow: visible;
    page-break-inside: avoid;
  }

  .spell-footer {
    display: none;
  }

  .spell-detail::after {
    content: '';
    display: block;
    page-break-after: always;
    height: 1px;
  }
}

@media (max-width: 900px) {
  .spell-header {
    padding: 20px;
  }

  .spell-icon {
    width: 86px;
    height: 86px;
  }

  .material-symbols-outlined {
    font-size: 3rem;
  }

  .spell-icon-block {
    left: 16px;
    right: 16px;
    height: 46px;
  }

  .spell-content {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .spell-header {
    padding: 16px;
  }

  .spell-icon {
    width: 72px;
    height: 72px;
  }

  .material-symbols-outlined {
    font-size: 2.4rem;
  }

  .spell-icon-block {
    left: 12px;
    right: 12px;
    height: 36px;
  }

  .spell-content {
    padding: 16px;
  }

  .badge {
    padding: 4px 10px;
  }

  .field-label {
    font-size: 0.85rem;
  }
}
</style>

<template>
  <div class="spell-detail flex-1 flex flex-col bg-shadow-black overflow-hidden">
    <!-- Header -->
    <div v-if="spellStore.currentSpell.value" class="spell-header bg-gradient-to-r from-shadow-dark to-shadow-black border-b border-neon-cyan p-6">
      <div class="flex items-start gap-6">
        <!-- Icon placeholder -->
        <div class="spell-icon bg-shadow-dark border-2 border-neon-cyan rounded flex items-center justify-center flex-shrink-0">
          <span class="text-4xl">📖</span>
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

    <!-- Footer info -->
    <div class="spell-footer bg-shadow-dark border-t border-street-gray px-6 py-3 text-xs text-secondary">
      <p>Press / to search • Arrow keys to navigate • Ctrl+P to print • Esc to clear</p>
    </div>
  </div>
</template>

<script setup>
import { spellStore } from '@/stores/spellStore'
</script>

<style scoped>
.spell-detail {
  background: linear-gradient(135deg, var(--color-shadow-black) 0%, var(--color-shadow-dark) 100%);
}

.spell-header {
  box-shadow: 0 0 20px rgba(var(--color-neon-cyan-rgb), 0.2);
}

.spell-icon {
  width: 100px;
  height: 100px;
  box-shadow: 0 0 15px rgba(var(--color-neon-cyan-rgb), 0.35);
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

.spell-footer {
  flex-shrink: 0;
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
</style>

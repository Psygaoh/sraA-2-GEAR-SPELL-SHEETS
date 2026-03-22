<template>
  <div class="spell-list flex-1 overflow-y-auto">
    <ul role="listbox" class="list-none p-0 m-0">
      <li
        v-for="spell in spellStore.filteredSpells.value"
        :key="spell.id"
        role="option"
        :aria-selected="spell.id === spellStore.currentSpellId.value"
        class="spell-list-item"
        :class="{ active: spell.id === spellStore.currentSpellId.value }"
        @click="selectSpell(spell.id)"
      >
        <div class="spell-item-content">
          <div class="spell-name">{{ spell.nom }}</div>
          <div class="spell-type">{{ spell.type }}</div>
        </div>
      </li>
    </ul>
    
    <!-- Empty state -->
    <div v-if="spellStore.filteredSpells.value.length === 0" class="empty-state p-4">
      <p class="text-secondary text-sm">No spells found</p>
    </div>
  </div>
</template>

<script setup>
import { spellStore } from '@/stores/spellStore'

const selectSpell = (id) => {
  spellStore.selectSpell(id)
}
</script>

<style scoped>
.spell-list {
  background-color: var(--color-shadow-black);
  border-right: 1px solid var(--color-street-gray);
}

.spell-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(var(--color-neon-cyan-rgb), 0.14);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.spell-list-item:hover {
  background-color: rgba(var(--color-neon-cyan-rgb), 0.1);
  border-left: 3px solid var(--color-neon-cyan);
  padding-left: 13px;
}

.spell-list-item.active {
  background: linear-gradient(90deg, rgba(var(--color-neon-cyan-rgb), 0.18) 0%, transparent 100%);
  border-left: 4px solid var(--color-neon-cyan);
  box-shadow: inset 0 0 12px rgba(var(--color-neon-cyan-rgb), 0.16);
  padding-left: 12px;
}

.spell-item-content {
  flex: 1;
}

.spell-name {
  font-weight: 600;
  color: var(--color-corp-white);
  font-size: 0.95rem;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.spell-type {
  font-size: 0.75rem;
  color: var(--color-corp-white);
  opacity: 0.72;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.spell-list-item.active .spell-name {
  color: var(--color-neon-cyan);
  text-shadow: 0 0 10px rgba(var(--color-neon-cyan-rgb), 0.4);
}

.spell-list-item.active .spell-type {
  color: var(--color-neon-lime);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}
</style>

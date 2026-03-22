<template>
  <div class="spell-list flex-1 overflow-y-auto">
    <ul role="listbox" class="list-none p-0 m-0">
      <li
        v-for="spell in spellStore.filteredSpells"
        :key="spell.id"
        role="option"
        :aria-selected="spell.id === spellStore.currentSpellId"
        class="spell-list-item"
        :class="{ active: spell.id === spellStore.currentSpellId }"
        @click="selectSpell(spell.id)"
      >
        <div class="spell-item-content">
          <div class="spell-name">{{ spell.nom }}</div>
          <div class="spell-type">{{ spell.type }}</div>
        </div>
      </li>
    </ul>
    
    <!-- Empty state -->
    <div v-if="spellStore.filteredSpells.length === 0" class="empty-state p-4">
      <p class="text-street-gray text-sm">No spells found</p>
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
  background-color: rgb(10, 14, 39);
  border-right: 1px solid rgb(61, 70, 86);
}

.spell-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(61, 70, 86, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.spell-list-item:hover {
  background-color: rgba(61, 70, 86, 0.3);
  border-left: 3px solid rgb(0, 247, 255);
  padding-left: 13px;
}

.spell-list-item.active {
  background: linear-gradient(90deg, rgba(0, 247, 255, 0.1) 0%, transparent 100%);
  border-left: 4px solid rgb(0, 247, 255);
  box-shadow: inset 0 0 10px rgba(0, 247, 255, 0.05);
  padding-left: 12px;
}

.spell-item-content {
  flex: 1;
}

.spell-name {
  font-weight: 600;
  color: rgb(232, 232, 232);
  font-size: 0.95rem;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.spell-type {
  font-size: 0.75rem;
  color: rgb(61, 70, 86);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.spell-list-item.active .spell-name {
  color: rgb(0, 247, 255);
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
}

.spell-list-item.active .spell-type {
  color: rgb(57, 255, 20);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}
</style>

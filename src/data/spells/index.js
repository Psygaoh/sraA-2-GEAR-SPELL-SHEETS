import combat from './combat.json'
import detection from './detection.json'
import illusion from './illusion.json'
import manipulation from './manipulation.json'
import sante from './sante.json'

export const spellsByCategory = {
  combat,
  detection,
  illusion,
  manipulation,
  sante,
}

export const allSpells = Object.values(spellsByCategory).flat()

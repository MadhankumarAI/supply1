// Helper to get all unique mandis from all scenarios
import { SCENARIOS } from './mandiScenarios'

export function getAllMandis() {
  const mandiMap = new Map()
  
  Object.values(SCENARIOS).forEach(scenario => {
    scenario.mandis.forEach(mandi => {
      if (!mandiMap.has(mandi.id)) {
        mandiMap.set(mandi.id, {
          id: mandi.id,
          name: mandi.name,
          location: mandi.location
        })
      }
    })
  })
  
  return Array.from(mandiMap.values())
}

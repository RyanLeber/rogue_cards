import { defineStore } from 'pinia'
import type { Relic, Trump, Potion} from '~/types/interfaces'


export const useItemsStore = defineStore('itemsStore', () => {
  const relics = ref<Relic[]>([])
  const trumps = ref<Trump[]>([])
  const potions = ref<Potion[]>([])

  const itemsSet = ref(false)

  function $reset() {
    relics.value.length = 0
    trumps.value.length = 0
    potions.value.length = 0
  }
 
  const fetchRelics = async () => {
    try {
      relics.value = await $fetch('/api/current-game/get-relics', {
        method: 'POST',
        lazy: true,
        body: {
          relicIds : [1,7,11,18]
        }
      })
    } catch (error) {
      console.log('fetchRelics Error:', error)
    }
  }

  const fetchTrumps = async () => {
    try {
      trumps.value = await $fetch('/api/current-game/get-trumps', {
        method: 'POST',
        lazy: true,
        body: {
          trumpIds : [1,7,11,17]
        }
      })
    } catch (error) {
      console.log('fetchTrumps Error:', error)
    }
  }

  const fetchPotions = async () => {
    try {
      potions.value = await $fetch('/api/current-game/get-potions', {
        method: 'POST',
        lazy: true,
        body: {
          potionIds : [1,3]
        }
      })
    } catch (error) {
      console.log('fetchPotions Error:', error)
    }
  }

  const fetchItems = () => {
    if (!itemsSet.value) {
      itemsSet.value = true;
      fetchRelics()
      fetchTrumps()
      fetchPotions()
    }
  }

  return { 
    relics,
    trumps,
    potions,
    fetchRelics,
    fetchTrumps,
    fetchPotions,
    fetchItems,
    $reset,
  }

},
{ 
  persist: {
    storage: persistedState.sessionStorage,
  },
});

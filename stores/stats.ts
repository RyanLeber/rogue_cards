import { defineStore } from 'pinia'
import type { Class } from '~/types/interfaces'

export const useStatsStore = defineStore('statsStore', () => {
  const heroClass = ref<Class | null>()
  const gold = ref<number>(0)

  const itemsSet = ref(false)

  function $reset() {
    heroClass.value = null
  }
 


  return { 
    heroClass,
    gold,
    $reset,
  }

// },
// { 
//   persist: {
//     storage: persistedState.sessionStorage,
//   },
});


// const heroClass = reactive({
//   name: 'none',
//   energy: 0,
//   health: 0,
//   draw: 0,
//   cards: '',
//   relic: { name: '', desc: '' },
//   trump: { name: '', energy: 0, desc: '' }
// })

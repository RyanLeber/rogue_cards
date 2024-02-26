 
import { defineStore } from 'pinia'

interface Counter {
  value: number,
  name: string,
  canEdit: boolean
}

export const useCountersStore = defineStore('countsStore', () => {
  const counters = ref<Counter[]>([{ value: 0, name: 'Counter 1', canEdit: false }]);

  function addCounter() {
    counters.value.push({ value: 0, name: 'Counter 1', canEdit: false })
  }
  function removeCounter() {
    counters.value.pop()
  }
  function $resetCountersStore() {
    counters.value = [{ value: 0, name: 'Counter 1', canEdit: false }]
  }

  return { counters, addCounter, removeCounter, $resetCountersStore }

// },
// { 
//   persist: {
//     storage: persistedState.sessionStorage,
//   },
});



// export const useCountersStore = defineStore('countsStore', () => {
//   const counts = ref([]);

//   function storeCounters(counterArray: Counter) {
//     counts.value = counterArray;
//   }

//   function pushCounter(counter) {
//     counts.value.push(counter)
//   }
//   function popCounter() {
//     counts.value.pop()
//   }
//   function fetchCounters() {
//     return counts.value
//   }

//   function $resetCountersStore() {
//     counts.value.length = 0
//   }

//   return { counts, storeCounters, pushCounter, popCounter, fetchCounters, $resetCountersStore }

// }, {persist: true});
 
<template>
  <div class="">
    <div v-for="(value, idx) in counters.counts" :key="idx">

      <div class="flex items-center justify-center m-2">

        <button @click="counters.counts[idx]--"
          class="text-4xl text-bold bg-slate-500 w-16 h-16 rounded-xl mx-4"
          >
          <i class="bi bi-dash-lg"></i>
        </button>
        <div class=" flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-50 border-4 border-slate-500">
          <!-- <span class="text-slate-800 text-5xl text-center leading-none">{{ value }}</span> -->
          <textarea 
            class="text-black text-3xl" 
            name="" 
            id="" 
            cols="4" 
            rows="1"
            :value="value"
            :ref="'text'+ idx"
            ></textarea>
        </div>
        <button @click="counters.counts[idx]++"
        class="text-4xl text-bold bg-slate-500 w-16 h-16 rounded-xl mx-4"><i class="bi bi-plus-lg"></I></button>

      </div>
    </div>
    <button @click="removeCounter"
    class="button my-8 mx-4" 
    data-type="header"
    >Remove Counter</button>
    <button @click="addCounter"
    class="button my-8 mx-4" 
    data-type="header"
    >Add Counter</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const counters = reactive({
  counts: [0],
  textAreas: {}
})

const addCounter = () => {
  counters.counts.push(0)
  let idx = counters.counts.length() - 1
  counters.textAreas['text' + idx] = ref()
}

const removeCounter = () => {
  counters.counts.pop()
}


watch(counters.counts, () => {
  console.log(counters.counts)
  console.log(counters.textAreas)
})


</script>

<style>

textarea {
  resize: none;
  border: none;
}

</style>
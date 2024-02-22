<template>
  <div class="flex flex-col items-center my-4">
    <div v-for="(counter, idx) in counters" :key="idx">
      <div>
        <input
          v-model="counter.name"
          :disabled="!counter.canEdit"
          class="text-slate-700 bg-slate-400 font-semibold text-lg w-28 mx-2 px-1"
        >
        <input
          type="checkbox"
          v-model="counter.canEdit"
        >
        <label class="ml-1 text-slate-700 font-semibold text-sm"
         :for="'canEdit' + idx">Edit</label>
      </div>
      <div class="flex items-center justify-center m-2 mt-1">

        <button @click="counter.value = counter.value > 0? counter.value - 1 : counter.value"
          class="text-4xl text-bold bg-slate-500 w-16 h-16 rounded-xl mx-4"
          >
          <i class="bi bi-dash-lg"></i>
        </button>
        <div class=" flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-50 border-4 border-slate-500">
          <textarea @keydown.enter.prevent
            class="text-slate-700 bg-slate-50"
            cols="4" 
            rows="1"
            maxlength="3"
            v-model.number="counter.value"
            ></textarea>
        </div>
        <button @click="counter.value++"
        class="text-4xl text-bold bg-slate-500 w-16 h-16 rounded-xl mx-4"><i class="bi bi-plus-lg"></I></button>

      </div>
    </div>
    <div class="inline-flex">
      <AmberButton @click="removeCounter" class="my-8 mx-4 w-32">
        Del Counter
      </AmberButton>
      <AmberButton @click="addCounter" class="w-1/2 my-8 mx-4">
        Add Counter
      </AmberButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'



const counters = reactive([
  { value: 0, name: 'Counter 1', canEdit: false },
]);

// const CounterState = useState('counters', counters)

const addCounter = () => {
  counters.push({ value: 0, name: `Counter ${counters.length + 1}`, canEdit: false });
}

const removeCounter = () => {
  counters.pop();
}
</script>

<style>

textarea {
  resize: none;
  border: none;
  overflow: hidden;
  font-size: 2.8rem;
  text-align: center;
}
textarea:focus-visible {
  border: none;
  outline: none;
}
</style>
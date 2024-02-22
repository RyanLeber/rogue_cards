<template>
  <div class="flex flex-col items-center">
    <AmberButton @click="toggleDrop" class="w-48">
      Class Info
    </AmberButton>
    <Transition name="extend">

      <div v-if="isDrop" class="drop my-4 w-11/12 h-fit bg-slate-500 p-4 rounded-lg
        text-slate-700 "
      >
        <div class="font-bold text-2xl"><H1>Class: {{ heroClass.name }}</H1></div>
        <div class="text-xl font font-medium"><span>Energy: {{ heroClass.energy }}</span></div>
        <div class="text-xl font font-medium"><span>Base Health: {{ heroClass.health }}</span></div>
        <div class="text-xl font font-medium"><span>Starting Draw: {{ heroClass.draw }}</span></div>
        <div class="text-xl font font-medium"><span>Starting Cards: <br> {{ heroClass.cards }}</span></div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Relic:</h2>
          <!-- <h3>{{ heroClass.relic.name }}:</h3> -->
          <P>
            {{ heroClass.relic.name }}:
            {{ heroClass.relic.desc }}
          </P>
        </div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Trump:</h2>
          <h3>{{ heroClass.trump.name }} - Energy: {{ heroClass.trump.energy }}</h3>
          <P>
            {{ heroClass.trump.desc }}
          </P>
        </div>
      </div>

    </Transition>
  </div>
</template>

<script setup>
import DefaultButton from './DefaultButton.vue';
import { ref, reactive } from 'vue'

const isDrop = ref(false)
const heroClass = reactive({
  name: 'none', // You can initialize with empty values or a basic structure
  energy: 0,
  health: 0,
  draw: 0,
  cards: '',
  relic: { name: '', desc: '' },
  trump: { name: '', energy: 0, desc: '' }
})

function toggleDrop() {
  if (heroClass.name === 'none') getClass()
  isDrop.value = !isDrop.value
}


async function getClass () {
  const { data, error } = await useFetch('/api/current-game/get-class', {
    method: 'POST',
    body: {
      classId : 17
    }
  })
  if (error.value) {
    console.log(error.value)
  } else {
    console.log(data.value.class)
    Object.assign(heroClass, data.value.class)
  }
  console.log(relics)
}
</script>

<style>
.drop {
  transform-origin: top;
  transition: transform .4s ease-in-out;
}
.extend-enter-from, .extend-leave-to{
  transform: scaleY(0);
}
</style>
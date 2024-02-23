<template>
  <div class="flex flex-col items-center">
    <AmberButton v-if="selection.classSelected" @click="toggleDrop" class="w-48">
      Class Info
    </AmberButton>
    <AmberButton v-else @click="selectClass">
      Select Class
    </AmberButton>

    <ClassSelection :isActive="selection.isActive" :classes="selection.classes" @class-selected="setClass"/>

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
import { ref, reactive } from 'vue'

const isDrop = ref(false)
const selection = reactive({
  classes: [],
  classSelected: false,
  isActive: false
})

const heroClass = reactive({
  name: 'none',
  energy: 0,
  health: 0,
  draw: 0,
  cards: '',
  relic: { name: '', desc: '' },
  trump: { name: '', energy: 0, desc: '' }
})

const classState = useState('class')

function toggleDrop() {
  if (heroClass.name === 'none') getClass()
  isDrop.value = !isDrop.value
}

async function getClass (id) {
  if (heroClass.name === 'none') {
    const { data, error } = await useFetch('/api/current-game/get-class', {
      method: 'POST',
      body: {
        gameToken: localStorage.getItem('gametoken')
      }
    })
    if (error.value) {
      console.log(error.value)
      selection.classSelected = false
    } else {
      console.log(data.value)
      Object.assign(heroClass, data.value)
      selection.classSelected = true
    }
  }
}

async function selectClass () {
  let classes = []
  const { data, error } = await useFetch('/api/current-game/select-class', {
  })
  if (error.value) {
    console.log(error.value)
  } else {
    data.value.forEach((hero) => {
      classes.push(hero)
    });
    setSelectionData(classes)
  }
}

const setSelectionData = (arr) => {
  selection.classSelected = true;
  selection.isActive = true;
  selection.classes = arr
}

async function setClass(classId) {
  const { error } = await useFetch('/api/current-game/set-class', {
    method: 'POST',
    body: {
      classId : classId,
      gameToken: localStorage.getItem('gametoken')
    }
  })
  if (error.value) {
    console.log(error.value)
  } else {
    selection.classSelected = true;
    selection.isActive = false;
  }
}
onBeforeMount(() => {
  getClass()
})

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
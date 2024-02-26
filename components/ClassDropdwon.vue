<template>
  <div class="flex flex-col items-center">
    <AmberButton v-if="classSelected" @click="toggleDrop" class="w-48">
      Class Info
    </AmberButton>
    <AmberButton v-else @click="isSelectionActive = true">
      Select Class
    </AmberButton>

    <ClassSelection v-if="isSelectionActive" @class-selected="classSet"/>

    <Transition name="extend">

      <div v-if="isDrop" class="drop my-4 w-11/12 h-fit bg-slate-500 p-4 rounded-lg
        text-slate-700 "
      >
        <div class="font-bold text-2xl"><h1>Class: {{ heroClass.name }}</h1></div>
        <div class="text-xl font font-medium"><span>Energy: {{ heroClass.energy }}</span></div>
        <div class="text-xl font font-medium"><span>Base Health: {{ heroClass.health }}</span></div>
        <div class="text-xl font font-medium"><span>Starting Draw: {{ heroClass.draw }}</span></div>
        <div class="text-xl font font-medium"><span>Starting Cards: <br> {{ heroClass.cards }}</span></div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Relic:</h2>
          <p>
            {{ heroClass.relic.name }}:
            {{ heroClass.relic.desc }}
          </p>
        </div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Trump:</h2>
          <h3>{{ heroClass.trump.name }} - Energy: {{ heroClass.trump.energy }}</h3>
          <p>
            {{ heroClass.trump.desc }}
          </p>
        </div>
      </div>

    </Transition>
  </div>
</template>

<script setup>
const gameStore = useGameStore()
const { gameToken } = storeToRefs(gameStore)

const isDrop = ref(false)
const classSelected = ref(false)
const isSelectionActive = ref(false)

const { data: heroClass, error: classError, refresh: classRefresh } = await useFetch('/api/current-game/get-class', {
  method: 'POST',
  body: {
    gameToken: gameToken.value
  }
})
if (classError.value) {
  console.log(classError.value)
  classSelected.value = false
} else if (heroClass.value) {
  classSelected.value = true
}

const classSet = () => {
  isSelectionActive.value = false
  classSelected.value = true
  classRefresh()
}

function toggleDrop() {
  if (!heroClass.name) classRefresh()
  isDrop.value = !isDrop.value
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
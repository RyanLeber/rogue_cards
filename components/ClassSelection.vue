<template>
  <div class="
      flex items-center justify-center
      absolute z-40 left-0 top-14
      h-max w-full 
       bg-black/40
      "
      >
    <div @click.stop class="
      relative
      
      flex flex-col 
      items-center
      lg:w-1/2 w-11/12 h-fit
      bg-slate-300
      rounded-xl
      p-2 mt-8 mb-16
      text-slate-700
      
      "
      >
      <div v-for="heroClass of classes"
        class="
          my-4 w-11/12 h-fit 
          bg-slate-400 p-4 rounded-lg
          text-slate-700
        "
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
        <AmberButton @click="setClass(heroClass.class_id)"
          class="relative left-1/3 my-2"
        >Select This Class</AmberButton>
      </div>
    </div>

  </div>
</template>

<script setup>
const gameStore = useGameStore()
const { gameToken } = storeToRefs(gameStore)
const emits = defineEmits(['classSelected'])

const { data: classes, error: classesError } = await useFetch('/api/current-game/select-class')
if ( classesError.value ) console.log(classesError.value)

const setClass = async (classId) => {
  try {
    const response = await $fetch('/api/current-game/set-class', {
      method: 'POST',
      body: {
      classId : classId,
      gameToken: gameToken.value
      }
    });
    if (!response) {
      throw new Error('Failed to set class.');
    }

    emits('classSelected')

  } catch (error) {
    console.error(error);
  }
}

</script>
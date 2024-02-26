<template>
    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">

      <form class="space-y-6" @submit.prevent="createGame">

        <div>
          <label for="gameName" class="block text-sm font-medium leading-6 text-gray-900">Game Name</label>
          <div class="mt-2">
            <input v-model="gameName" type="text" required 
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
            />
          </div>
        </div>

        <div>
          <AmberButton :type="'submit'" class="w-full" >Create New Game</AmberButton>
        </div>

      </form>

      <div v-if="createdOutput.outputActive" class="my-8 w-full h-20 flex items-center justify-center bg-slate-200 text-slate-800 rounded-md">
        <span class="text-3xl font-bold"> {{ createdOutput.tokenOutput }} </span>
      </div>
      
    </div>
</template>

<script lang="ts" setup>

interface Output {
  outputActive: boolean,
  tokenOutput: number | null
}

const gameName = ref('')
const createdOutput: Output = reactive({
  outputActive: false,
  tokenOutput: null
})

const emits = defineEmits(['refreshTable'])

const createGame = async () => {
  try {
    const response: number = await $fetch('/api/games/create-game', {
      method: 'POST',
      body: {
        gameName: gameName.value,
      },
    });

    if (!response) {
      throw new Error('Failed to join the game.');
    }
    createdOutput.outputActive = true;
    createdOutput.tokenOutput = response;
    gameName.value = ''
    emits('refreshTable')

  } catch (error) {
    console.error(error);
  }
}
</script>

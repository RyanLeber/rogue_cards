<template>
  <div class="p-8 flex flex-col items-center">
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

      <div v-if="gameToken.show" class="my-8 w-full h-20 flex items-center justify-center bg-slate-100 text-black">
        <span class="text-3xl font-bold"> {{ gameToken.token }} </span>
      </div>
    </div>

    <GamesTable :games="gamesArray" />

    <AmberButton @click="refresh()">Get Games</AmberButton>
  </div>
</template>

<script setup>
import AmberButton from '~/components/AmberButton.vue';
import { reactive } from 'vue'
import GamesTable from '~/components/GamesTable.vue'
definePageMeta({ layout: 'user' })

const gameName = ref('')
const gamesArray = ref([])
const gameToken = reactive({
  show: false,
  token: 0
})

const { pending: gamesPending, data: gamesData, error: gameError, refresh } = await useFetch('/api/games/get-games')
if (!gamesPending.value) {
  gamesArray.value = gamesData.value.games
}

async function createGame() {
  const name = gameName.value
  if (gameName.value.length > 0) {
    const { data: createdData, error: createdError } = await useFetch('/api/games/create-game', {
      method: 'post',
      body: {
        gameName: name
      }
    });
    if ( createdError.value ) {
      console.log(createdError.value);
    }
    else if ( createdData.value ) {
      gameToken.show = true;
      gameToken.token = createdData.value.gameToken;
      gameName.value = ''
      refresh()
    }
  }
}
</script>

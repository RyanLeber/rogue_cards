<template>
  <div class="p-8 flex flex-col items-center">
    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="createGame">

        <div>
          <label for="gameName" class="block text-sm font-medium leading-6 text-gray-900">Game Name</label>
          <div class="mt-2">
            <input :value="gameName" type="text" required 
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <input type="submit" value="Submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          <!-- <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create New Game</button> -->
        </div>

      </form>
      <div v-if="gameToken.show" class="my-8 w-full h-20 flex items-center justify-center bg-slate-100 text-black">
        <span class="text-3xl font-bold"> {{ gameToken.token }} </span>
      </div>
    </div>

    <div class="my-8">
      <GameList :games="gamesArray.games" />
    </div>
    <button @click="getGames" class="button">Get Games</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import GameList from '~/components/GameList.vue'
definePageMeta({ layout: 'user' })

const gameName = ref()
const gameToken = reactive({
  show: false,
  token: 0
})

const gamesArray = reactive({
  games: Array
})

async function createGame() {
  if (gameName.value) {
    const { data, error } = await useFetch('/api/games/create-game', {
      method: 'post',
      body: {
        gameName: gameName,
      }
    });
    if ( error.value ) {
      console.log(error);
    }
    else if ( data ) {
      console.log(data.value)
      gameToken.show = true;
      gameToken.token = data.value.gameToken;
      console.log(gameToken);
      // gameName.value = null
      getGames()
    }
  }
}

async function getGames() {
  const { data, error } = await useFetch('/api/games/get-games')
  if (error.value) {
    console.log(error.value)
  } else if (data.value) {
    gamesArray.games = data.value.games
    console.log("data:", data.value.games)
  }
}

onNuxtReady(() => {
  getGames()
})
</script>

<style>

</style>
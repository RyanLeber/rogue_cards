 
<template>
  <div
    class="
      flex items-center justify-center
      fixed z-40 left-0 top-14
      h-full w-full 
      overflow-auto bg-black/40
      "
      >
    <div @click.stop class="
      flex flex-col 
      items-center
      lg:w-1/2 w-11/12 h-fit
      bg-slate-200
      rounded-xl
      p-8
      text-slate-700
      "
      >
      <AmberButton @click="$emit('closeModal')" class="self-end"><i class="bi bi-x-lg text-2xl"></i></AmberButton>
      <h1 class="font-bold text-4xl"> Join Game </h1>
      <h2 class="text-3xl bg-slate-300 border-slate-600 rounded-lg px-4 py-2 my-2">{{ props.name }}</h2>
      <h2 class="text-xl text-center my-2">Would you like to join this game?</h2>
      <AmberButton @click="joinGame">Join</AmberButton>
    </div>

  </div>
</template>

<script setup>
import { useGameStore } from '~/stores/game'

const router = useRouter()
const route = useRoute()

const gameStore = useGameStore()
const { storeName, storeToken } = gameStore
const { gameName } = storeToRefs(gameStore)

const props = defineProps({
  name: String,
  token: Number,
});

// Join game method
const joinGame = async () => {
  try {
    const response = await $fetch('/api/current-game/join-game', {
      method: 'POST',
      body: {
        gameToken: props.token,
      },
    });

    if (!response) {
      throw new Error('Failed to join the game.');
    }
    storeName(response);
    storeToken(props.token);

    // Redirect to the game's interface page
    router.push(`/user-${route.params.username}/${gameName.value}`);
  } catch (error) {
    console.error(error);
  }
}
</script>

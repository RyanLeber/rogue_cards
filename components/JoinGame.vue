<template>
    <div 
      class="
        flex items-center justify-center
        absolute z-40 left-0 top-14
        h-full w-full 
        overflow-auto bg-black/40
        "
        >
      <div class="
        flex flex-col 
        items-center
        lg:w-1/2 w-11/12 h-64
        bg-slate-200
        rounded-xl
        p-8
        text-slate-700
        "
        >
        <h1 class="font-bold text-4xl"> Join Game </h1>
        <h2 class="text-xl text-center">Enter a game code to join a game or create a game from the games page.</h2>
        <form @submit.prevent="joinGame" class="flex py-4">
          <input v-model="form.token" type="text" required class="rounded-l-md pl-1" placeholder="Game Code">
          <AmberButton class="rounded-l-none">Join</AmberButton>
        </form>

      </div>

    </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

const form = reactive({
  token: ""
});

const gameStore = useGameStore()
const { storeName, storeToken } = gameStore
const { gameName } = storeToRefs(gameStore)

const joinGame = async () => {
  try {
    const response = await $fetch('/api/current-game/join-game', {
      method: 'POST',
      body: {
        gameToken: Number(form.token),
      },
    });

    if (!response) {
      throw new Error('Failed to join the game.');
    }
    storeName(response);
    storeToken(Number(form.token));

    // Redirect to the game's interface page
    router.push(`/user-${route.params.username}/${gameName.value}`);
  } catch (error) {
    console.error(error);
  }
}
</script>

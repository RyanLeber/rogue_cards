<template>
    <div v-if="modalActive"
      
      class="
        flex items-center justify-center
        fixed z-40 left-0 top-14
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
          <input v-model="form.gameCode" type="text" required class="rounded-l-md pl-1" placeholder="Game Code">
          <AmberButton class="rounded-l-none">Join</AmberButton>
        </form>

      </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const router = useRouter()
const route = useRoute()


// 83517631

const routeState = useState("gamename")


const modalActive = ref(false);
const form = reactive({
  gameCode: ""
});

async function joinGame() {
  const gameCode = form.gameCode
  const { data, error } = await useFetch('/api/current-game/join-game', {
    method: 'POST',
    body: {
      gameToken: gameCode
    }
  });
  if ( error.value ){
    console.log("Error: ", error.value);
  } else if ( data.value ) {
    console.log(data.value)
    routeState.value = data.value
    router.push(`/user-${route.params.username}/current-game-${routeState.value}`)
    closeModal()
  }
}

const openModal = () => {
  modalActive.value = true;
};

const closeModal = () => {
  modalActive.value = false;
};
onBeforeMount(() => {
  if (route.params.gamename === 'no-game-session') {
    modalActive.value = true
  } else {
    routeState.value = route.params.gamename
  }
})

</script>

<style>

</style>
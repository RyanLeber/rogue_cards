<template>
  <div v-if="modalActive"
    
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
      lg:w-1/2 w-11/12 h-64
      bg-slate-200
      rounded-xl
      p-8
      text-slate-700
      "
      >
      <h1 class="font-bold text-4xl"> Join Game </h1>
      <h2 class="text-3xl bg-slate-300 border-slate-600 rounded-lg px-4 py-2 my-2">{{ props.name }}</h2>
      <h2 class="text-xl text-center my-2">Would you like to join this game?</h2>
      <AmberButton @click="joinGame" class="">Join</AmberButton>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
const router = useRouter()
const route = useRoute()
const modalActive = ref(false);

const props = defineProps({
  name: String,
  token: Number,
  isActive: Boolean,
});

async function joinGame() {
  const gameCode = props.token
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
    router.push(`/user-${route.params.username}/current-game-${data.value}`)
    closeModal()
  }
}

watch(() => props.isActive, () => {
  console.log('watcher')
  if ( props.isActive ) openModal();
});

const openModal = () => {
  modalActive.value = true;
  window.addEventListener('keydown', onKeydown);
};

const closeModal = () => {
  modalActive.value = false;
  window.removeEventListener('keydown', onKeydown);
};

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};
</script>

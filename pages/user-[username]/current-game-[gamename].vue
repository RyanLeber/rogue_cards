<template>
  <div>

    <JoinGame />
    
    <div class="flex flex-col justify-center items-center py-20">

      <div class="flex flex-col lg:self-start mt-4 mx-4 mb-4 z-20 absolute top-16">

        <AmberButton @click="toggleSettings"
          :class="{'drop-button-active': dropDownActive}"
        >
          <i class="bi bi-sliders lg:text-3xl text-xl"></i>
        </AmberButton>

        <div v-if="dropDownActive"
          class="dropdown rounded-b-md p-4 z-20 relative"

        >
        <ul>
          <li class="my-2"><button @click="leaveGame" class="text-gray-200 hover:text-slate-600">Leave Game</button></li>
          <li class="my-2"><button class="text-gray-200 hover:text-slate-600">Do a Thing</button></li>
          <li class="my-2"><button class="text-gray-200 hover:text-slate-600">Do a Thing</button></li>
          <li class="my-2"><button class="text-gray-200 hover:text-slate-600">Do a Thing</button></li>
        </ul>
  
        </div>

      </div>

      <StatBar />
      <ClassDropdwon />
      <Counters />
      <ItemTracker />

    </div>

  </div>
</template>

<script setup>
import ItemTracker from '~/components/ItemTracker.vue'
import Counters from '~/components/Counters.vue'
import ClassDropdwon from '~/components/ClassDropdwon.vue'
import JoinGame from '~/components/JoinGame.vue'
import StatBar from '~/components/StatBar.vue'
definePageMeta({ layout: 'user' })
const router = useRouter()
const route = useRoute()

const dropDownActive = ref(false)

const leaveGame = () => {
  localStorage.clear
  router.push(`/user-${route.params.username}/current-game-${'no-game-session'}`)
}


const toggleSettings = () => {
  dropDownActive.value = !dropDownActive.value
}
</script>

<style>

.dropdown {
  background: linear-gradient(rgba(217, 119, 6, .6),rgba(251, 191, 36, 0.3)); 
}

.drop-button-active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-width: 2px;
  border-color: var(--clr-amber-600);
  width: 22rem;

}

</style>
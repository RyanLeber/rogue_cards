 
<template>
  <div class="w-11/12 flex flex-col items-center">

    <AmberButton @click="relicsDrop = !relicsDrop"
      class="lg:w-1/2 w-full my-1">
      Relics
    </AmberButton>
    <transition name="extend">
      <div v-show="relicsDrop" 
        class=" drop
        flex justify-center
        lg:w-1/2 w-full h-fit 
        bg-slate-300 text-slate-800 p-4 rounded-2xl"
      >
        <div class="w-fit overflow-x-scroll">
          <table class="table-fixed w-max">
            <thead>
              <tr class="text-left border-b-2 border-slate-500">
                <th class="w-36 ">Relic Name</th>
                <th class="">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(relic, index) in relics" :key="index" @click="test">
                <td class="pl-2 ">{{ relic.relic_name }}</td>
                <td class="pr-2">{{ relic.relic_description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </transition>


    <AmberButton @click="trumpsDrop = !trumpsDrop"
      class=" lg:w-1/2 w-full my-1">Trump Cards</AmberButton>
    <transition name="extend">
      <div v-show="trumpsDrop" 
        class="drop
        flex justify-center
        lg:w-1/2 w-full h-fit 
        bg-slate-300 text-slate-800 p-4 rounded-2xl"
      >

      <div class="w-fit overflow-x-scroll">
        <table class="table-fixed w-max">
          <thead>
            <tr class="text-left border-b-2 border-slate-500">
              <th class="w-6 pl-0 pr-4">Energy</th>
              <th class="w-32 ">Trump Name</th>
              <th class="">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trump, index) in trumps" :key="index" @click="test">
              <td class="pl-2">{{ trump.energy }}</td>
              <td class="">{{ trump.trump_name }}</td>
              <td class="pr-2">{{ trump.trump_description }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      </div>
    </transition>


    <AmberButton @click="potionsDrop = !potionsDrop"
      class="lg:w-1/2 w-full my-1"
    >
      Potions
    </AmberButton>
    <transition name="extend">
      <div v-show="potionsDrop" 
        class="drop
        flex justify-center
        lg:w-1/2 w-full h-fit 
        bg-slate-300 text-slate-800 p-4 rounded-2xl"
      >

        <div class="w-fit overflow-x-scroll">
          <table class="table-fixed w-max">
            <thead>
              <tr class="text-left border-b-2 border-slate-500">
                <th class="w-32 ">Potion Name</th>
                <th class="">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(potion, index) in potions" :key="index" @click="test">
                <td class="pl-2">{{ potion.potion_name }}</td>
                <td class="pr-2">{{ potion.potion_description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { useItemsStore } from '~/stores/items'
const relicsDrop = ref(false)
const trumpsDrop = ref(false)
const potionsDrop = ref(false)

const itemsStore = useItemsStore();
const { fetchItems } = itemsStore
const { relics, trumps, potions } = storeToRefs(itemsStore)

onNuxtReady(() => {
  fetchItems()
});
</script>
 
<style scoped>

.drop {
  transform-origin: top;
  transition: transform .4s ease-in-out;
}
.extend-enter-from, .extend-leave-to{
  transform: scaleY(0);
}
</style>
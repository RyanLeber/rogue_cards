<template>
  <div class="w-11/12 flex flex-col items-center">

    <AmberButton @click="toggleDropDown('dropOne')"
      class="lg:w-1/2 w-full my-1">
      Relics
    </AmberButton>
    <transition name="extend">
      <div v-show="isActive.dropOne" 
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


    <AmberButton @click="toggleDropDown('dropTwo')"
      class=" lg:w-1/2 w-full my-1">Trump Cards</AmberButton>
    <transition name="extend">
      <div v-show="isActive.dropTwo" 
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


    <AmberButton @click="toggleDropDown('dropThree')"
      class="lg:w-1/2 w-full my-1"
    >
      Potions
    </AmberButton>
    <transition name="extend">
      <div v-show="isActive.dropThree" 
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

    <AmberButton class="my-2" @click="getRelics">Get Relics</AmberButton>
    <AmberButton class="my-2" @click="getTrumps">Get Trumps</AmberButton>
    <AmberButton class="my-2" @click="getPotions">Get Potions</AmberButton>

  </div>
</template>

<script setup>
import { reactive } from 'vue';

const isActive = reactive({
  dropOne: false,
  dropTwo: false,
  dropThree: false
});
function toggleDropDown(dropKey) {
  isActive[dropKey] = !isActive[dropKey]
}
const relics = reactive([])
const trumps = reactive([])
const potions = reactive([])

async function getRelics () {
  const { data, error } = await useFetch('/api/current-game/get-relics', {
    method: 'POST',
    body: {
      relicIds : [1,7,11,18]
    }
  })
  if (error.value) {
    console.log(error.value)
  } else {
    console.log(data.value.relics[0])
    data.value.relics.forEach(relic => {
        relics.push(relic);
    });
  }
  console.log(relics)
}
async function getTrumps () {
  const { data, error } = await useFetch('/api/current-game/get-trumps', {
    method: 'POST',
    body: {
      trumpIds : [1,7,11,17]
    }
  })
  if (error.value) {
    console.log(error.value)
  } else {
    console.log(data.value.trumps)
    data.value.trumps.forEach(trump => {
        trumps.push(trump);
    });
  }
  console.log(trumps)
}
async function getPotions () {
  const { data, error } = await useFetch('/api/current-game/get-potions', {
    method: 'POST',
    body: {
      potionIds : [1,3]
    }
  })
  if (error.value) {
    console.log(error.value)
  } else {
    console.log(data.value.potions)
    data.value.potions.forEach(potion => {
        potions.push(potion);
    });
  }
  console.log(potions)
}

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
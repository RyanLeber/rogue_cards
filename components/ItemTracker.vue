<template>
  <div class="w-11/12">

    <DefaultButton @click="toggleDropDown('dropOne')"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
      class=" w-full my-1"
    >
      Relics
    </DefaultButton>
    <transition name="extend">
      <div class="drop-down-content " v-show="isActive.dropOne">
        <div class="w-fit h-fit bg-slate-300 text-slate-800 p-8 rounded-2xl">
          <div class="max-w-full overflow-x-auto">
            <table class="table-fixed w-full">
              <thead>
                <tr class="text-left border-b-2 border-slate-500">
                  <th class="w-6 ">#</th>
                  <th class="w-14 ">Relic Name</th>
                  <th class="w-96 ">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(relic, index) in relics" :key="index" @click="test">
                  <td >{{ index + 1 }}</td>
                  <td >{{ relic.relic_name }}</td>
                  <td >{{ relic.relic_description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </transition>


    <DefaultButton @click="toggleDropDown('dropTwo')"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
      class=" w-full my-1"
    >
      Trump Cards
    </DefaultButton>
    <transition name="extend">
      <div class="drop-down-content " v-show="isActive.dropTwo">
        <div class="w-fit h-fit bg-slate-300 text-slate-800 p-8 rounded-2xl">
          <div class="max-w-full overflow-x-auto">
            <table class="table-fixed w-full">
              <thead>
                <tr class="text-left border-b-2 border-slate-500">
                  <th class="w-6 ">#</th>
                  <th class="w-6 ">Energy</th>
                  <th class="w-14 ">Trump Name</th>
                  <th class="w-96 ">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trump, index) in trumps" :key="index" @click="test">
                  <td >{{ index + 1 }}</td>
                  <td >{{ trump.energy }}</td>
                  <td >{{ trump.trump_name }}</td>
                  <td >{{ trump.trump_description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </transition>

    <DefaultButton @click="toggleDropDown('dropThree')"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
      class=" w-full my-1"
    >
      Potions
    </DefaultButton>
    <transition name="extend">
      <div class="drop-down-content " v-show="isActive.dropThree">

      </div>
    </transition>
    <DefaultButton @click="getRelics"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
    >
      Get Relics
    </DefaultButton>
    <DefaultButton @click="getTrumps"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
    >
      Get Trumps
    </DefaultButton>

  </div>
</template>

<script setup>
import { reactive } from 'vue';

const isActive = reactive({
  dropOne: true,
  dropTwo: false,
  dropThree: false
});
function toggleDropDown(dropKey) {
  isActive[dropKey] = !isActive[dropKey]
}
const relics = reactive([])
const trumps = reactive([])
const heroClass = reactive()

async function getRelics () {
  const { data, error } = await useFetch('/api/current-game/get-relics', {
    method: 'POST',
    body: {
      relicIds : [1,7,11]
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
      trumpIds : [1,7,11]
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

</script>

<style scoped>

.bi {
  position: absolute;
  left: 0;
  margin-left: 1em;
}
.drop-down-content {
  max-height: fit-content;
  overflow: hidden;
}
.extend-enter-active {
  animation: extend .7s ease-out;
}
.extend-leave-active {
  animation: extend .4s reverse;
}
@keyframes extend {
  0% { max-height: 0 }
  100% { max-height: 750px }
}
</style>
<template>
  <div class="flex flex-col justify-center items-center py-16">
    <!-- <Modal :button-text="'Hello'" :padding="'pt-16'" >
      <div class="w-11/12 h-1/4 bg-gray-300 rounded-2xl">
      </div>
    </Modal> -->
    <ClassDropdwon />
    <Counters />
    <ItemTracker />
    <!-- <DefaultButton @click="seedTables"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
    >
      Seed Tables
    </DefaultButton> -->
  </div>
</template>

<script setup>
import ItemTracker from '~/components/ItemTracker.vue'
import Modal from '~/components/Modal.vue'
import Counters from '~/components/Counters.vue'
import ClassDropdwon from '~/components/ClassDropdwon.vue'
definePageMeta({ layout: 'user' })

// async function seedTables() {
//   const { data, error } = await useFetch('/api/games/insert-game-data')
//   if (error.value) {
//     console.log(error.value)
//   } else {
//     console.log(data.value)
//   }
// }



</script>

<style>

</style>
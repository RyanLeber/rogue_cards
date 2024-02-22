<template>
  <div>

    <JoinGame />
    
    <div class="flex flex-col justify-center items-center py-8">
  
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

</script>

<style>

</style>
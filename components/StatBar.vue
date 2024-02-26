<template>
  <div class="lg:w-1/2 w-11/12 h-fit flex flex-col items-center text-slate-700">
    <div class="flex font-bold text-2xl flex-wrap justify-center bg-slate-300 p-2 rounded-lg border-2 border-slate-500">
      <h1 class=" text-nowrap">Current Player:&nbsp;</h1>
      <h1 class=" text-nowrap">MegaMind</h1>
    </div>
    
    <div class=" w-full h-16 
      mt-8 mb-4 py-2
      border-b-2 border-slate-600
      flex justify-evenly
      font-bold
      lg:text-5xl text-2xl
      "
    >

      <div class="inline-flex items-center">
        <img class="lg:w-16 w-8 lg:mb-2" src="~/assets/icon/game_assets/HeartFull.png" alt="Heart">
        <span >30</span>
      </div>
      <div class="inline-flex items-center">
        <img class="lg:w-16 w-8" src="~/assets/icon/game_assets/GemGreen.png" alt="Energy Gem">
        <span >12</span>
      </div>
      <div class="inline-flex items-center">
        <img class="lg:w-16 w-8 lg:mb-2" src="~/assets/icon/game_assets/Coin.png" alt="Heart">
        <span >300</span>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
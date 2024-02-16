<template>
  <div>
    <MainHeader />
    <div class="flex justify-center">
      <NuxtLink to="/"> 
        <h1 class="text-5xl font-bold">Rogue Cards</h1>
      </NuxtLink>
    </div>
    <main class="relative flex flex-col items-center justify-center  pt-10 pb-10">
      <slot />
    </main>
  </div>
</template>

<script setup>
import MainHeader from '~/components/MainHeader.vue';

</script>

<style>

</style>
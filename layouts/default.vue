<template>
  <div>
    <MainHeader />
    <main class="relative flex flex-col items-center justify-center  pt-10 pb-10">
      <h1 class="text-5xl font-bold">Rogue Cards</h1>
      <slot />
    </main>
  </div>
</template>

<script setup>
import MainHeader from '~/components/MainHeader.vue';

</script>

<style>

</style>
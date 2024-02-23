<template>
  <div class="index h-screen">
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

<style scoped>
.index {
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(0,0,0)
    )
    rgb(0,0,0);
}

</style>
<template>
  <div>
    <Navigation />    
    <main class="mt-14 pb-10 bg-slate-400 h-screen">
      <slot />
    </main>
  </div>

</template>

<script setup>
import Navigation from '~/components/Navigation.vue';

</script>

<style>

</style>
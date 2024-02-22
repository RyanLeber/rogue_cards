<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user',
})
const gameRouteParam = useState("gameName", () => "no-game-session")	
</script>

<style>

</style>
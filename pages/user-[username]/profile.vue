<template>
  <div>
    Hello
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user',
})
const route = useRoute()
console.log(route.params.username)

</script>

<style>

</style>
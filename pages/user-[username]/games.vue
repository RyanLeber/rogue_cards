<template>
  <div class="p-8 flex flex-col items-center">

    <CreateGame @refresh-table="refreshTable"/>

    <GamesTable :games="gamesArray" />

  </div>
</template>

<script setup>
definePageMeta({ layout: 'user' })

const { data: gamesArray, error: gameError, refresh: refreshTable } = await useFetch('/api/games/get-games')
if ( gameError.value ) console.log(gameError.value);

</script>

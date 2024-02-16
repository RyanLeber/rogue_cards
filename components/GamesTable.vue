<template>
  <div class="w-fit h-fit bg-slate-300 text-slate-800 p-8 rounded-2xl">
    
    <table class="table-fixed">
      <thead>
        <tr class="text-left border-b-2 border-slate-500">
          <th class="w-6 ">#</th>
          <th class="w-96 ">Game Name</th>
          <th class="w-24 ">Game Code</th>
          <th class="w-32 ">Created On</th>
          <th class="w-32 ">Expires On</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in gamesArray.games" :key="index" @click="test">
          <td class="">{{ index + 1 }}</td>
          <td class="">{{ game.game_name }}</td>
          <td class="">{{ game.game_token }}</td>
          <td class="">{{ game.created_at.split('T')[0] }}</td>
          <td class="">{{ game.expires_at .split('T')[0]}}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script  setup>
const gamesArray = defineProps({
  games: Array
})

const router = useRouter()

const test = () => {
  console.log("token clicked")
  router.push('/currentgame')
}


</script>

<style>
tbody tr:nth-child(odd) {
  background-color: var(--clr-slate-100);
}
tbody tr:nth-child(even) {
  background-color: var(--clr-slate-200);
}
tbody tr:hover, 
tbody tr:focus {
  background-color: var(--clr-slate-400);
}
</style>
<template>
    <div
        class="
        flex justify-center
        lg:w-max w-full h-fit
        
        bg-slate-300 text-slate-800 
        p-4 my-16 rounded-2xl"
        
      >
        <JoinFromGames :name="joinData.name" :token="joinData.token" :isActive="joinData.isActive" />

        <div class="lg:w-full w-11/12 h-fit lg:overflow-auto overflow-x-scroll ">
          <table class="table-fixed lg:w-fit w-max" >
            <thead>
              <tr class="text-left border-b-2 border-slate-500">
                <th class="w-6 px-2">#</th>
                <th class="w-80 ">Game Name</th>
                <th class="w-24 ">Game Code</th>
                <th class="w-32 ">Created On</th>
                <th class="w-32 ">Expires On</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in gamesArray.games" :key="index" @click="join(game.game_name, game.game_token)">
                <td class="pl-2 pr-8">{{ index + 1 }}</td>
                <td class="pl-2">{{ game.game_name }}</td>
                <td class="pl-2">{{ game.game_token }}</td>
                <td class="pl-2">{{ game.created_at.split('T')[0] }}</td>
                <td class="pl-2">{{ game.expires_at .split('T')[0]}}</td>
              </tr>
            </tbody>
          </table>
        </div>

    </div>
</template>

<script setup>
import JoinFromGames from './JoinFromGames.vue'

const router = useRouter()

const gamesArray = defineProps({
  games: Array
})

const joinData = reactive({
  name: "",
  token: 0,
  isActive: false
});

const join = (name, token) => {
  console.log("token clicked")
  joinData.name = name;
  joinData.token = token;
  joinData.isActive = true;
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
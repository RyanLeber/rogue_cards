<template>
  <div class="flex flex-col items-center">
    <DefaultButton @click="isDrop = !isDrop"
      color="bg-amber-600" 
      hover-color="bg-amber-500"
      outline-color="outline-amber-500"
    >
      Stats
    </DefaultButton>
    <Transition name="extend">

      <div v-if="isDrop" class="drop my-4 w-11/12 h-fit bg-slate-500 p-4 rounded-lg
        text-slate-700 "
      >
        <div class="font-bold text-2xl"><H1>Class: Demon</H1></div>
        <div class="text-xl font font-medium"><span>Energy: 1</span></div>
        <div class="text-xl font font-medium"><span>Base Health: 30</span></div>
        <div class="text-xl font font-medium"><span>Starting Draw: 3</span></div>
        <div class="text-xl font font-medium"><span>Starting Cards: <br> all 3,6. 4 curses. 1 Ace</span></div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Relic:</h2>
          <P>
            Hellborn: Can play curses for 0 cost. 
            Upon playing a curse, gain 1 energy. 
            All healing is halved. (Boss) Remove healing reduction
          </P>
        </div>
        <br>
        <div class="text-xl font font-medium"> 
          <h2 class="font-bold">Starting Trump:</h2>
          <P>
            (0) Demon Might: +3 Strength
          </P>
        </div>
      </div>

    </Transition>
  </div>
</template>

<script setup>
import DefaultButton from './DefaultButton.vue';
import { ref } from 'vue'

const isDrop = ref(false)

</script>

<style>
  .drop {
    transform-origin: top;
    transition: transform .4s ease-in-out;
    /* transition: max-height 0.4s ease-in-out; */
  }
.extend-enter-from, .extend-leave-to{
  transform: scaleY(0);
  /* max-height: 0; */
}

.extend-enter-to {
  /* max-height: fit-content; */
}


</style>
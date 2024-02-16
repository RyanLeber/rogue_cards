 
<template>
  <button 
  :class="[color, 'hover:'+ hoverColor, 'focus-visible:' + outlineColor]"
  class="flex w-fit justify-center rounded-md
      px-3 py-1.5 text-sm font-semibold 
      leading-6 text-white shadow-sm 
      focus-visible:outline 
     "
  > 
    <slot /> 
  </button>
</template>

<script setup>

const colors = defineProps({
  color: String,
  hoverColor: String,
  outlineColor: String
})

console.log(colors)

</script>

<style>

</style>
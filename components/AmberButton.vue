 
<template>
  <button :type="type || 'button'"
    class="
      flex w-fit justify-center rounded-md
      px-3 py-1.5 text-sm font-semibold 
      leading-6 text-white shadow-sm 
      focus-visible:outline 
      bg-amber-600 
      outline-amber-500 
      hover:bg-amber-500
    "
  > 
    <slot /> 
  </button>
</template>

<script setup>
defineProps({
  type: String
})
</script>
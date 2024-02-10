<template>
  <NuxtLink :class="{ button: isButton, 'is-link': !isButton }" :to="address">
      <slot /> 
  </NuxtLink>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  islink: Boolean,
  isButton: Boolean,
  address: String
})
</script>

<style>
/* .is-link {
  color: var(--clr-blue-600);
  padding: 3px 10px;
  text-decoration: none;
}
.is-link:hover {
  color: white;
} */
</style>
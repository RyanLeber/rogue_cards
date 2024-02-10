<template>
  <LoginComp />
  <ButtonLink isButton address="/profile">Go to Profile</ButtonLink>
</template>

<script setup>
import LoginComp from '~/components/LoginComp.vue';
import ButtonLink from '~/components/ButtonLink.vue';
definePageMeta({
  layout: 'default'
})
</script>

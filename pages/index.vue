<template>
  <div>
    <!-- <LoginComp /> -->
    <NuxtPage />
    <!-- <ButtonLink isButton address="/profile">Go to Profile</ButtonLink> -->
  </div>
</template>

<script setup>
// import LoginComp from '~/components/LoginComp.vue';
import ButtonLink from '~/components/ButtonLink.vue';
// import { router } from 'vue'
definePageMeta({ layout: 'default' })
</script>

<template>
  <div class="nav-wrapper h-12 px-4 py-7 bg-slate-700 border-b-2 border-slate-800">

    <button ref="menuButton" class="hamburger" @click="toggleMenu">
      <img class="icon-hamburger" src="~/assets/icon/hamburger-menu-32x32.svg" alt="Menu Icon">
    </button>

    <nav ref="menu" class="primary-navigation" :class="{ 'is-active': menuActive }">

      <ul role="list" class="nav-list" @click="closeMenu" id="primary-navigation">
        <li class="nav-item"><ButtonLink address="/profile">Profile</ButtonLink></li>
        <li class="nav-item"><ButtonLink address="/currentgame">Current Game</ButtonLink></li>
        <li class="nav-item"><ButtonLink address="/games">Games</ButtonLink></li>
        <li class="nav-item"><ButtonLink address="#">Temp</ButtonLink></li>
      </ul>

    </nav>

  </div>
</template>

<script setup>
import ButtonLink from '~/components/ButtonLink.vue'
import { ref, onMounted, onUnmounted } from 'vue';

const menuActive = ref(false);
const menu = ref(null);
const menuButton = ref(null);

// Handle outside clicks
const handleClickOutside = (event) => {
  if (menuActive.value &&
      menu.value &&
      !menu.value.contains(event.target) &&
      !menuButton.value.contains(event.target)) {
    menuActive.value = false;
  }
};
const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};
const closeMenu = () => {
  if ( menuActive.value ) {
    menuActive.value = false;
  }
}
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});


</script>

<style scoped>
.nav-wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  color: var(--clr-text-100);
}
  .primary-navigation {
    display: none;
  }
  .primary-navigation.is-active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
    padding: 1em 0;
  }
  .nav-list {
  list-style: none;
  width: 100%;
}
  .nav-item {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    text-align: right;
  }
</style>
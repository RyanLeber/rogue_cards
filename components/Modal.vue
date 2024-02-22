<template>
  <div>
    <button @click="openModal"
            :class="[!customButton? defaultButtonStyle : '']">
      {{ buttonText }}
    </button>
    <div v-if="modalActive"
         @click.self="closeModal"
         class="fixed z-40 left-0 top-14 h-full w-full 
          overflow-auto bg-black/40 flex justify-center"
         :class="[padding]"
         role="dialog"
         aria-modal="true">
        <slot @click.stop />
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';

const props = defineProps({
  buttonText: String,
  customButton: Boolean,
  padding: String
});

const modalActive = ref(false);
const defaultButtonStyle = ref("flex w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600");

const openModal = () => {
  modalActive.value = true;
  window.addEventListener('keydown', onKeydown);
};

const closeModal = () => {
  modalActive.value = false;
  window.removeEventListener('keydown', onKeydown);
};

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};
</script>

<style>

</style>
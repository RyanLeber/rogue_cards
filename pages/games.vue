<template>
  <div class="p-8">

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <div>
          <label for="name-game" class="block text-sm font-medium leading-6 text-gray-900">Name Game</label>
          <div class="mt-2">
            <input id="name-game" name="name-game" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create New Game</button>
        </div>

      </form>
    </div>

    <div class="mt-8">
      <!-- <Table /> -->
    </div>

  </div>
</template>

<script lang="ts" setup>
import Table from '~/components/Table.vue';
definePageMeta({ layout: 'user' })

</script>

<style>

</style>
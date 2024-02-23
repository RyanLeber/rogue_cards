<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 my-10 lg:px-8 bg-gray-700 rounded-xl">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input v-model="form.userName" id="username" name="username" type="username" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-slate-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="form.password" id="password" name="password" type="password" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="confirm-password" class="block text-sm font-medium leading-6 text-slate-900">Re-Enter Password</label>
          </div>
          <div class="mt-2">
            <input v-model="form.repassword" id="confirm-password" name="confirm-password" type="password" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>


        <div>
          <AmberButton class="w-full font-semi-bold" type="submit">Sign Up</AmberButton>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-400">
        Already have an account?
        <ButtonLink class="font-semibold leading-6 text-amber-600 hover:text-amber-500" address="/">Sign In Here</ButtonLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonLink from '~/components/ButtonLink.vue';

const form = reactive({
  userName: '',
  password: '',
  repassword: '',
})

const router = useRouter();

async function handleSubmit() {
  if (form.password === form.repassword) {
    // const user = useCookie<{ id: number }>('user')
    const { data, error } = await useFetch('/api/users/add-user', {
      method: 'post',
      body: {
        username: form.userName,
        password: form.password
      }
    })
    if ( error.value ) {
      console.log(error)
    }
    else {
      console.log(data.value)
      router.push('/');
    }
  }
  else {
    console.log('passwords do not match')
  }
}

</script>

<style>

</style>
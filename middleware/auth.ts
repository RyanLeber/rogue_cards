
// async function isAuthenticated () {
//   console.log("isAuthenticated")
//   const { data, error } = await useFetch('/api/other/verify-cookie')
//   console.log("data:", data)
//   if ( error.value ) {
//     console.log(error)
//   }
//   else if (data.value){
//     console.log("cookie", data.value.cookie)
//     return data.value.verified
//   }
// }

export default defineNuxtRouteMiddleware((to, from) => {
  const token = document.cookie.split('; ')

  console.log("cookies", token)

//   const { $cookies } = useNuxtApp(); // Assuming you have a plugin or module that exposes cookie handling

//   const sessionToken = $cookies
//   console.log(sessionToken)

  
//   console.log("isAuth return:", isAuthenticated())

//   if (isAuthenticated() === false) {
//     console.log("not authenticated")
//     return navigateTo('/login')
//   }
})

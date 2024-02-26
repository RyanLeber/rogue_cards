import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', () => {
  const gameName = ref<string>('no-game-session')
  const gameToken = ref<number>(0)

  function storeToken(token: number) {
    gameToken.value = token
  }

  function storeName(name: string) {
    gameName.value = name
  }

  function isGameSet() {
    if ( gameName.value === 'no-game-session' && gameToken.value == 0 ) {
      return false
    } else { return true }
  }

  function isNameSet() {
    if (gameName.value === 'no-game-session') {
      return false
    } else { return true }
  }
  function $reset() {
    gameName.value = 'no-game-session'
    gameToken.value = 0
  }

  return { gameName, gameToken, storeName, storeToken, isGameSet, isNameSet, $reset }

},
{
  persist: true
  // persist: {
  //   storage: persistedState.sessionStorage,
  // }
});

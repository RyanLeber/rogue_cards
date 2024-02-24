import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', () => {
  const gameName = ref('no-game-session')
  const gameToken = ref(0)

  function setToken(token: number) {
    gameToken.value = token
  }

  function setName(name: string) {
    gameName.value = name
  }

  function clearGameStore() {
    gameName.value = 'no-game-session'
    gameToken.value = 0
  }
  function isNameSet() {
    if (gameName.value === 'no-game-session') {
      return false
    } else {return true}
  }

  return { gameName, gameToken, setName, setToken, clearGameStore, isNameSet }

},{ persist: true }) // ,{persist: {storage: sessionStorage}}

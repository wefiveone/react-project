import { localCache } from './cache'
import { USERNAME_KEY, PASSWORD_KEY } from '@/constants'

function rememberUserLoginInfo(username: string, password: string) {
  localCache.setItem(USERNAME_KEY, username)
  localCache.setItem(PASSWORD_KEY, password)
}

function getUsrLoginInfoFromStorage() {
  return {
    username: localCache.getItem(USERNAME_KEY),
    password: localCache.getItem(PASSWORD_KEY)
  }
}

function deleteUserLoginInfoFromStorage() {
  localCache.removeItem(USERNAME_KEY)
  localCache.removeItem(PASSWORD_KEY)
}

export { rememberUserLoginInfo, getUsrLoginInfoFromStorage, deleteUserLoginInfoFromStorage }
import { USER_TOKEN_KEY } from "../constants";
import { localCache } from "./cache";

export function setUserToken(token: string) {
  localCache.setItem(USER_TOKEN_KEY, token)
}

export function getUserToken() {
  return localCache.getItem(USER_TOKEN_KEY)
}

export function removeUserTokenFromStorage() {
  localCache.removeItem(USER_TOKEN_KEY)
}
import { USER_INFO_KEY} from "@/constants";
import { localCache } from "./cache";

function setUserInfo(value: any) {
  localCache.setItem(USER_INFO_KEY, value)
}

function getUserInfoFromStorage() {
  return localCache.getItem(USER_INFO_KEY)
}

function removeUserInfoFromStorage() {
  localCache.removeItem(USER_INFO_KEY)
}

export {
  setUserInfo,
  getUserInfoFromStorage,
  removeUserInfoFromStorage
}
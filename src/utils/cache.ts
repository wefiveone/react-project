enum cacheType {
  local,
  session
}

class MyCache {
  storage: Storage;
  constructor(type: cacheType) {
    this.storage = type === cacheType.local ? localStorage : sessionStorage;
  }
  setItem(key:string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(key)
  }
}

const localCache = new MyCache(cacheType.local)
const sessionCache = new MyCache(cacheType.session)

export { localCache, sessionCache }

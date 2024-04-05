import wyRequest from '..'
import { resDataType } from '../types'

// 获取用户信息
export function getUserInfo() {
  return wyRequest.get<resDataType>({ url: '/user/info' })
}

// 注册用户
export function registerUser(username: string, password: string, nickname?: string) {
  return wyRequest.post<resDataType>({
    url: '/user/register',
    data: { username, password, nickname: nickname || username }
  })
}

// 登录用户
export function loginUser(username: string, password: string) {
  return wyRequest.post<resDataType>({
    url: '/user/login',
    data: { username, password }
  })
}

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getUserToken } from '../../utils/user-token-cache'
class WYRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 响应拦截器, 统一处理响应数据
    this.instance.interceptors.response.use((res) => {
      const { code, data, message } = res.data
      if (code !== 0) {
        return Promise.reject(new Error(`error: ${message}`))
      }
      return data
    })
    // 请求拦截器, 添加token
    this.instance.interceptors.request.use((config) => {
      const token = getUserToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    })
  }

  request<T = any>(config: AxiosRequestConfig) {
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        resolve(res)
      })
    })
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ method: 'get', ...config })
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ method: 'post', ...config })
  }

  patch<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ method: 'patch', ...config })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ method: 'delete', ...config })
  }
}

export default WYRequest

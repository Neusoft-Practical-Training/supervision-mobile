import axios, { type AxiosResponse } from 'axios'
import { HTTP_HOST } from '@/common/constants'
import router from '@/router'

import { type Result } from './entities/result'
import { useUserStore } from "@/stores/modules/user";

const baseURL = HTTP_HOST
// const baseURL = 'http://127.0.0.1:8080'

const instance = axios.create({
  baseURL,
  timeout: 1145141919
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.set('Bearer', userStore.token)
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res: AxiosResponse<Result<any>>) => {
    // console.log(res)
    if (res.status === 200) {
      if (res.data.ok) {
        res.data = res.data.data
        return Promise.resolve(res)
      } else {
        // 如果需要登录，则跳转登录页面
        if (res.data.code == 2) {
          router.push('/login')
        }
        return Promise.reject(res.data)
      }
    }
    // fail
    return Promise.reject(res.data)
  },
  (err) => {
    // fail
    console.log(err)
  }
)

export default instance


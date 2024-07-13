import axios, { type AxiosResponse } from 'axios'
import { HTTP_HOST } from '@/common/constants'
import router from '@/router'

import { type Result } from './entities/result'
import { useUserStore } from "@/stores/modules/user";

import { type UserDTO } from './entities/user';
import type { Cities, Grids, Provinces } from "@/api/entities/region";
import type { AqiFeedback } from "@/api/entities/feedback";
import type { AqiAssignment } from "@/api/entities/assign";
import type { TaskFilterCriteria } from "@/views/TaskListView.vue";
import type { AqiStatistics } from "@/api/entities/confirm";
import type { ConfirmHistoryFilterCriteria } from "@/views/ConfirmHistoryView.vue";
import type { FeedbackHistoryFilterCriteria } from "@/views/FeedbackHistoryView.vue";

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
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res: AxiosResponse<Result<any>>) => {
    // console.log(res)
    if (res.status === 200) {
      switch (res.data.code) {
        case 0:
          res.data = res.data.data
          return Promise.resolve(res)
        case 2:
          // 如果需要登录，则跳转登录页面
          router.push('/login').then(() => {
            window.alert('用户未登录!')
          })
          return Promise.reject(res.data)
        default:
          return Promise.reject(res.data)
      }
    } else {
      // fail
      return Promise.reject(res.data)
    }
  },
  (err) => {
    // fail
    console.log(err)
  }
)

export default instance

export const login = async (data: { username: string; password: string }) =>
  (await instance.post<UserDTO>('/login', data)).data

export const register = async (data: { user: UserDTO; password: string }) =>
  (await instance.post<UserDTO>('/register', data)).data

export const updateUserInfo = async (data: { user: UserDTO; password: string }) =>
  (await instance.post<UserDTO>('/updateUserInfo', data)).data

export const getProvinces = async () =>
  (await instance.get<Provinces[]>('/getProvinces')).data

export const getCities = async () =>
  (await instance.get<Cities[]>('/getCities')).data

export const getGrids = async () =>
  (await instance.get<Grids[]>('/getGrids')).data

export const feedback = async (data: AqiFeedback) =>
  (await instance.post<AqiFeedback>('/feedback', data)).data

export const getTasks = async (data: {gm_id: number, taskFilterCriteria: TaskFilterCriteria}) =>
  (await instance.post<AqiAssignment[]>('/getTasks', data)).data

export const confirm = async (data: AqiStatistics) =>
  (await instance.post<AqiStatistics>('/confirm', data)).data

export const getTask = async (taskId: number) =>
  (await instance.get<AqiAssignment>(`/getTask/${ taskId }`)).data

export const getConfirmHistory = async (data: {gm_id: number, confirmHistoryFilterCriteria: ConfirmHistoryFilterCriteria}) =>
  (await instance.post<AqiAssignment[]>('/getConfirmHistory', data)).data

export const getFeedbackHistory = async (data: {supervisor_id: number, feedbackHistoryFilterCriteria: FeedbackHistoryFilterCriteria}) =>
  (await instance.post<AqiFeedback[]>('/getFeedbackHistory', data)).data

export const getConfirmDetail = async (confirmId: number) =>
  (await instance.get<AqiStatistics>(`/getConfirmDetail/${ confirmId }`)).data

export const getConfirmDetailId = async (assignId: number) =>
  (await instance.get<number>(`/getConfirmDetailId/${ assignId }`)).data
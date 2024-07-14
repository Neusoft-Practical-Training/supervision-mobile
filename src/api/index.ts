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
import { AqiFeedbackState, TaskCompletedState } from "@/common/enums";

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

/**
 * 登录校验，返回UserDTO
 */
export const login = async (data: { username: string; password: string }) =>
  (await instance.post<UserDTO>('/login', data)).data

/**
 * 注册，返回UserDTO，注意管理员不能注册
 */
export const register = async (data: { user: UserDTO; password: string }) =>
  (await instance.post<UserDTO>('/register', data)).data

/**
 * 更新用户信息，返回更新后UserDTO
 */
export const updateUserInfo = async (data: { user: UserDTO; password: string }) =>
  (await instance.post<UserDTO>('/updateUserInfo', data)).data

export const getProvinces = async () =>
  (await instance.get<Provinces[]>('/getProvinces')).data

export const getCities = async () =>
  (await instance.get<Cities[]>('/getCities')).data

export const getGrids = async () =>
  (await instance.get<Grids[]>('/getGrids')).data

/**
 * 监督员反馈，传入AqiFeedback，返回处理完之后的AqiFeedback
 */
export const feedback = async (data: AqiFeedback) =>
  (await instance.post<AqiFeedback>('/feedback', data)).data

/**
 * 以下所有task代指AqiAssignment，Confirm代指AqiStatistics
 * 根据网格员id，获取任务（即AqiAssignment，均为未完成任务），若taskFilterCriteria为空则返回所有任务
 * TaskFilterCriteria:
 *   taskType: TaskCompletedState, 任务完成情况，枚举值
 *   timeOrder: boolean, 是否按照时间排序
 *   distanceOrder: boolean, 是否按照距离排序，这个用相同的随机种子随机排就好
 *   keywords: string, 搜索关键字，看AqiAssignment中是否包含keywords
 */
export const getTasks = async (data: {gm_id: number, taskFilterCriteria: TaskFilterCriteria}) =>
  (await instance.post<AqiAssignment[]>('/getTasks', data)).data

/**
 * 网格员确认，传入AqiFeedback，返回处理完之后的AqiFeedback
 */
export const confirm = async (data: AqiStatistics) =>
  (await instance.post<AqiStatistics>('/confirm', data)).data

/**
 * 根据AqiAssignment的id返回AqiAssignment
 */
export const getTask = async (taskId: number) =>
  (await instance.get<AqiAssignment>(`/getTask/${ taskId }`)).data

/**
 * 根据网格员id，获取历史任务（即AqiAssignment，并且任务已完成，包括完成和跨域任务完成），若taskFilterCriteria为空则返回所有任务
 * ConfirmHistoryFilterCriteria:
 *   keywords: string,
 *   taskType: TaskCompletedState,
 *   startDate?: string, 时间区间开始
 *   endDate?: string, 时间区间结束
 */
export const getConfirmHistory = async (data: {gm_id: number, confirmHistoryFilterCriteria: ConfirmHistoryFilterCriteria}) =>
  (await instance.post<AqiAssignment[]>('/getConfirmHistory', data)).data

/**
 * 根据监督员id，获取历史反馈（AqiFeedback），若feedbackHistoryFilterCriteria为空则返回所有任务
 * FeedbackHistoryFilterCriteria:
 *   keywords: string,
 *   feedbackType: AqiFeedbackState,
 *   startDate?: string,
 *   endDate?: string,
 */
export const getFeedbackHistory = async (data: {supervisor_id: number, feedbackHistoryFilterCriteria: FeedbackHistoryFilterCriteria}) =>
  (await instance.post<AqiFeedback[]>('/getFeedbackHistory', data)).data

/**
 * 根据AqiStatistics的id返回AqiStatistics
 */
export const getConfirmDetail = async (confirmId: number) =>
  (await instance.get<AqiStatistics>(`/getConfirmDetail/${ confirmId }`)).data

/**
 * 根据AqiAssignment的id返回其对应的AqiStatistics的id
 */
export const getConfirmDetailId = async (assignId: number) =>
  (await instance.get<number>(`/getConfirmDetailId/${ assignId }`)).data
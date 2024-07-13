import { AqiFeedbackState, GridMemberState, TaskCompletedState } from "@/common/enums";

export type Tip = {
  text: string;
  color: string;
};

export const GmTips: Readonly<Record<GridMemberState, Tip>> = {
  [GridMemberState.Idle]: {
    text: '空闲',
    color: 'green',
  },
  [GridMemberState.Working]: {
    text: '工作中',
    color: 'blue',
  },
  [GridMemberState.TemporaryTransfer]: {
    text: '临时抽调',
    color: 'pink',
  },
  [GridMemberState.InVacation]: {
    text: '休假中',
    color: 'purple',
  },
  [GridMemberState.AwaitingReview]: {
    text: '待审核',
    color: 'gray',
  },
  [GridMemberState.Other]: {
    text: '其他',
    color: 'black',
  },
};

export const TaskTips: Readonly<Record<TaskCompletedState, Tip>> = {
  [TaskCompletedState.Uncompleted]: {
    text: '未完成',
    color: 'gray',
  },
  [TaskCompletedState.Completed]: {
    text: '已完成',
    color: 'green',
  },
  [TaskCompletedState.CrossDomainRequesting]: {
    text: '跨域请求中',
    color: 'blue',
  },
  [TaskCompletedState.CrossDomainRequestDenied]: {
    text: '跨域请求拒绝',
    color: 'pink',
  },
  [TaskCompletedState.CrossDomainRequestAccepted]: {
    text: '跨域已受理',
    color: 'purple',
  },
  [TaskCompletedState.CrossDomainRequestCompleted]: {
    text: '跨域任务完成',
    color: 'green',
  },
}

export const FeedbackTips: Readonly<Record<AqiFeedbackState, Tip>> = {
  [AqiFeedbackState.Unassigned]: {
    text: '未指派',
    color: 'gray',
  },
  [AqiFeedbackState.Assigned]: {
    text: '已指派',
    color: 'blue',
  },
  [AqiFeedbackState.Completed]: {
    text: '已完成',
    color: 'green',
  }
}
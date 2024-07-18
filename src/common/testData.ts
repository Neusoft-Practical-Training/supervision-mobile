import type { UserDTO } from "@/api/entities/user";
import { AqiFeedbackState, Gender, GridMemberState, Role, TaskCompletedState } from "@/common/enums";
import type { AqiAssignment } from "@/api/entities/assign";
import type { AqiStatistics } from "@/api/entities/confirm";
import type { AqiFeedback } from "@/api/entities/feedback";
import type { LeaveRequestDTO } from "@/api/entities/leaveRequest";

export const currentGridMember: UserDTO = {
  age: 24,
  avatar: undefined,
  city_id: "110100",
  grid_id: "110101",
  create_time: "2023-5-21",
  gender: Gender.Male,
  login_code: "13512341234",
  name: "王小明",
  permission: undefined,
  province_id: "110000",
  remarks: "法俄发噶为嘎我嘎尾法few啊",
  role: Role.GridMember,
  state: GridMemberState.Idle,
  status: true,
  task_num: 3,
  tel: "13512341234",
  update_time: "2023-5-20",
  user_id: 0,
  token: "fashfawfj2r23rfa"
};

export const currentSupervisor: UserDTO = {
  age: 52,
  avatar: undefined,
  create_time: "2024-6-20",
  gender: Gender.Male,
  login_code: "13512341234",
  name: "李小明",
  remarks: "法俄发噶为嘎我嘎尾法few啊",
  role: Role.Supervisor,
  status: true,
  tel: "13512341234",
  update_time: "2024-4-20",
  user_id: 10,
  token: "fahj34rr3fzfy23r"
};

export const feedbacks: AqiFeedback[] = [
  {
    af_id: 0,
    supervisor_id: 10,
    grid_id: "110101",
    address: "安定门东大街 28 号雍和大厦",
    pre_aqi_id: 0,
    explain: "啊就收到了；负我大额度",
    af_date: "2024-5-30",
    af_time: "12:00",
    state: AqiFeedbackState.Unassigned,
    aa_id: undefined,
    remarks: ""
  },
  {
    af_id: 1,
    supervisor_id: 10,
    grid_id: "110102",
    address: "西直门南大街 2 号成铭大厦",
    pre_aqi_id: 0,
    explain: "啊就收到了；负我大额度",
    af_date: "2024-4-23",
    af_time: "17:00",
    state: AqiFeedbackState.Assigned,
    aa_id: 0,
    remarks: ""
  },
  {
    af_id: 2,
    supervisor_id: 10,
    grid_id: "110105",
    address: "北辰东路 8 号北辰时代大厦",
    pre_aqi_id: 0,
    explain: "啊就收到了；负我大额度",
    af_date: "2024-6-7",
    af_time: "14:00",
    state: AqiFeedbackState.Completed,
    aa_id: 1,
    remarks: ""
  },
  {
    af_id: 3,
    supervisor_id: 10,
    grid_id: "110101",
    address: "东直门南大街 1 号来福士中心",
    pre_aqi_id: 1,
    explain: "啊就收到了；负我大额度",
    af_date: "2024-7-7",
    af_time: "14:00",
    state: AqiFeedbackState.Assigned,
    aa_id: 2,
    remarks: ""
  },
  {
    af_id: 4,
    supervisor_id: 10,
    grid_id: "110105",
    address: "东三环中路 39 号建外 SOHO",
    pre_aqi_id: 2,
    explain: "阿迪是否违反撒范德萨丰富",
    af_date: "2024-7-1",
    af_time: "14:00",
    state: AqiFeedbackState.Assigned,
    aa_id: 3,
    remarks: ""
  },
  {
    af_id: 5,
    supervisor_id: 10,
    grid_id: "110105",
    address: "望京街 9 号望京国际商业中心",
    pre_aqi_id: 2,
    explain: "法教大家发放",
    af_date: "2024-7-1",
    af_time: "14:00",
    state: AqiFeedbackState.Assigned,
    aa_id: 4,
    remarks: ""
  },
  {
    af_id: 6,
    supervisor_id: 10,
    grid_id: "110105",
    address: "光华路 9 号天阶大厦",
    pre_aqi_id: 0,
    explain: "法俄发动是非得失飞飞飞飞",
    af_date: "2024-7-2",
    af_time: "14:00",
    state: AqiFeedbackState.Completed,
    aa_id: 5,
    remarks: ""
  }
];

export const assignments: AqiAssignment[] = [
  {
    aa_id: 0,
    af_id: 1,
    as_id: undefined,
    admin_id: 100,
    supervisor_id: 11,
    gm_id: 0,
    grid_id: "110102",
    address: "西直门南大街 2 号成铭大厦",
    assign_date: "2024-6-7",
    assign_time: "13:00",
    cross_domain: false,
    completed: TaskCompletedState.Uncompleted,
    remarks: ""
  },
  {
    aa_id: 1,
    af_id: 2,
    as_id: 0,
    admin_id: 100,
    supervisor_id: 12,
    gm_id: 1,
    grid_id: "110105",
    address: "北辰东路 8 号北辰时代大厦",
    assign_date: "2024-6-7",
    assign_time: "13:00",
    cross_domain: false,
    completed: TaskCompletedState.Completed,
    remarks: ""
  },
  {
    aa_id: 2,
    af_id: 3,
    as_id: undefined,
    admin_id: 100,
    supervisor_id: 12,
    gm_id: undefined,
    grid_id: "110101",
    address: "东直门南大街 1 号来福士中心",
    assign_date: "2024-7-7",
    assign_time: "16:00",
    cross_domain: true,
    completed: TaskCompletedState.Uncompleted,
    remarks: ""
  },
  {
    aa_id: 3,
    af_id: 4,
    as_id: undefined,
    admin_id: 100,
    supervisor_id: 12,
    gm_id: undefined,
    grid_id: "110105",
    address: "东三环中路 39 号建外 SOHO",
    assign_date: "2024-6-14",
    assign_time: "14:00",
    cross_domain: true,
    completed: TaskCompletedState.Uncompleted,
    remarks: ""
  },
  {
    aa_id: 4,
    af_id: 5,
    as_id: undefined,
    admin_id: 100,
    supervisor_id: 12,
    gm_id: 1,
    grid_id: "110105",
    address: "望京街 9 号望京国际商业中心",
    assign_date: "2024-7-11",
    assign_time: "13:00",
    cross_domain: true,
    completed: TaskCompletedState.CrossDomainRequestAccepted,
    remarks: ""
  },
  {
    aa_id: 5,
    af_id: 6,
    as_id: 1,
    admin_id: 100,
    supervisor_id: 12,
    gm_id: 2,
    grid_id: "110105",
    address: "光华路 9 号天阶大厦",
    assign_date: "2024-7-11",
    assign_time: "13:00",
    cross_domain: true,
    completed: TaskCompletedState.CrossDomainRequestCompleted,
    remarks: ""
  }
];

export const confirms: AqiStatistics[] = [
  {
    aa_id: 1,
    address: "北辰东路 8 号北辰时代大厦",
    as_id: 0,
    co_level: 1,
    co_value: 10,
    confirm_aqi_id: 0,
    confirm_date: "2024-7-10",
    confirm_time: "16:00",
    gm_id: 0,
    grid_id: "110105",
    remarks: "似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。",
    so2_level: 2,
    so2_value: 50,
    spm_level: 1,
    spm_value: 30
  },
  {
    aa_id: 5,
    address: "光华路 9 号天阶大厦",
    as_id: 1,
    co_level: 2,
    co_value: 50,
    confirm_aqi_id: 2,
    confirm_date: "2024-7-10",
    confirm_time: "16:00",
    gm_id: 0,
    grid_id: "110105",
    remarks: "似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。",
    so2_level: 2,
    so2_value: 50,
    spm_level: 2,
    spm_value: 50
  }
];

export const leaveRequests: LeaveRequestDTO[] = [];
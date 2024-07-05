import type { UserDTO } from "@/api/entities/user";
import { Gender, GridMemberState, Role } from "@/common/enums";
import type { Aqi } from "@/api/entities/aqi";

export const user: UserDTO = new class implements UserDTO {
  [property: string]: any;

  age: number = 24;
  avatar: undefined;
  city_id: string = "110100";
  create_time: string = "2024-5-20";
  gender: Gender = Gender.Male;
  login_code: string = "13512341234";
  name: string = "王小明";
  permission: undefined;
  province_id: string = "110000";
  remarks: string = "";
  role: Role = Role.GridMember;
  state: GridMemberState = GridMemberState.Idle;
  status: boolean = true;
  task_num: number = 3;
  tel: string = "13512341234";
  token: string = "123";
  update_time: string = "2024-5-20";
  user_id: number = 0;
}

export const aqi: Aqi[] = [
  {
    aqi_explain: "优",
    aqi_id: 0,
    chinese_explain: "空气质量令人满意，基本无空气污染",
    co_max: 2,
    co_min: 0,
    color: "#00e400",
    health_impact: "空气质量令人满意，基本无空气污染",
    remarks: "各类人群可正常活动",
    so2_max: 50,
    so2_min: 0,
    spm_max: 50,
    spm_min: 0,
    suggestions: "各类人群可正常活动"
  },
  {
    aqi_explain: "良",
    aqi_id: 1,
    chinese_explain: "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响",
    co_max: 4,
    co_min: 2,
    color: "#ffff00",
    health_impact: "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响",
    remarks: "极少数异常敏感人群应减少户外活动",
    so2_max: 150,
    so2_min: 50,
    spm_max: 100,
    spm_min: 50,
    suggestions: "极少数异常敏感人群应减少户外活动"
  },
  {
    aqi_explain: "轻度污染",
    aqi_id: 2,
    chinese_explain: "易感人群症状有轻度加剧，健康人群出现刺激症状",
    co_max: 14,
    co_min: 4,
    color: "#ff7e00",
    health_impact: "易感人群症状有轻度加剧，健康人群出现刺激症状",
    remarks: "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼",
    so2_max: 500,
    so2_min: 150,
    spm_max: 150,
    spm_min: 100,
    suggestions: "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼"
  },
  {
    aqi_explain: "中度污染",
    aqi_id: 3,
    chinese_explain: "进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响",
    co_max: 24,
    co_min: 14,
    color: "#ff0000",
    health_impact: "进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响",
    remarks: "儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，健康人群适量减少户外运动",
    so2_max: 650,
    so2_min: 500,
    spm_max: 200,
    spm_min: 150,
    suggestions: "儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，健康人群适量减少户外运动"
  },
  {
    aqi_explain: "重度污染",
    aqi_id: 4,
    chinese_explain: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
    co_max: 36,
    co_min: 24,
    color: "#99004c",
    health_impact: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
    remarks: "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，避免体力消耗，健康人群减少户外运动",
    so2_max: 800,
    so2_min: 650,
    spm_max: 300,
    spm_min: 200,
    suggestions: "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，避免体力消耗，健康人群减少户外运动"
  },
  {
    aqi_explain: "严重污染",
    aqi_id: 5,
    chinese_explain: "健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病",
    co_max: 48,
    co_min: 36,
    color: "#7e0023",
    health_impact: "健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病",
    remarks: "儿童、老年人和病人应停留在室内，避免体力消耗，健康人群避免户外活动",
    so2_max: 1000,
    so2_min: 800,
    spm_max: 500,
    spm_min: 300,
    suggestions: "儿童、老年人和病人应停留在室内，避免体力消耗，健康人群避免户外活动"
  }
];

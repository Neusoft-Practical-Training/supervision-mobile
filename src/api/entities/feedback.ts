import { AqiFeedbackState } from "@/api/enums";

/**
 * feedbackDTO
 */
export interface FeedbackDTO {
  /**
   * 地址，反馈区域详细地址
   */
  address: string;
  /**
   * 反馈信息描述，反馈信息描述
   */
  explain?: string;
  /**
   * 网格ID，反馈区域ID
   */
  grid_id: string;
  /**
   * 预期AQI，预期AQI信息
   */
  pre_aqi_id: number;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 所属公众监督员ID，所属公众监督员ID
   */
  supervisor_id: number;
  [property: string]: any;
}

/**
 * aqi_feedback
 */
export interface AqiFeedback {
  /**
   * AQI任务指派表ID，AQI任务指派表ID
   */
  aa_id?: number;
  /**
   * 地址，反馈区域详细地址
   */
  address: string;
  /**
   * 反馈日期，反馈日期
   */
  af_date: string;
  /**
   * 空气质量反馈信息编号，空气质量反馈信息编号（自增）
   */
  af_id: number;
  /**
   * 反馈时间，反馈时间
   */
  af_time: string;
  /**
   * 反馈信息描述，反馈信息描述
   */
  explain?: string;
  /**
   * 网格ID，反馈区域ID
   */
  grid_id: string;
  /**
   * 预期AQI，预期AQI信息
   */
  pre_aqi_id: number;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 信息状态，信息状态（三种）
   */
  state: AqiFeedbackState;
  /**
   * 所属公众监督员ID，所属公众监督员ID
   */
  supervisor_id: number;
  [property: string]: any;
}
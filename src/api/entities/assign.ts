import { TaskCompletedState } from "@/common/enums";

/**
 * assignmentDTO
 */
export interface AssignmentDTO {
  /**
   * 详细地址，任务区域详细地址
   */
  address: string;
  /**
   * 管理员ID，指派任务管理员ID
   */
  admin_id: number;
  /**
   * 空气质量反馈信息编号，空气质量反馈信息编号（外键）
   */
  af_id: number;
  /**
   * 是否跨域，是否跨域（默认为0:未跨域）
   */
  cross_domain: boolean;
  /**
   * 网格员ID，指定网格员ID（如果跨域，则由对方区域管理员指定网格员）
   */
  gm_id?: number;
  /**
   * 网格ID，任务区域网格ID
   */
  grid_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 公众监督员ID，反馈信息公众监督员ID
   */
  supervisor_id: number;
  [property: string]: any;
}

/**
 * aqi_assignment
 */
export interface AqiAssignment {
  /**
   * 空气质量监测任务编号，空气质量监测任务编号（自增）
   */
  aa_id: number;
  /**
   * 详细地址，任务区域详细地址
   */
  address: string;
  /**
   * 管理员ID，指派任务管理员ID
   */
  admin_id: number;
  /**
   * 空气质量反馈信息编号，空气质量反馈信息编号（外键）
   */
  af_id: number;
  /**
   * 空气质量统计信息编号，空气质量统计信息编号（外键）
   */
  as_id?: number;
  /**
   * 指派日期，指派日期
   */
  assign_date?: string;
  /**
   * 指派时间，指派时间
   */
  assign_time?: string;
  /**
   * 完成状态，是否完成（默认为0：未完成，1：已完成，2：跨域请求中，3：跨域请求拒绝，4：跨域已受理，5：跨域任务完成）
   */
  completed: TaskCompletedState;
  /**
   * 是否跨域，是否跨域（默认为0:未跨域）
   */
  cross_domain: boolean;
  /**
   * 网格员ID，指定网格员ID（如果跨域，则由对方区域管理员指定网格员）
   */
  gm_id?: number;
  /**
   * 网格ID，任务区域网格ID
   */
  grid_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 公众监督员ID，反馈信息公众监督员ID
   */
  supervisor_id: number;
  [property: string]: any;
}

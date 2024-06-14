/**
 * confirmDTO
 */
export interface ConfirmDTO {
  /**
   * 任务指派信息编号，任务指派信息编号
   */
  aa_id: number;
  /**
   * 地址，反馈信息所在区域详细地址
   */
  address: string;
  /**
   * co级别，一氧化碳级别
   */
  co_level: number;
  /**
   * co浓度，一氧化碳浓度
   */
  co_value: number;
  /**
   * 确认空气质量ID，确认空气质量ID（外键）
   */
  confirm_aqi_id: number;
  /**
   * 网格员ID，网格员ID（外键）
   */
  gm_id: number;
  /**
   * 网格区域ID，网格区域ID（外键）
   */
  grid_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * so2级别，二氧化硫级别
   */
  so2_level: number;
  /**
   * so2浓度，二氧化硫浓度
   */
  so2_value: number;
  /**
   * spm级别，空气悬浮颗粒物级别
   */
  spm_level: number;
  /**
   * spm浓度，空气悬浮颗粒物浓度
   */
  spm_value: number;
  [property: string]: any;
}

/**
 * aqi_statistics
 */
export interface AqiStatistics {
  /**
   * 任务指派信息编号，任务指派信息编号
   */
  aa_id: number;
  /**
   * 地址，反馈信息所在区域详细地址
   */
  address: string;
  /**
   * 空气质量统计信息编号，空气质量统计信息编号（主键）
   */
  as_id: number;
  /**
   * co级别，一氧化碳级别
   */
  co_level: number;
  /**
   * co浓度，一氧化碳浓度
   */
  co_value: number;
  /**
   * 确认空气质量ID，确认空气质量ID（外键）
   */
  confirm_aqi_id: number;
  /**
   * 确认日期，确认日期
   */
  confirm_date: string;
  /**
   * 确认时间，确认时间
   */
  confirm_time: string;
  /**
   * 网格员ID，网格员ID（外键）
   */
  gm_id: number;
  /**
   * 网格区域ID，网格区域ID（外键）
   */
  grid_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * so2级别，二氧化硫级别
   */
  so2_level: number;
  /**
   * so2浓度，二氧化硫浓度
   */
  so2_value: number;
  /**
   * spm级别，空气悬浮颗粒物级别
   */
  spm_level: number;
  /**
   * spm浓度，空气悬浮颗粒物浓度
   */
  spm_value: number;
  [property: string]: any;
}
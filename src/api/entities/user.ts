import type { Gender, GridMemberState } from "@/common/enums";

/**
 * loginDTO
 */
export interface LoginDTO {
  /**
   * 登录编码，登录编码（对于公众监督员，使用其手机号）
   */
  login_code: string;
  /**
   * 密码，密码
   */
  password: string;
  [property: string]: any;
}

/**
 * userDTO
 */
export interface UserDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 用户头像，用户头像（base64格式））
   */
  avatar?: string;
  /**
   * 性别，性别（三种）
   */
  gender: Gender;
  /**
   * 登录编码，登录编码（对于公众监督员，使用其手机号）
   */
  login_code: string;
  /**
   * 姓名，用户姓名
   */
  name: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 角色，用户角色（三种）
   */
  role: number;
  /**
   * 状态，账号状态（是否可用）
   */
  status: boolean;
  /**
   * 手机号，用户联系方式
   */
  tel: string;
  /**
   * 用户ID，用户ID
   */
  user_id: number;
  [property: string]: any;
}

/**
 * registerDTO
 */
export interface RegisterDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 性别，性别（三种）
   */
  gender: Gender;
  /**
   * 姓名，用户姓名
   */
  name: string;
  /**
   * 密码，用户密码
   */
  password: string;
  /**
   * 角色，用户角色（三种）
   */
  role: number;
  /**
   * 手机号，用户联系方式
   */
  tel: string;
  [property: string]: any;
}

/**
 * updateDTO
 */
export interface UpdateDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 用户头像，用户头像（base64格式）
   */
  avatar?: string;
  /**
   * 性别，性别（三种）
   */
  gender?: Gender;
  /**
   * 姓名，用户姓名
   */
  name?: string;
  /**
   * 密码，密码
   */
  password?: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 手机号，用户联系方式
   */
  tel?: string;
  /**
   * 用户ID，用户ID
   */
  user_id: number;
  [property: string]: any;
}

/**
 * gmDTO
 */
export interface GmDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 用户头像，用户头像（base64格式）
   */
  avatar?: string;
  /**
   * 市编号，市编号（外键）
   */
  city_id: string;
  /**
   * 性别，性别（三种）
   */
  gender: Gender;
  /**
   * 登录编码，登录编码（对于公众监督员，使用其手机号）
   */
  login_code: string;
  /**
   * 姓名，用户姓名
   */
  name: string;
  /**
   * 省编号，省编号（外键）
   */
  province_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 角色，用户角色（三种）
   */
  role: number;
  /**
   * 网格员状态，网格员状态（六种状态）
   */
  state: GridMemberState;
  /**
   * 状态，账号状态（是否可用）
   */
  status: boolean;
  /**
   * 任务数量，待完成任务数量
   */
  task_num: number;
  /**
   * 手机号，用户联系方式
   */
  tel: string;
  /**
   * 用户ID，用户ID
   */
  user_id: number;
  [property: string]: any;
}

/**
 * adminDTO
 */
export interface AdminDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 用户头像，用户头像（base64格式）
   */
  avatar?: string;
  /**
   * 市编号，市编号（外键）
   */
  city_id: string;
  /**
   * 性别，性别（三种）
   */
  gender: Gender;
  /**
   * 登录编码，登录编码（对于公众监督员，使用其手机号）
   */
  login_code: string;
  /**
   * 姓名，用户姓名
   */
  name: string;
  /**
   * 省编号，省编号（外键）
   */
  province_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 角色，用户角色（三种）
   */
  role: number;
  /**
   * 状态，账号状态（是否可用）
   */
  status: boolean;
  /**
   * 手机号，用户联系方式
   */
  tel: string;
  /**
   * 用户ID，用户ID
   */
  user_id: number;
  [property: string]: any;
}

/**
 * gm_registerDTO
 */
export interface GmRegisterDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 市编号，市编号（外键）
   */
  city_id: string;
  /**
   * 性别，性别（三种）
   */
  gender: Gender;
  /**
   * 姓名，用户姓名
   */
  name: string;
  /**
   * 密码，用户密码
   */
  password: string;
  /**
   * 省编号，省编号（外键）
   */
  province_id: string;
  /**
   * 角色，用户角色（三种）
   */
  role: number;
  /**
   * 手机号，用户联系方式
   */
  tel: string;
  [property: string]: any;
}

/**
 * gm_updateDTO
 */
export interface GmUpdateDTO {
  /**
   * 年龄，用户年龄
   */
  age?: number;
  /**
   * 用户头像，用户头像（base64格式）
   */
  avatar?: string;
  /**
   * 市编号，市编号（外键）
   */
  city_id: string;
  /**
   * 性别，性别（三种）
   */
  gender?: Gender;
  /**
   * 姓名，用户姓名
   */
  name?: string;
  /**
   * 密码，密码
   */
  password?: string;
  /**
   * 省编号，省编号（外键）
   */
  province_id: string;
  /**
   * 备注，备注
   */
  remarks?: string;
  /**
   * 手机号，用户联系方式
   */
  tel?: string;
  /**
   * 用户ID，用户ID
   */
  user_id: number;
  [property: string]: any;
}
import { areaList } from '@vant/area-data';

export type AreaInfo = {
  province: Record<string, string>,
  city: Record<string, string>,
  grid: Record<string, string>
}

export const findAreaById = (areaId: string): AreaInfo => {
  const result: AreaInfo = {
    province: {},
    city: {},
    grid: {}
  }

  // 查找省份信息
  if (areaId.endsWith('0000')) {
    // 存入省份对应的信息
    result.province[areaId] = areaList.province_list[areaId];
    // 遍历所有城市查找属于该省的城市
    Object.keys(areaList.city_list).forEach(cityId => {
      if (cityId.substring(0, 2) === areaId.substring(0, 2)) {
        result.city[cityId] = areaList.city_list[cityId];
        // 遍历所有区县查找属于该城市的区县
        Object.keys(areaList.county_list).forEach(countyId => {
          if (countyId.substring(0, 4) === cityId.substring(0, 4)) {
            result.grid[countyId] = areaList.county_list[countyId];
          }
        });
      }
    });
  } else if (areaId.endsWith('00')) {
    // 存入城市对应的信息
    result.city[areaId] = areaList.city_list[areaId];
    // 找出省份ID
    const provinceId = areaId.substring(0, 2) + '0000';
    result.province[provinceId] = areaList.province_list[provinceId];
    // 遍历所有区县查找属于该城市的区县
    Object.keys(areaList.county_list).forEach(countyId => {
      if (countyId.substring(0, 4) === areaId.substring(0, 4)) {
        result.grid[countyId] = areaList.county_list[countyId];
      }
    });
  } else {
    // 存入区县对应的信息
    result.grid[areaId] = areaList.county_list[areaId];
    // 找出城市ID和省份ID
    const cityId = areaId.substring(0, 4) + '00';
    const provinceId = areaId.substring(0, 2) + '0000';
    result.city[cityId] = areaList.city_list[cityId];
    result.province[provinceId] = areaList.province_list[provinceId];
  }

  return result;
}

export const formatAddress = (result: AreaInfo): string => {
  // 提取省、市、区名称
  const provinceName = Object.values(result.province)[0] || '';
  const cityName = Object.values(result.city)[0] || '';
  const gridName = Object.values(result.grid)[0] || '';

  // 将省、市、区名称拼接成完整地址
  return `${provinceName}/${cityName}/${gridName}`;
}

export const determineCOPollutionLevel = (coValue: number) => {
  if (coValue < 0) {
    return undefined;
  }
  else if (coValue < 5) {
    return 0;
  }
  else if (coValue < 10) {
    return 1;
  }
  else if (coValue < 35) {
    return 2;
  }
  else if (coValue < 60) {
    return 3;
  }
  else if (coValue < 90) {
    return 4;
  }
  else if (coValue < 120) {
    return 5;
  }
  else if (coValue < 150) {
    return 6;
  }
  else {
    return 7;
  }
}

export const determineSO2PollutionLevel = (so2Value: number) => {
  if (so2Value < 0) {
    return undefined;
  }
  else if (so2Value < 150) {
    return 0;
  }
  else if (so2Value < 500) {
    return 1;
  }
  else if (so2Value < 650) {
    return 2;
  }
  else if (so2Value < 800) {
    return 3;
  }
  else {
    return 4;
  }
}

export const determineSPMPollutionLevel = (spmValue: number) => {
  if (spmValue < 0) {
    return undefined;
  }
  else if (spmValue < 35) {
    return 0;
  }
  else if (spmValue < 75) {
    return 1;
  }
  else if (spmValue < 115) {
    return 2;
  }
  else if (spmValue < 150) {
    return 3;
  }
  else if (spmValue < 250) {
    return 4;
  }
  else if (spmValue < 350) {
    return 5;
  }
  else if (spmValue < 500) {
    return 6;
  }
  else {
    return 7;
  }
}

// 根据背景颜色计算文本颜色，确保对比度足够
export const getTextColor = (bgColor: string) => {
  const color = bgColor.substring(1); // remove #
  const rgb = parseInt(color, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma > 128 ? "#000" : "#fff"; // black text if background is light, white if dark
};
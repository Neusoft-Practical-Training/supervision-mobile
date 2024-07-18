export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // getMonth() 返回的是 0-11，所以需要加1
  const day = date.getDate();

  // 使用模板字符串来格式化，确保月份和日期为两位数
  return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
}
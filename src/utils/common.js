const formatTime = require('silly-datetime');

/**
 * @param {String} value
 * @return {Boolean}
 * @description 判断是否为空
 * */
export const isEmpty = value => {
  return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
  )
};

/**
 * @param {String} time
 * @param {String} formatStr
 * @return {String}
 * @description 格式化时间
 * */
export const formatDate = (time, formatStr = 'YYYY-MM-DD') => {
  if (!time) return '';
  return formatTime.format(time, formatStr);
};

/**
 * @param {String} time
 * @param {String} formatStr
 * @return {String}
 * @description 格式化时间
 * */
export const formatDateTime = (time, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) return '';
  return formatTime.format(time, formatStr);
};

/**
 * @param {Object} data
 * @param {Object} value
 * @description value从data中取值
 * */
export const objectEvaluate = (data, value) => {
  for (let key in value) {
    if (data.hasOwnProperty(key)) value[key] = data[key]
  }
};

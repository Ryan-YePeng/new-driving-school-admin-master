import Vue from 'vue'

const formatTime = require('silly-datetime');

/**
 * @description 过滤时间
 * @return YYYY-MM-DD
 **/
Vue.filter("formatDate", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD');
});

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm:ss
 **/
Vue.filter("formatDateTime", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD HH:mm:ss');
});

// 改变窗口标题
Vue.directive('title', {
  // v-title data-title="所需要的标题"  这样使用
  inserted: function (el) {
    document.title = el.dataset.title
  }
});

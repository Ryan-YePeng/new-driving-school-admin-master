import Vue from 'vue'

// 过滤时间
Vue.filter("formatDate", value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = (date.getDate()).toString().padStart(2, '0');
  return `${year}-${month}-${day}`
});

// 过滤时间
Vue.filter("formatDateTime", value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = (date.getDate()).toString().padStart(2, '0');
  let hours = (date.getHours()).toString().padStart(2, '0');
  let minutes = (date.getMinutes()).toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`
});

// 改变窗口标题
Vue.directive('title', {
  // v-title data-title="所需要的标题"  这样使用
  inserted: function (el) {
    document.title = el.dataset.title
  }
});

// 防止同一时间多次点击
let openDelay = false;
Vue.directive('intervalclick', function (el, binding) {
  el.onclick = function (e) {
    if (openDelay) return;
    openDelay = !openDelay;
    if (!binding.value) {
      alert("未传入Value数据！");
      return;
    }
    let func = binding.value['func'];
    let time = binding.value['time'];
    if (typeof time !== 'number') {
      alert("传入等待时间错误");
      return;
    }
    let args = [];
    for (const key in binding.value) {
      if (binding.value.hasOwnProperty(key)) {
        if (key === 'func' || key === 'time') continue;
        args.push(binding.value[key])
      }
    }
    setTimeout(() => {
      openDelay = !openDelay;
    }, time);
    func(...args);
  }
});


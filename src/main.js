import Vue from 'vue'
// 路由
import router from './router'
// vuex
import store from './store'
// 过滤器
import './utils/directive'
// 样式初始化
import './styles/initialization.css'
// storage
import './utils/storage'
// 图标库
import './styles/iconfont.css'
// 选择树样式
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// svg
import './assets/icons'
// 右键菜单
import EVueContextmenu from 'e-vue-contextmenu'
// ElementUI
import './utils/EUI';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 阻止事件的默认行为
import 'default-passive-events'
// 组件传值
import './utils/vueEvent'
// App
import App from './App'

// 阻止启动生产消息
Vue.config.productionTip = false;
// 注册右键菜单
Vue.use(EVueContextmenu);
// ElementUI
Vue.use(ElementUI, {size: 'small'});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

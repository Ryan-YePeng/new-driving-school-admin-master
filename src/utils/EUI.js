import Vue from 'vue'
import {Message, MessageBox, Notification} from 'element-ui'

import {
  Button,
  Container,
  Header,
  Tooltip,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Main,
  Form,
  FormItem,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableColumn,
  Tag,
  Scrollbar,
  Submenu,
  Dialog,
  Col,
  Row,
  Upload,
  Card,
  Popover,
  Loading,
  Option,
  Select,
  InputNumber,
  PageHeader,
  Image,
  Cascader,
  TabPane,
  Tabs,
  Radio,
  Switch
} from 'element-ui'

Vue.prototype.$ELEMENT = {size: 'small'};
Vue.component('ElButton', Button);
Vue.component('ElContainer', Container);
Vue.component('ElHeader', Header);
Vue.component('ElTooltip', Tooltip);
Vue.component('ElDropdown', Dropdown);
Vue.component('ElDropdownMenu', DropdownMenu);
Vue.component('ElDropdownItem', DropdownItem);
Vue.component('ElAvatar', Avatar);
Vue.component('ElMain', Main);
Vue.component('ElForm', Form);
Vue.component('ElFormItem', FormItem);
Vue.component('ElInput', Input);
Vue.component('ElBreadcrumb', Breadcrumb);
Vue.component('ElBreadcrumbItem', BreadcrumbItem);
Vue.component('ElMenu', Menu);
Vue.component('ElMenuItem', MenuItem);
Vue.component('ElPagination', Pagination);
Vue.component('ElTable', Table);
Vue.component('ElTableColumn', TableColumn);
Vue.component('ElTag', Tag);
Vue.component('ElScrollbar', Scrollbar);
Vue.component('ElSubmenu', Submenu);
Vue.component('ElDialog', Dialog);
Vue.component('ElCol', Col);
Vue.component('ElRow', Row);
Vue.component('ElUpload', Upload);
Vue.component('ElCard', Card);
Vue.component('ElPopover', Popover);
Vue.use(Loading.directive);
Vue.component('ElOption', Option);
Vue.component('ElSelect', Select);
Vue.component('ElInputNumber', InputNumber);
Vue.component('ElPageHeader', PageHeader);
Vue.component('ElImage', Image);
Vue.component('ElCascader', Cascader);
Vue.component('ElTabPane', TabPane);
Vue.component('ElTabs', Tabs);
Vue.component('ElRadio', Radio);
Vue.component('ElSwitch', Switch);
/**
 * @param {String} msg 提示信息
 */
const successMsg = msg => {
  Message.success(msg)
};

const warnMsg = msg => {
  Message.warning(msg)
};

const errorMsg = msg => {
  Message.error(msg)
};

const infoMsg = msg => {
  Message.info(msg)
};

const successNotify = msg => {
  Notification.success({
    title: '成功',
    message: msg
  })
};

const warnNotify = msg => {
  Notification.warning({
    title: '警告',
    message: msg
  })
};

const infoNotify = msg => {
  Notification.info({
    title: '消息',
    message: msg
  })
};

const errorNotify = msg => {
  Notification.error({
    title: '错误',
    message: msg
  })
};

/**
 * @param {String} text 提示信息
 * @param {String} type 消息框类型(success, info, error, warning)
 */
const msgBox = (text = '确定执行此操作吗？', type = 'warning') => {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
};

// 全局注册
Vue.prototype.$successMsg = successMsg;
Vue.prototype.$errorMsg = errorMsg;
Vue.prototype.$infoMsg = infoMsg;
Vue.prototype.$warnMsg = warnMsg;
Vue.prototype.$successNotify = successNotify;
Vue.prototype.$errorNotify = errorNotify;
Vue.prototype.$infoNotify = infoNotify;
Vue.prototype.$warnNotify = warnNotify;
Vue.prototype.$msgBox = msgBox;

export default {
  successMsg,
  errorMsg
}

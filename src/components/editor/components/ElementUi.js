import {
  Loading,
  MessageBox,
  Message
} from 'element-ui'
import Vue from 'vue';
import './theme/index.css'

import ElementUI from 'element-ui';
const plugin = {
  install(Vue) {
    Vue.use(Loading.directive);
    // 原型方法
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$message = Message;
  }
};
Vue.use(plugin)
Vue.use(ElementUI);
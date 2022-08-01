import Vue from 'vue'
import App from './App.vue'
import API from "./api/index.js";
//import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false
Vue.prototype.API = API;
import VueCompositionApi from '@vue/composition-api';
import router from './router/index';
import store from './store/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@bpmn-io/form-js/dist/assets/form-js.css'
import '@bpmn-io/form-js/dist/assets/form-js-editor.css'
import '@bpmn-io/form-js/dist/assets/dragula.css'
Vue.use(VueCompositionApi);

Vue.use(iView);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
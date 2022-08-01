
import VueRouter from 'vue-router';
import Vue from 'vue'

const routes = [
  {
    path: '/input',
    component: () => import('../components/editor/index.vue'),
  },
  {
    path: '/',
    component: () => import('../components/logigflow/index.vue'),
  },
];
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};// 解决vue-router更新后调用push方控制台报错的问题 ;
const router = new VueRouter({
  routes,
});
export default router
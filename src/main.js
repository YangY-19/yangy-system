import Vue from 'vue'
import ElementUI from 'element-ui';
import routes from './router'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);


// const router = new VueRouter({
//   routes,
//   mode: 'history',//路由种类，
//   linkActiveClass: 'active-link', //选中添加class
//   linkExactActiveClass: 'exact-active-link',
//   scrollBehavior(to, from, savedPosition) {
//     if(savedPosition) {
//       return savedPosition;//记录之前页面滚动的位置
//     } else {
//       return {x:0, y:0};
//     }
//   },
//   fallback: true, //不支持 history 时切换到 hash路由
// })


new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')

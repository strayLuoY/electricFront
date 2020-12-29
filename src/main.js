import * as urls from '@/config/env';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import website from '@/config/website';
import avueUeditor from 'avue-plugin-ueditor';
import Element from 'element-ui';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App';
import './cache'; //页面缓存
import basicBlock from './components/basic-block/main';
import basicContainer from './components/basic-container/main';
import thirdRegister from './components/third-register/main';
import './error'; // 日志
import i18n from './lang'; // Internationalization
import './permission'; // 权限
import axios from './router/axios';
import router from './router/router';
import store from './store/index';
import './styles/common.scss';
import './styles/less/custom.scss';
import { loadStyle } from './util/util';

Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
  size: 'mini',
  tableSize: 'mini',
  i18n: (key, value) => i18n.t(key, value)
});
//注册全局容器
Vue.component('basicContainer', basicContainer);
Vue.component('basicBlock', basicBlock);
Vue.component('thirdRegister', thirdRegister);
Vue.component('avueUeditor', avueUeditor);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 加载website
Vue.prototype.website = website;
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

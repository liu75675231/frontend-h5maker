import Vue from 'vue'
import router from './router'
import App from './app.vue';

import i18n from './i18n/index'
i18n.locale = navigator.language === 'zh' || navigator.language === 'zh-CN' ? 'zh' : 'en';

new Vue({
  el: '#app',
  router,
  i18n,
  render (h) {
    return h(App);
  }
})

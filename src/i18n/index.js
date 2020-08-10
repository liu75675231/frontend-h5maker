import VueI18n from 'vue-i18n'
import Vue from "vue";
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh',
  messages: {
    zh: {
      mypage: '我的页面',
      signup: '注册',
      login: '登录',
      newpage: '新页面',
      templates: '模板',
      loginInputUsername: '请输入一个有效的邮箱地址',
      loginInputPassword: '请输入密码',
      pleaseLogin: '请登录',
      signupPanelTitle: '请先注册，然后开启您的网页设计之旅',
    },
    en: {
      mypage: 'My page',
      signup: 'Sign up',
      login: 'Log in',
      newpage: 'New page',
      templates: 'Templates',
      loginInputUsername: 'Enter a valid email address',
      loginInputPassword: 'Password',
      pleaseLogin: 'Please log in',
      signupPanelTitle: 'Sign up and Starting your design journey',
    }
  }
});

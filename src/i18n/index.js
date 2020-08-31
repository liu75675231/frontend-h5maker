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
      userDuplicate: '此用户名已被注册',
      emptyUsername: '请输入用户名',
      emptyPassword: '请输入密码',
      invalidUsername: '用户名不合法，请输入一个合法的邮箱',
      invalidPassword: '密码不合法，请输入至少9个字符',
      incorrectUsernameOrPassword: '用户名或者密码不合法',
      registerSuccess: '注册成功',
      loginNotice: '请先登录',
      view: '查看',
      edit: '编辑',
      remove: '删除',
      clone: '克隆',
      removePageNotice: '确定删除此页面吗？',
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
      userDuplicate: 'This username was registered',
      emptyUsername: 'Please input username',
      emptyPassword: 'Please input password',
      invalidUsername: 'Username is invalid, please input a valid email',
      invalidPassword: 'Password is invalid, please input at least 9 characters',
      incorrectUsernameOrPassword: 'Incorrect username or password',
      registerSuccess: 'Register Successful',
      loginNotice: 'You need to login first',
      view: 'View',
      edit: 'Edit',
      remove: 'Remove',
      clone: 'Clone',
      removePageNotice: 'Are you sure to remove this page?',
    }
  }
});

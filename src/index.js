import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import store from './store'
import VueI18n from 'vue-i18n'
import i18n from './i18n/editor'

import { locale, Button, Layout, Header, Sider, Content, Input, Form, FormItem, Select, Option, RadioGroup, Radio, ColorPicker, Checkbox, Upload, Modal, Message, Icon, Tabs, TabPane, Collapse, Panel, InputNumber  } from 'view-design'
import 'view-design/dist/styles/iview.css'
import 'animate.css'

import lang from 'view-design/dist/locale/en-US';

i18n.locale = navigator.language === 'zh' || navigator.language === 'zh-CN' ? 'zh' : 'en';
if (i18n.locale === 'en') {
  locale(lang);
}

Vue.component('i-button', Button)
Vue.component('i-layout', Layout)
Vue.component('i-header', Header)
Vue.component('i-sider', Sider)
Vue.component('i-content', Content)
Vue.component('i-form', Form)
Vue.component('i-input', Input)
Vue.component('i-form-item', FormItem)
Vue.component('i-select', Select)
Vue.component('i-option', Option)
Vue.component('i-radio-group', RadioGroup)
Vue.component('i-radio', Radio)
Vue.component('i-color-picker', ColorPicker)
Vue.component('i-checkbox', Checkbox)
Vue.component('i-upload', Upload)
Vue.component('i-modal', Modal)
Vue.component('i-icon', Icon)
Vue.component('i-tabs', Tabs)
Vue.component('i-tab-pane', TabPane)
Vue.component('i-collapse', Collapse)
Vue.component('i-panel', Panel)
Vue.component('i-input-number', InputNumber)

Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message


new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})

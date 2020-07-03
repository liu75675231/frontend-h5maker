import Vue from 'vue'
import App from './app.vue'

import { Button, Layout, Header, Sider, Content, Input, Form, FormItem, Select, Option, RadioGroup, Radio, ColorPicker, Checkbox, Upload, Modal, Message } from 'view-design'
import 'view-design/dist/styles/iview.css'

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
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message

new Vue({
  el: '#app',
  render: h => h(App)
})

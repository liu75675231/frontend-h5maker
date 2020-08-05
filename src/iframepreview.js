import Vue from 'vue'
import Iframepreview from './iframepreview.vue'

new Vue({
  el: '#app',
  render: h => h(Iframepreview)
})


// const app = new Vue({
//   el: '#app',
//   data () {
//     return {
//       vnode: null,
//     };
//   },
//   render (h) {
//     console.log(this.vnode);
//     if (!this.vnode) {
//       return h('div');
//     }
//     const renderData = generateVNodeTree(this.vnode, h);
//     return renderData;
//   },
//   mounted() {
//     initDragger();
//   },
// })
//
//
//
// Object.defineProperty(window, 'vnode', {
//   set (val) {
//     console.log('aaaa');
//     app.vnode = val;
//     app.$forceUpdate();
//   },
// })

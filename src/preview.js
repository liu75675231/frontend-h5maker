import Vue from 'vue'
import {generateVNodeTree} from './utils/render'
import {initDragger} from './utils/drag';
import { initClick } from './utils/click';
import { initEvent } from './utils/event';
import { deepCloneVNodeWithoutEvent } from './utils/vnode';
import 'animate.css'
import './style/show.css'

const app = new Vue({
  el: '#app',
  data () {
    return {
      vnode: {},
    };
  },
  created () {
    this.vnode = JSON.parse(localStorage.getItem('vnodeForView'));
  },
  render (h) {
    console.log(this.vnode);
    const renderData = generateVNodeTree(this.vnode, h);
    return renderData;
  },
  mounted() {
    initDragger();
    initClick();
    initEvent();
    console.log(window.vnode);
  },
})

// console.log(window.vnode);
// Object.defineProperty(window, 'vnode', {
//   set (val) {
//     console.log(val);
//     app.vnode = deepCloneVNodeWithoutEvent(val);
//     app.$forceUpdate();
//   },
// })



window.addEventListener("message", function(event) {
  console.log(event.data);
  if (typeof event.data === 'object' && event.data !== null && event.data.type === 'vnode') {
    app.vnode = JSON.parse(event.data.data);
  }
}, false);

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
    this.vnode = JSON.parse(sessionStorage.getItem('vnodeForView'));
  },
  render (h) {
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

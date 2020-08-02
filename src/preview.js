import Vue from 'vue'
import {generateVNodeTree} from './utils/render'
import {initDragger} from './utils/drag';


const app = new Vue({
  el: '#app',
  data () {
    return {
      vnode: {},
    };
  },
  created () {
    this.vnode = window.vnode;
  },
  render (h) {
    console.log(window.vnode);
    console.log(this.vnode);
    const renderData = generateVNodeTree(this.vnode, h);
    return renderData;
  },
  mounted() {
    initDragger();
  },
})



Object.defineProperty(window, 'vnode', {
  set (val) {
    app.vnode = val;
    app.$forceUpdate();
  },
})

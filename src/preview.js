import Vue from 'vue'
import html2canvas from 'html2canvas'
import {generateVNodeTree} from './utils/render'
import {initDragger} from './utils/drag';
import { initClick } from './utils/click';
import { initEvent } from './utils/event';
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
  },
})

window.addEventListener("message", function(event) {
  console.log(event.data);
  if (typeof event.data === 'object' && event.data !== null && event.data.type === 'vnode') {
    app.vnode = JSON.parse(event.data.data);
  }
}, false);


window.getScreenShot = function () {
  html2canvas(document.body, {
    letterRendering: 1,
    allowTaint : true,
    foreignObjectRendering: true,
    useCORS: false
  }).then(canvas => {
    document.body.appendChild(canvas)
    window.open(canvas.toDataURL());

  });
}

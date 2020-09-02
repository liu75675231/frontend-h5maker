import Vue from 'vue'
import { generateVNodeTree } from './utils/render'
import { httpGetH5Data } from './http/h5';
import { initDragger } from './utils/drag';
import { initClick } from './utils/click';
import { initEvent } from './utils/event';
import { removePrefersReducedMotionFromAnimationCSS } from './utils/stylesheet';
const urlParams = new URLSearchParams(window.location.search);
import 'animate.css'
import './style/show.css'

removePrefersReducedMotionFromAnimationCSS();

httpGetH5Data(urlParams.get('id')).then((res) => {
  document.title = res.data.data.title;
  const data = JSON.parse(res.data.data.data);
  new Vue({
    el: '#app',
    render: h => {
      const renderData = generateVNodeTree(data, h);
      return renderData;
    },
    mounted () {
      initDragger();
      initClick();
      initEvent();
    },
  })
});

import Vue from 'vue'
import { generateVNodeTree } from './utils/render'
import { httpGetH5Data } from './http/h5';
import { initDragger } from './utils/drag';
const urlParams = new URLSearchParams(window.location.search);
import 'animate.css'

httpGetH5Data(urlParams.get('id')).then((res) => {
  const data = JSON.parse(res.data.data.data);
  new Vue({
    el: '#app',
    render: h => {
      const renderData = generateVNodeTree(data, h);
      return renderData;
    },
    mounted () {
      initDragger();
    },
  })

});

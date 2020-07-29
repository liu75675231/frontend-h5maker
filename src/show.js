import Vue from 'vue'
import { generateVNodeTree } from './utils/render'
import { httpGetH5Data } from './http/h5';
const urlParams = new URLSearchParams(window.location.search);

httpGetH5Data(urlParams.get('id')).then((res) => {
  const data = JSON.parse(res.data.data.data);
  new Vue({
    el: '#app',
    render: h => {
      const renderData = generateVNodeTree(data, h);
      console.log(renderData);
      return renderData;
    }
  })

});

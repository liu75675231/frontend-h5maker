import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vnode: {
      tag: 'div',
      title: '',
      attrs: {},
      style: {
        height: 'initial',
      },
      class: {
        curselected: false,
      },
      children: [],
    },
  },
  actions: {
    generateVNodeData (state, parentVNode, tagName, data) {

    },
  }
})

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
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
  mutations: {
    setTitle (state, title) {
      state.title = title;
    },
  },
  actions: {
    generateVNodeData (state, parentVNode, tagName, data) {

    },
  }
})

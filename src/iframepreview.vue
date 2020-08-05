<template>
  <div>
    <div class="selected-area" v-show="selectedRect.isShow"
         :style="{ top: selectedRect.top + 'px', left: selectedRect.left + 'px' }">
      <div class="selected-line"
           :style="{ top: 0, left: 0, width: selectedRect.width + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: '-4px', left: (selectedRect.width / 2 - 5) + 'px'}"></div>
      <div class="selected-line"
           :style="{ top: 0, left: 0, height: selectedRect.height + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: (selectedRect.height / 2 - 5) + 'px', left: '-4px'}"></div>
      <div class="selected-line"
           :style="{ top: selectedRect.height + 'px', left: 0, width: selectedRect.width + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: (selectedRect.height - 4) + 'px', left: (selectedRect.width / 2 - 5) + 'px'}"></div>
      <div class="selected-line"
           :style="{ top: 0, left: selectedRect.width + 'px', height: selectedRect.height + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: (selectedRect.height / 2 - 4) + 'px', left: (selectedRect.width - 4) + 'px'}"></div>
    </div>
    <rendered-html :vnode="tree"></rendered-html>
  </div>
</template>

<script>
  import {initDragger} from './utils/drag';
  import _ from 'lodash';
  import $ from 'jquery';
  export default {
    name: "iframepreview",
    components: {
      RenderedHtml: {
        props: {
          vnode: Object,
        },
        render(createElement) {
          if (!this.vnode) {
            return createElement('div');
          }
          const renderData = this.generateElementObj(this.vnode, createElement);
          return renderData;
        },
        mounted() {
          initDragger();
        },
        methods: {
          generateElementObj(vnodeObj, createElement) {
            const $this = this;
            const children = [];
            vnodeObj.children && vnodeObj.children.forEach((elem) => {
              if (typeof elem === 'string') {
                children.push(elem);
              } else {
                children.push($this.generateElementObj(elem, createElement));
              }
            });

            return createElement(vnodeObj.tag, {
              attrs: JSON.parse(JSON.stringify(vnodeObj.attrs || {})),
              on: vnodeObj.on || {},
              style: vnodeObj.style || {},
              class: vnodeObj.class || {},
            }, children);
          },
        },
      },
    },
    data () {
      return {
        selectedRect: {
          isShow: false,
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        },
        tree: null,
      };
    },
    created () {
      var $this = this;
      Object.defineProperty(window, 'vnode', {
        set (val) {
          $this.tree = _.cloneDeep(_.omit(val, ['parentVNode']));
          $this.$nextTick(() => {
            const $selected = $(".curselected");
            if ($selected.length > 0) {
              $this.switchSelectedRect($selected.get(0), 'show');
            } else {
              $this.switchSelectedRect($selected.get(0), 'hide');
            }
          });
        },
      })
    },
    methods: {
      switchSelectedRect(dom, type) {
        if (!type) {
          type = this.selectedRect.isShow ? 'hide' : 'show';
        }

        if (type == 'show') {
          const $dom = $(dom), offset = $dom.offset()
          this.selectedRect = {
            isShow: true,
            top: offset.top,
            left: offset.left,
            width: $dom.width(),
            height: $dom.height(),
          }
        } else {
          this.selectedRect.isShow = false;
        }
      },
    },
  }
</script>

<style scoped>
  .selected-area {
    position: absolute;
  }

  .selected-line {
    background-color: #59c7f9;
    height: 1px;
    width: 1px;
    position: absolute;
  }

  .selected-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid #59c7f9;
    border-radius: 10px;
  }


  .list-with-circle {

  }
  .list-with-circle:before {
    content: '';
    position: relative;
    border: solid .3rem #5B79FB;
    border-radius: .8rem;
    width: .6rem;
    display: inline-block;
    height: .6rem;
    background-color: transparent;
    flex-shrink: 0;
    margin-right: .5rem;
  }
</style>
<style>
  body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }

  body::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
    );
  }

  body::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
</style>

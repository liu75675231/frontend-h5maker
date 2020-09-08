<template>
  <div>
    <div class="selected-area" v-show="selectedRect.isShow"
         :style="{ top: selectedRect.top + 'px', left: selectedRect.left + 'px' }">
      <div class="selected-point"
           :style="{ top: '-4px', left: '-4px'}"></div>
      <div class="selected-line"
           :style="{ top: 0, left: 0, width: selectedRect.width + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: '-4px', left: (selectedRect.width / 2 - 5) + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: '-4px', left: (selectedRect.width - 4) + 'px'}"></div>
      <div class="selected-line"
           :style="{ top: 0, left: 0, height: selectedRect.height + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: (selectedRect.height / 2 - 5) + 'px', left: '-4px'}"></div>
      <div class="selected-point"
           :style="{ top: selectedRect.height - 4 + 'px', left: (selectedRect.width - 4) + 'px'}"></div>
      <div class="selected-line"
           :style="{ top: selectedRect.height + 'px', left: 0, width: selectedRect.width + 'px'}"></div>
      <div class="selected-point"
           :style="{ top: selectedRect.height - 4 + 'px', left: '-4px'}"></div>
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
  import {initClick} from "./utils/click";
  import { generateVNodeTree } from './utils/render';
  import interact from 'interactjs'
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
          const renderData = generateVNodeTree(this.vnode, createElement);
          return renderData;
        },
        mounted() {
          initClick();
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
          curSelectedNode: null,
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
              $this.switchSelectedRect($selected.get(0), 'show', val);
            } else {
              $this.switchSelectedRect($selected.get(0), 'hide', val);
            }
          });
        },
      })
    },
    mounted() {
      this.initDrag();
    },
    methods: {
      getCurSelectedNode (node) {
        if (!_.isObject(node)) {
          return;
        }
        if (node.class && node.class.curselected) {
          return node;
        }

        const $this = this;
        let curSelectedNode;
        node.children.forEach((elem) => {
          let childNode = $this.getCurSelectedNode(elem);
          if (childNode) {
            curSelectedNode = childNode;
          }
        });

        return curSelectedNode;
      },
      initDrag () {
        const $this = this;
        interact('.curselected')
            .resizable({
              edges: { left: true, right: true, bottom: true, top: true },

              listeners: {
                move (event) {
                  var target = event.target
                  var x = (parseFloat(target.getAttribute('data-x')) || 0)
                  var y = (parseFloat(target.getAttribute('data-y')) || 0)

                  // update the element's style
                  target.style.width = event.rect.width + 'px'
                  target.style.height = event.rect.height + 'px'

                  x += event.deltaRect.left
                  y += event.deltaRect.top

                  target.style.webkitTransform = target.style.transform =
                      'translate(' + x + 'px,' + y + 'px)'

                  target.setAttribute('data-x', x)
                  target.setAttribute('data-y', y)
                },
                end (event) {
                  const $curSelected = $(".curselected");
                  const offset = $curSelected.offset();
                  $curSelected.css('transform', "");
                  $curSelected.attr("data-x", "");
                  $curSelected.attr("data-y", "");


                  $this.selectedRect.curSelectedNode.style.left = $this.convertPxToVw(offset.left);
                  $this.selectedRect.curSelectedNode.style.top = $this.convertPxToVw(offset.top);
                  $this.selectedRect.curSelectedNode.style.width = $this.convertPxToVw($curSelected.css('width').replace('px', ''));
                  $this.selectedRect.curSelectedNode.style.height = $this.convertPxToVw($curSelected.css('height').replace('px', ''));
                }
              },
              modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                  outer: 'parent'
                }),

                // minimum size
                interact.modifiers.restrictSize({
                  min: { width: 100, height: 50 }
                })
              ],

              inertia: true
            })
            .draggable({
              // enable inertial throwing
              inertia: true,
              // keep the element within the area of it's parent
              modifiers: [
                interact.modifiers.restrictRect({
                  restriction: 'parent',
                  endOnly: true
                })
              ],
              // enable autoScroll
              autoScroll: true,

              listeners: {
                // call this function on every dragmove event
                move: dragMoveListener,

                // call this function on every dragend event
                end (event) {
                  var textEl = event.target.querySelector('p')

                  textEl && (textEl.textContent =
                      'moved a distance of ' +
                      (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                          Math.pow(event.pageY - event.y0, 2) | 0))
                          .toFixed(2) + 'px')
                }
              }
            })
        function dragMoveListener (event) {
          var target = event.target
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.webkitTransform =
              target.style.transform =
                  'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },
      convertPxToVw (width) {
        return width / document.documentElement.clientWidth * 100 + 'vw';
      },
      switchSelectedRect(dom, type, originVNode) {
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
            curSelectedNode: this.getCurSelectedNode(originVNode),
          }
          console.log(this.selectedRect.curSelectedNode.style);
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
    z-index: 1;
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
    z-index: 1;
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

<template>
  <div class="page-canvas">
    <div class="main-container">
      <div class="panel-canvas">
        <rendered-html v-if="isShow" :vnode="tree"></rendered-html>
      </div>
      <div class="panel-setting" :style="{ visibility: form.vnode ? 'visible' : 'hidden' }">
        <i-form class="form" :label-width="80">
          <i-form-item  v-for="(item, index) in form.textList" :label="'内容' + (index + 1)" :key="index">
            <i-input v-model="item.text" @on-change="changePanelText(item.text, index)"></i-input>
          </i-form-item>

          <i-form-item label="宽度">
            <i-input  v-model="form.style.width.val" @on-change="changeStyleWithUnit('width', 'auto')">
              <i-select slot="append" v-model="form.style.width.unit" style="width: 70px" @on-change="changeStyleWithUnit('width', 'auto')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
                <i-option value="%">%</i-option>
              </i-select>
            </i-input>
          </i-form-item>
          <i-form-item label="高度">
            <i-input  v-model="form.style.height.val" @on-change="changeStyleWithUnit('height', 'auto')">
              <i-select slot="append" v-model="form.style.height.unit" style="width: 70px" @on-change="changeStyleWithUnit('height', 'auto')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
                <i-option value="%">%</i-option>
              </i-select>
            </i-input>
          </i-form-item>

          <i-form-item label="显示方式">
            <i-select v-model="form.style.display" style="width: 200px" @on-change="changeStyle('display')">
              <i-option value="none">隐藏</i-option>
              <i-option value="block">块级显示</i-option>
              <i-option value="inline-block">内联-块级显示</i-option>
              <i-option value="inline">内联显示</i-option>
              <i-option value="flex">flex</i-option>
            </i-select>
          </i-form-item>

          <i-form-item label="定位">
            <i-select v-model="form.style.position" style="width: 200px" @on-change="changeStyle('position')">
              <i-option value="static">默认定位</i-option>
              <i-option value="absolute">绝对定位</i-option>
              <i-option value="relative">相对定位</i-option>
            </i-select>
            <i-form-item label="上">
              <i-input  v-model="form.style.top.val" @on-change="changeStyleWithUnit('top', 'initial')">
                <i-select slot="append" v-model="form.style.top.unit" style="width: 70px" @on-change="changeStyleWithUnit('top', 'initial')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="右">
              <i-input  v-model="form.style.right.val" @on-change="changeStyleWithUnit('right', 'initial')">
                <i-select slot="append" v-model="form.style.right.unit" style="width: 70px" @on-change="changeStyleWithUnit('right', 'initial')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="下">
              <i-input  v-model="form.style.bottom.val" @on-change="changeStyleWithUnit('bottom', 'initial')">
                <i-select slot="append" v-model="form.style.bottom.unit" style="width: 70px" @on-change="changeStyleWithUnit('bottom', 'initial')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="左">
              <i-input  v-model="form.style.left.val" @on-change="changeStyleWithUnit('left', 'initial')">
                <i-select slot="append" v-model="form.style.left.unit" style="width: 70px" @on-change="changeStyleWithUnit('left', 'initial')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
          </i-form-item>



          <i-form-item label="外边距">
            <i-form-item label="上边距" :label-width="80">
              <i-input  v-model="form.style.margin.top.val" @on-change="changeMargin('top')">
                <i-select slot="append" v-model="form.style.margin.top.unit" style="width: 70px" @on-change="changeMargin('top')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="右边距" :label-width="80">
              <i-input  v-model="form.style.margin.right.val" @on-change="changeMargin('right')">
                <i-select slot="append" v-model="form.style.margin.right.unit" style="width: 70px" @on-change="changeMargin('right')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="下边距" :label-width="80">
              <i-input  v-model="form.style.margin.bottom.val" @on-change="changeMargin('bottom')">
                <i-select slot="append" v-model="form.style.margin.bottom.unit" style="width: 70px" @on-change="changeMargin('bottom')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="左边距" :label-width="80">
              <i-input  v-model="form.style.margin.left.val"@on-change="changeMargin('left')">
                <i-select slot="append" v-model="form.style.margin.left.unit" style="width: 70px"@on-change="changeMargin('left')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
          </i-form-item>

          <i-form-item label="内边距">
            <i-form-item label="上边距" :label-width="80">
              <i-input  v-model="form.style.padding.top.val" @on-change="changePadding('top')">
                <i-select slot="append" v-model="form.style.padding.top.unit" style="width: 70px" @on-change="changePadding('top')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="右边距" :label-width="80">
              <i-input  v-model="form.style.padding.right.val" @on-change="changePadding('right')">
                <i-select slot="append" v-model="form.style.padding.right.unit" style="width: 70px" @on-change="changePadding('right')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="下边距" :label-width="80">
              <i-input  v-model="form.style.padding.bottom.val" @on-change="changePadding('bottom')">
                <i-select slot="append" v-model="form.style.padding.bottom.unit" style="width: 70px" @on-change="changePadding('bottom')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="左边距" :label-width="80">
              <i-input  v-model="form.style.padding.left.val"@on-change="changePadding('left')">
                <i-select slot="append" v-model="form.style.padding.left.unit" style="width: 70px"@on-change="changePadding('left')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
          </i-form-item>

          <i-form-item label="边框">
            <i-form-item label="上边框" :label-width="80">
              <i-input  v-model="form.style.border.top.width.val" @on-change="changeBorder('top')">
                <i-select slot="append" v-model="form.style.border.top.width.unit" style="width: 70px" @on-change="changeBorder('top')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.border.top.color" @on-change="changeBorder('top')"/>
              <i-select v-model="form.style.border.top.style" style="width: 130px" @on-change="changeBorder('top')">
                <i-option value="none">无边框</i-option>
                <i-option value="solid">实线</i-option>
                <i-option value="dashed">虚线</i-option>
                <i-option value="double">双线</i-option>
              </i-select>
            </i-form-item>
            <i-form-item label="右边框" :label-width="80">
              <i-input  v-model="form.style.border.right.width.val" @on-change="changeBorder('right')">
                <i-select slot="append" v-model="form.style.border.right.width.unit" style="width: 70px" @on-change="changeBorder('right')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.border.right.color" @on-change="changeBorder('right')"/>
              <i-select v-model="form.style.border.right.style" style="width: 130px" @on-change="changeBorder('right')">
                <i-option value="none">无边框</i-option>
                <i-option value="solid">实线</i-option>
                <i-option value="dashed">虚线</i-option>
                <i-option value="double">双线</i-option>
              </i-select>
            </i-form-item>
            <i-form-item label="下边框" :label-width="80">
              <i-input  v-model="form.style.border.bottom.width.val" @on-change="changeBorder('bottom')">
                <i-select slot="append" v-model="form.style.border.bottom.width.unit" style="width: 70px" @on-change="changeBorder('bottom')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.border.bottom.color" @on-change="changeBorder('bottom')"/>
              <i-select v-model="form.style.border.bottom.style" style="width: 130px" @on-change="changeBorder('bottom')">
                <i-option value="none">无边框</i-option>
                <i-option value="solid">实线</i-option>
                <i-option value="dashed">虚线</i-option>
                <i-option value="double">双线</i-option>
              </i-select>
            </i-form-item>
            <i-form-item label="左边框" :label-width="80">
              <i-input  v-model="form.style.border.left.width.val" @on-change="changeBorder('left')">
                <i-select slot="append" v-model="form.style.border.left.width.unit" style="width: 70px" @on-change="changeBorder('left')">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.border.left.color" @on-change="changeBorder('left')"/>
              <i-select v-model="form.style.border.left.style" style="width: 130px" @on-change="changeBorder('left')">
                <i-option value="none">无边框</i-option>
                <i-option value="solid">实线</i-option>
                <i-option value="dashed">虚线</i-option>
                <i-option value="double">双线</i-option>
              </i-select>
            </i-form-item>
          </i-form-item>

          <i-form-item label="颜色">
            <i-color-picker v-model="form.style.color" @on-change="changeStyle('color')"/>
          </i-form-item>

          <i-form-item label="背景颜色">
            <i-color-picker v-model="form.style.backgroundColor" @on-change="changeStyle('backgroundColor')"/>
          </i-form-item>

          <i-form-item label="背景渐进">
            <i-input v-model="form.style.backgroundImage.direction" @on-change="changeBackgroundImage"></i-input>
            <i-form-item label="背景颜色1" :label-width="80">
              <i-input  v-model="form.style.backgroundImage.color0.len.val" @on-change="changeBackgroundImage">
                <i-select slot="append" v-model="form.style.backgroundImage.color0.len.unit" style="width: 70px" @on-change="changeBackgroundImage">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.backgroundImage.color0.color" @on-change="changeBackgroundImage"/>
            </i-form-item>
            <i-form-item label="背景颜色2" :label-width="80">
              <i-input  v-model="form.style.backgroundImage.color1.len.val" @on-change="changeBackgroundImage">
                <i-select slot="append" v-model="form.style.backgroundImage.color1.len.unit" style="width: 70px" @on-change="changeBackgroundImage">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
              <i-color-picker v-model="form.style.backgroundImage.color1.color" @on-change="changeBackgroundImage"/>
            </i-form-item>
          </i-form-item>

          <i-form-item label="颜色2">
            <i-input  v-model="form.style.fontSize.val" @on-change="changeStyleWithUnit('fontSize')">
              <i-select slot="append" v-model="form.style.fontSize.unit" style="width: 70px" @on-change="changeStyleWithUnit('fontSize')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
                <i-option value="%">%</i-option>
              </i-select>
            </i-input>
          </i-form-item>

          <i-form-item label="文字间距">
            <i-input  v-model="form.style.letterSpacing.val" @on-change="changeStyleWithUnit('letterSpacing')">
              <i-select slot="append" v-model="form.style.letterSpacing.unit" style="width: 70px" @on-change="changeStyleWithUnit('letterSpacing')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
                <i-option value="%">%</i-option>
              </i-select>
            </i-input>
          </i-form-item>

          <i-form-item label="行高">
            <i-input  v-model="form.style.lineHeight.val" @on-change="changeStyleWithUnit('lineHeight')">
              <i-select slot="append" v-model="form.style.lineHeight.unit" style="width: 70px" @on-change="changeStyleWithUnit('lineHeight')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
              </i-select>
            </i-input>
          </i-form-item>

          <i-form-item label="圆角">
            <i-input  v-model="form.style.borderRadius.val" @on-change="changeStyleWithUnit('borderRadius')">
              <i-select slot="append" v-model="form.style.borderRadius.unit" style="width: 70px" @on-change="changeStyleWithUnit('borderRadius')">
                <i-option value="rem">rem</i-option>
                <i-option value="px">px</i-option>
                <i-option value="%">%</i-option>
              </i-select>
            </i-input>
          </i-form-item>

          <i-form-item label="水平对齐">
            <i-select v-model="form.style.textAlign" style="width: 200px" @on-change="changeStyle('textAlign')">
              <i-option value="left">居左</i-option>
              <i-option value="center">居中</i-option>
              <i-option value="right">居右</i-option>
            </i-select>
          </i-form-item>

          <i-form-item label="是否加粗">
            <i-checkbox v-model="form.style.fontWeight" true-value="bold" false-value="normal" @on-change="changeStyle('fontWeight')"></i-checkbox>
          </i-form-item>


          <i-form-item label="阴影">
            <i-form-item label="水平位置" :label-width="80">
              <i-input  v-model="form.style.boxShadow.hShadow.val" @on-change="changeBoxShadow()">
                <i-select slot="append" v-model="form.style.boxShadow.hShadow.unit" style="width: 70px" @on-change="changeBoxShadow()">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="垂直位置">
              <i-input  v-model="form.style.boxShadow.vShadow.val" @on-change="changeBoxShadow()">
                <i-select slot="append" v-model="form.style.boxShadow.vShadow.unit" style="width: 70px" @on-change="changeBoxShadow()">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="模糊距离">
              <i-input  v-model="form.style.boxShadow.blur.val" @on-change="changeBoxShadow()">
                <i-select slot="append" v-model="form.style.boxShadow.blur.unit" style="width: 70px" @on-change="changeBoxShadow()">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>
            <i-form-item label="阴影尺寸">
              <i-input v-model="form.style.boxShadow.spread.val" @on-change="changeBoxShadow()">
                <i-select slot="append" v-model="form.style.boxShadow.spread.unit" style="width: 70px" @on-change="changeBoxShadow()">
                  <i-option value="rem">rem</i-option>
                  <i-option value="px">px</i-option>
                  <i-option value="%">%</i-option>
                </i-select>
              </i-input>
            </i-form-item>

            <i-form-item label="阴影颜色">
              <i-color-picker v-model="form.style.boxShadow.color" @on-change="changeBoxShadow()"/>
            </i-form-item>
          </i-form-item>
          <i-form-item>
            <i-button type="primary" @click="addPanel(form.vnode, 'div')">增加面板</i-button>
            <div @click="addPanel(form.vnode, 'img')">
              增加图片
            </div>
            <div @click="addPanel(form.vnode, 'span')">
              增加元素
            </div>
            <i-button style="margin-left: 8px" @click="removePanel">删除此面板</i-button>
          </i-form-item>
        </i-form>
      </div>
      <div class="panel-tree">
        <dom-tree :vnode="tree" @nodeclick="handleNodeClick"></dom-tree>
      </div>
    </div>

    <div @click="addPanel(tree, 'div')">
      增加面板
    </div>
    <i-upload action="https://wx.huiyou.lht.ren/house/upload-img" :on-success="uploadImgSuccess" :on-preview="uploadPreview" :on-remove="uploadRemove">
      <i-button icon="ios-cloud-upload-outline">增加图片</i-button>
    </i-upload>
    <div @click="addPanel(tree, 'img')">
      增加图片
    </div>
    <div @click="addPanel(tree, 'span')">
      增加元素
    </div>
  </div>

</template>

<script>
  export default {
    name: "canvas.vue",
    components: {
      RenderedHtml: {
        props: {
          vnode: Object,
        },
        render (createElement) {
          const renderData = this.generateElementObj(this.vnode, createElement);
          return renderData;
        },
        methods: {
          generateElementObj (vnodeObj, createElement) {
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
      DomTree: {
        props: {
          vnode: Object,
        },
        render (createElement) {
          const renderData = this.generateDomTreeObj(this.vnode, createElement);
          return renderData;
        },
        methods: {
          generateDomTreeObj (vnodeObj, createElement) {
            const $this = this;
            const children = [];

            children.push(createElement('div', {
              class: {
                domtreenode: true,
                curselected: vnodeObj.class && vnodeObj.class.curselected,
              }
            }, ['节点：' + vnodeObj.tag]));
            vnodeObj.children && vnodeObj.children.forEach((elem) => {
              if (typeof elem === 'string') {
                // children.push(createElement('div', {
                //   class: {
                //     'domtreenode': true,
                //   }
                // }, ['文本：' + elem]));
//                children.push('文本：' + elem);
              } else {
                children.push($this.generateDomTreeObj(elem, createElement));
              }
            });

            return createElement('div', {
              on: {
                click (e) {
                  e.stopPropagation();
                  $this.$emit('nodeclick', vnodeObj);
                }
              },
              class: {
                'domtreenode': true,
              }
            }, children);
          }
        },
      },
    },
    data () {
      return {
        isShow: true,
        form: {
          parentVNode: undefined,
          vnode: undefined,
          style: {
            width: {
              val: '100',
              unit: '%',
            },
            height: {
              val: '',
              unit: '%',
            },
            display: '',
            position: 'static',
            top: {
              val: '',
              unit: 'rem',
            },
            bottom: {
              val: '',
              unit: 'rem',
            },
            left: {
              val: '',
              unit: 'rem',
            },
            right: {
              val: '',
              unit: 'rem',
            },
            margin: {
              top: {
                val: '0',
                unit: 'rem',
              },
              bottom: {
                val: '0',
                unit: 'rem',
              },
              left: {
                val: '0',
                unit: 'rem',
              },
              right: {
                val: '0',
                unit: 'rem',
              },
            },
            padding: {
              top: {
                val: '0',
                unit: 'rem',
              },
              bottom: {
                val: '0',
                unit: 'rem',
              },
              left: {
                val: '0',
                unit: 'rem',
              },
              right: {
                val: '0',
                unit: 'rem',
              },
            },
            border: {
              top: {
                style: 'solid',
                width: {
                  val: '0',
                  unit: 'px',
                },
                color: '',
              },
              bottom: {
                style: 'solid',
                width: {
                  val: '0',
                  unit: 'px',
                },
                color: '',
              },
              left: {
                style: 'solid',
                width: {
                  val: '0',
                  unit: 'px',
                },
                color: '',
              },
              right: {
                style: 'solid',
                width: {
                  val: '0',
                  unit: 'px',
                },
                color: '',
              },
            },
            color: '#000',
            fontSize: {
              val: '1',
              unit: 'rem',
            },
            letterSpacing: {
              val: '0',
              unit: 'rem',
            },
            borderRadius: {
              val: '0',
              unit: 'rem',
            },
            lineHeight: {
              val: '1.4',
              unit: 'rem',
            },
            textAlign: 'left',
            fontWeight: 'normal',
            backgroundColor: '',
            backgroundImage: {
              direction: '0',
              color0: {
                len: {
                  val: '',
                  unit: 'rem',
                },
                color: '#000',
              },
              color1: {
                len: {
                  val: '',
                  unit: 'rem',
                },
                color: '#000',
              },
            },
            boxShadow: {
              hShadow: {
                val: 0,
                unit: 'rem',
              },
              vShadow: {
                val: 0,
                unit: 'rem',
              },
              blur: {
                val: 0,
                unit: 'rem',
              },
              spread: {
                val: 0,
                unit: 'rem',
              },
              color: '#000'
            },
          },
          textList: [],
        },
        tree: {
          tag: 'div',
          title: '',
          children: [],
        },
      }
    },
    methods: {
      handleNodeClick (curNode) {
        if (typeof this.form.vnode === 'object' && curNode !== this.form.vnode) {
          this.form.vnode.class.curselected = false;
        }
        curNode.class.curselected = !curNode.class.curselected;
        if (curNode.class.curselected) {
          this.form.textList = [];
          this.form.vnode = curNode;
          this.form.parentVNode = curNode.parentVNode;
          curNode.children.forEach((elem) => {
            if (typeof elem === 'string') {
              this.form.textList.push({
                text: elem,
              });
            }
          });
        } else {
          this.form.vnode = undefined;
          this.form.parentVNode = undefined;
          this.form.textList = [];
        }
      },
      uploadRemove () {
        console.log('asdf');
      },
      uploadPreview (file) {
        console.log(file);
      },
      uploadImgSuccess (res, file, fileList) {
        console.log(res);
        console.log(file);
        console.log(fileList);
      },
      changeBackgroundImage () {
        this.form.vnode.style.backgroundImage = `linear-gradient(${ this.form.style.backgroundImage.direction }deg,${ this.form.style.backgroundImage.color0.color } ${ this.form.style.backgroundImage.color0.len.val }${ this.form.style.backgroundImage.color0.len.unit },${ this.form.style.backgroundImage.color1.color } ${ this.form.style.backgroundImage.color1.len.val }${ this.form.style.backgroundImage.color1.len.unit })`;
      },
      changeBoxShadow () {
        this.form.vnode.style.boxShadow = `${ this.form.style.boxShadow.hShadow.val }${ this.form.style.boxShadow.hShadow.unit } ${ this.form.style.boxShadow.vShadow.val }${ this.form.style.boxShadow.vShadow.unit } ${ this.form.style.boxShadow.blur.val }${ this.form.style.boxShadow.blur.unit } ${ this.form.style.boxShadow.spread.val }${ this.form.style.boxShadow.spread.unit } ${ this.form.style.boxShadow.color }`;
      },
      changeBorder (type) {
        this.form.vnode.style['border' + type.replace(type[0],type[0].toUpperCase())] = this.form.style.border[type].style + ' ' + this.form.style.border[type].width.val + this.form.style.border[type].width.unit + ' ' + this.form.style.border[type].color;
      },
      changeStyleWithUnit (type, defaultVal) {
        let val = defaultVal || 0;
        if (this.form.style[type].val !== "") {
          val = this.form.style[type].val + this.form.style[type].unit;
        }
        this.form.vnode.style[type] = val;
      },
      changeStyle (type) {
        this.form.vnode.style[type] = this.form.style[type];
      },
      changeMargin (direction) {
        let val = 0;
        if (this.form.style.margin[direction].val !== '') {
          val = this.form.style.margin[direction].val + this.form.style.margin[direction].unit;
        }
        this.form.vnode.style['margin' + direction.replace(direction[0],direction[0].toUpperCase())] = val;
      },
      changePadding (direction) {
        let val = 0;
        if (this.form.style.padding[direction].val !== '') {
          val = this.form.style.padding[direction].val + this.form.style.padding[direction].unit;
        }
        this.form.vnode.style['padding' + direction.replace(direction[0],direction[0].toUpperCase())] = val;
      },
      changePanelText (msg, index) {
        let curIndex = 0;
        this.form.vnode.children.some((elem, loopIndex) => {
          if (typeof elem === 'string') {
            if (index === curIndex) {
              this.$set(this.form.vnode.children, loopIndex, msg);
              return true;
            }
            curIndex++;
          }
          return false;

        });
      },
      removePanel () {
        this.form.parentVNode.children.some((elem, index) => {
          if (elem === this.form.vnode) {
            this.$delete(this.form.parentVNode.children, index);
            return true;
          }
          return false;
        });
        this.form.vnode = undefined;
        this.form.parentVNode = undefined;
      },
      addPanel (parentVNode, tagName) {
        var $this = this;
        const curNode = {
          tag: tagName,
          parentVNode: parentVNode,
          class: {
            curselected: false,
          },
          style: {
            width: '100%',
            height: 'auto',
            position: 'static',
            display: 'block',
            top: '',
            bottom: '',
            left: '',
            right: '',
            marginLeft: '0',
            marginRight: '0',
            marginTop: '0',
            marginBottom: '0',
            paddingLeft: '0',
            paddingRight: '0',
            paddingTop: '0',
            paddingBottom: '0',
            borderLeft: '0',
            borderRight: '0',
            borderTop: '0',
            borderBottom: '0',
            color: '#000',
            fontSize: '1rem',
            letterSpacing: '0',
            borderRadius: '0',
            lineHeight: '1.4',
            textAlign: 'left',
            fontWeight: 'normal',
            backgroundColor: '',
            boxShadow: '',
            backgroundImage: '',
          },
          on: {
            click (e) {
              e.stopPropagation();
              $this.handleNodeClick(curNode);
            },
          },
          attrs: {

          },
          children: [
            '自定义内容'
          ],
        }
        if (tagName === 'img') {
          curNode.attrs = {
            src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          }
          curNode.style.display = 'inline-block';
        }
        if (tagName === 'span') {
          curNode.style.display = 'inline';
        }
        parentVNode.children.push(curNode);
      },
    },
  }
</script>

<style scoped>
  .page-canvas {
    height: 100%;
  }
  .panel-canvas {
    width: 375px;
    height: 667px;
    border: solid 1px #ddd;
    overflow-y: scroll;
    position: relative;
    background-color: #fff;
  }

  .main-container {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .panel-setting {
    width: 375px;
    height: 667px;
    border: solid 1px #ddd;
    overflow-y: auto;
  }

</style>
<style>
  .page-canvas .curselected {
    background-color: #ccc;
  }
  .page-canvas .ivu-form-item .ivu-form-item .ivu-form-item-content {
    margin-left: 80px!important;
  }
  .page-canvas .domtreenode {
    margin-left: 10px;
  }
</style>

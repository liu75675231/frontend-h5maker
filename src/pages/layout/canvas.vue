<template>
  <div class="page-canvas">
    <div class="main-container">
      <div class="panel-canvas">
        <div class="wrapper-canvas editable-panel"
             :style="{ width: resolutionX == '' ? '375px' : resolutionX + 'px' }">
          <div class="editable-title">
            屏幕显示
            <div class="editable-title-opt">
              <span v-if="false" class="editable-title-opt-item" @click="preferences.isShowModal = true">首选项</span>
              <span class="editable-title-opt-item" @click="showInsertNodePopup(tree)">新增</span>
              <span class="editable-title-opt-item" @click="transToAnotherPage">更多分辨率</span>
            </div>
          </div>
          <div id="renderedHtml">
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
            <rendered-html v-if="isShow" :vnode="tree" :previewWindowHandler="previewWindowHandler"></rendered-html>
          </div>
        </div>
      </div>
      <div class="editable-panel panel-setting">
        <div class="editable-title">
          设置节点
          <div class="editable-title-opt">
                        <span class="editable-title-opt-item" v-if="form.vnode && form.vnode.parentVNode"
                              @click="removePanel">删除</span>
            <span class="editable-title-opt-item" v-if="form.vnode && form.vnode.tag !== 'img'"
                  @click="showInsertNodePopup(form.vnode)">新增</span>
          </div>
        </div>
        <i-tabs>
          <i-tab-pane label="样式">
            <div class="editable-content">
              <i-form class="form" :label-width="80" v-if="form.vnode">
                <i-form-item v-for="(item, index) in form.textList" :label="'内容'" :key="index">
                  <i-input v-model="item.text"
                           @on-change="changePanelText(item.text, index)"></i-input>
                </i-form-item>

                <i-form-item label="链接"
                             v-if="form.vnode && form.vnode.attrs && form.vnode.attrs.src">
                  <img class="setting-img-preview" :src="form.vnode.attrs.src">
                  <i-upload ref="replaceUploadBtn" action="https://wx.huiyou.lht.ren/h5/upload-img"
                            accept="image/*" :on-success="uploadReplaceImgSuccess">
                    <i-button type="primary" icon="ios-cloud-upload-outline">替换图片</i-button>
                  </i-upload>
                </i-form-item>

                <i-form-item label="宽度">
                  <i-input-number v-model="form.style.width.val"
                           @on-change="changeStyleWithUnit('width', null)">
                  </i-input-number>
                  <i-select v-model="form.style.width.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('width', null)">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="高度">
                  <i-input-number v-model="form.style.height.val"
                           @on-change="changeStyleWithUnit('height', null)">
                  </i-input-number>
                  <i-select v-model="form.style.height.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('height', null)">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="显示方式">
                  <i-select v-model="form.style.display" style="width: 200px"
                            @on-change="changeStyle('display')">
                    <i-option value="none">隐藏</i-option>
                    <i-option value="block">块级显示</i-option>
                    <i-option value="inline-block">内联-块级显示</i-option>
                    <i-option value="inline">内联显示</i-option>
                    <i-option value="flex">flex</i-option>
                  </i-select>
                </i-form-item>

                <template v-if="form.style.display === 'flex'">
                  <i-form-item label="扩展比率">
                    <i-input-number v-model="form.style.flexGrow"
                             @on-change="changeStyle('flexGrow', null)">
                    </i-input-number>
                  </i-form-item>

                  <i-form-item label="收缩比率">
                    <i-input-number v-model="form.style.flexShrink"
                             @on-change="changeStyle('flexShrink', null)">
                    </i-input-number>
                  </i-form-item>

                  <i-form-item label="基准值">
                    <i-input-number v-model="form.style.flexBasis.val"
                             @on-change="changeStyleWithUnit('flexBasis', null)">
                    </i-input-number>
                    <i-select v-model="form.style.flexBasis.unit"
                              style="width: 70px"
                              @on-change="changeStyleWithUnit('flexBasis', null)">
                      <i-option value="rem">rem</i-option>
                      <i-option value="px">px</i-option>
                      <i-option value="%">%</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item label="主轴对齐">
                    <i-select v-model="form.style.justifyContent" style="width: 200px"
                              @on-change="changeStyle('justifyContent')">
                      <i-option value="flex-start">左对齐</i-option>
                      <i-option value="flex-end">右对齐</i-option>
                      <i-option value="center">居中</i-option>
                      <i-option value="space-between">两端对齐</i-option>
                      <i-option value="space-around">间隔对齐</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item label="交叉轴对齐">
                    <i-select v-model="form.style.alignItems" style="width: 200px"
                              @on-change="changeStyle('alignItems')">
                      <i-option value="flex-start">起点对齐</i-option>
                      <i-option value="flex-end">终点对齐</i-option>
                      <i-option value="center">居中</i-option>
                      <i-option value="baseline">基线对齐</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item label="是否换行">
                    <i-select v-model="form.style.flexWrap" style="width: 200px"
                              @on-change="changeStyle('flexWrap')">
                      <i-option value="nowrap">不换行</i-option>
                      <i-option value="wrap">换行</i-option>
                    </i-select>
                  </i-form-item>
                </template>

                <i-form-item label="定位">
                  <i-select v-model="form.style.position" style="width: 200px"
                            @on-change="changeStyle('position')">
                    <i-option value="static">默认定位</i-option>
                    <i-option value="absolute">绝对定位</i-option>
                    <i-option value="relative">相对定位</i-option>
                  </i-select>
                  <template v-if="form.style.position !== 'static'">
                    <i-form-item label="上" >
                      <i-input-number v-model="form.style.top.val"
                               @on-change="changeStyleWithUnit('top', 'initial')">
                      </i-input-number>
                      <i-select v-model="form.style.top.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('top', 'initial')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item label="右">
                      <i-input-number v-model="form.style.right.val"
                               @on-change="changeStyleWithUnit('right', 'initial')">
                      </i-input-number>
                      <i-select v-model="form.style.right.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('right', 'initial')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item label="下">
                      <i-input-number v-model="form.style.bottom.val"
                               @on-change="changeStyleWithUnit('bottom', 'initial')">
                      </i-input-number>
                      <i-select v-model="form.style.bottom.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('bottom', 'initial')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item label="左">
                      <i-input-number v-model="form.style.left.val"
                               @on-change="changeStyleWithUnit('left', 'initial')">
                      </i-input-number>
                      <i-select v-model="form.style.left.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('left', 'initial')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                      </i-select>
                    </i-form-item>
                  </template>
                </i-form-item>

                <i-form-item label="颜色">
                  <i-color-picker v-model="form.style.color" @on-change="changeStyle('color')"/>
                </i-form-item>


                <i-form-item label="字体大小">
                  <i-input-number v-model="form.style.fontSize.val"
                           @on-change="changeStyleWithUnit('fontSize')">
                  </i-input-number>
                  <i-select v-model="form.style.fontSize.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('fontSize')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="文字间距">
                  <i-input-number v-model="form.style.letterSpacing.val"
                           @on-change="changeStyleWithUnit('letterSpacing')">
                  </i-input-number>
                  <i-select v-model="form.style.letterSpacing.unit"
                            style="width: 70px" @on-change="changeStyleWithUnit('letterSpacing')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="行高">
                  <i-input-number v-model="form.style.lineHeight.val"
                           @on-change="changeStyleWithUnit('lineHeight')">
                  </i-input-number>
                  <i-select v-model="form.style.lineHeight.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('lineHeight')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="圆角">
                  <i-input-number v-model="form.style.borderRadius.val"
                           @on-change="changeStyleWithUnit('borderRadius')">

                  </i-input-number>
                  <i-select v-model="form.style.borderRadius.unit"
                            style="width: 70px" @on-change="changeStyleWithUnit('borderRadius')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="水平对齐">
                  <i-select v-model="form.style.textAlign" style="width: 200px"
                            @on-change="changeStyle('textAlign')">
                    <i-option value="left">居左</i-option>
                    <i-option value="center">居中</i-option>
                    <i-option value="right">居右</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item label="是否加粗">
                  <i-checkbox v-model="form.style.fontWeight" true-value="bold" false-value="normal"
                              @on-change="changeStyle('fontWeight')"></i-checkbox>
                </i-form-item>

                <i-collapse>
                  <i-panel name="1">
                    边距
                    <p slot="content">
                      <i-form-item label="外边距">
                        <i-form-item label="上边距" :label-width="80">
                          <i-input-number v-model="form.style.margin.top.val"
                                   @on-change="changeMargin('top')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.top.unit"
                                    style="width: 60px" @on-change="changeMargin('top')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="右边距" :label-width="80">
                          <i-input-number v-model="form.style.margin.right.val"
                                   @on-change="changeMargin('right')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.right.unit"
                                    style="width: 60px"
                                    @on-change="changeMargin('right')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="下边距" :label-width="80">
                          <i-input-number v-model="form.style.margin.bottom.val"
                                   @on-change="changeMargin('bottom')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.bottom.unit"
                                    style="width: 60px"
                                    @on-change="changeMargin('bottom')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="左边距" :label-width="80">
                          <i-input-number v-model="form.style.margin.left.val"
                                   @on-change="changeMargin('left')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.left.unit"
                                    style="width: 60px" @on-change="changeMargin('left')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>

                      <i-form-item label="内边距">
                        <i-form-item label="上边距" :label-width="80">
                          <i-input-number v-model="form.style.padding.top.val"
                                   @on-change="changePadding('top')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.top.unit"
                                    style="width: 60px" @on-change="changePadding('top')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="右边距" :label-width="80">
                          <i-input-number v-model="form.style.padding.right.val"
                                   @on-change="changePadding('right')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.right.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('right')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="下边距" :label-width="80">
                          <i-input-number v-model="form.style.padding.bottom.val"
                                   @on-change="changePadding('bottom')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.bottom.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('bottom')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="左边距" :label-width="80">
                          <i-input-number v-model="form.style.padding.left.val"
                                   @on-change="changePadding('left')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.left.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('left')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>

                      <i-form-item label="边框">
                        <i-form-item label="上边框" :label-width="80">
                          <i-input-number v-model="form.style.borderTopWidth.val"
                                   @on-change="changeStyleWithUnit('borderTopWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderTopWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderTopWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderTopColor"
                                          @on-change="changeStyle('borderTopColor')"/>
                          <i-select v-model="form.style.borderTopStyle" style="width: 130px"
                                    @on-change="changeStyle('borderTopStyle')">
                            <i-option value="none">无边框</i-option>
                            <i-option value="solid">实线</i-option>
                            <i-option value="dashed">虚线</i-option>
                            <i-option value="double">双线</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="右边框" :label-width="80">
                          <i-input-number v-model="form.style.borderRightWidth.val"
                                   @on-change="changeStyleWithUnit('borderRightWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderRightWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderRightWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderRightColor"
                                          @on-change="changeStyle('borderRightColor')"/>
                          <i-select v-model="form.style.borderRightStyle" style="width: 130px"
                                    @on-change="changeStyle('borderRightStyle')">
                            <i-option value="none">无边框</i-option>
                            <i-option value="solid">实线</i-option>
                            <i-option value="dashed">虚线</i-option>
                            <i-option value="double">双线</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="下边框" :label-width="80">
                          <i-input-number v-model="form.style.borderBottomWidth.val"
                                   @on-change="changeStyleWithUnit('borderBottomWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderBottomWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderBottomWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderBottomColor"
                                          @on-change="changeStyle('borderBottomColor')"/>
                          <i-select v-model="form.style.borderBottomStyle"
                                    style="width: 130px"
                                    @on-change="changeStyle('borderBottomStyle')">
                            <i-option value="none">无边框</i-option>
                            <i-option value="solid">实线</i-option>
                            <i-option value="dashed">虚线</i-option>
                            <i-option value="double">双线</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="左边框" :label-width="80">
                          <i-input-number v-model="form.style.borderLeftWidth.val"
                                   @on-change="changeStyleWithUnit('borderLeftWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderLeftWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderLeftWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderLeftColor"
                                          @on-change="changeStyle('borderLeftColor')"/>
                          <i-select v-model="form.style.borderLeftStyle" style="width: 130px"
                                    @on-change="changeStyle('borderLeftStyle')">
                            <i-option value="none">无边框</i-option>
                            <i-option value="solid">实线</i-option>
                            <i-option value="dashed">虚线</i-option>
                            <i-option value="double">双线</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                  <i-panel name="2">
                    阴影
                    <p slot="content">
                      <i-form-item label="阴影">
                        <i-form-item label="水平位置" :label-width="80">
                          <i-input-number v-model="form.style.boxShadow.hShadow.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.hShadow.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="垂直位置">
                          <i-input-number v-model="form.style.boxShadow.vShadow.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.vShadow.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="模糊距离">
                          <i-input-number v-model="form.style.boxShadow.blur.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.blur.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item label="阴影尺寸">
                          <i-input-number v-model="form.style.boxShadow.spread.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.spread.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                        </i-form-item>

                        <i-form-item label="阴影颜色">
                          <i-color-picker v-model="form.style.boxShadow.color"
                                          @on-change="changeBoxShadow()"/>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                  <i-panel name="3">
                    背景
                    <p slot="content">
                      <i-form-item label="背景颜色">
                        <i-color-picker v-model="form.style.backgroundColor"
                                        @on-change="changeStyle('backgroundColor')"/>
                      </i-form-item>

                      <i-form-item label="背景渐进">
                        <i-input-number v-model="form.style.backgroundImage.direction"
                                 @on-change="changeBackgroundImage"></i-input-number>
                        <i-form-item label="背景颜色1" :label-width="80">
                          <i-input-number v-model="form.style.backgroundImage.color0.len.val"
                                   @on-change="changeBackgroundImage">
                          </i-input-number>
                          <i-select v-model="form.style.backgroundImage.color0.len.unit"
                                    style="width: 70px" @on-change="changeBackgroundImage">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.backgroundImage.color0.color"
                                          @on-change="changeBackgroundImage"/>
                        </i-form-item>
                        <i-form-item label="背景颜色2" :label-width="80">
                          <i-input-number v-model="form.style.backgroundImage.color1.len.val"
                                   @on-change="changeBackgroundImage">
                          </i-input-number>
                          <i-select v-model="form.style.backgroundImage.color1.len.unit"
                                    style="width: 70px" @on-change="changeBackgroundImage">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.backgroundImage.color1.color"
                                          @on-change="changeBackgroundImage"/>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                </i-collapse>
              </i-form>
            </div>
          </i-tab-pane>
          <i-tab-pane label="动画"></i-tab-pane>
          <i-tab-pane label="事件">
            <i-form class="form" :label-width="80" v-if="form.vnode">
              <i-form-item label="拖拽">
                <i-form-item label="是否开启" :label-width="80">
                  <i-checkbox v-model="form.class.draggable"
                              @on-change="changeClass('draggable')">开启
                  </i-checkbox>
                </i-form-item>
                <i-form-item label="目标区域" :label-width="80">
                  <i-checkbox v-model="form.class.dropzone" @on-change="changeClass('dropzone')">
                    开启
                  </i-checkbox>
                </i-form-item>
              </i-form-item>
            </i-form>
          </i-tab-pane>
        </i-tabs>
      </div>
      <div class="editable-panel panel-tree">
        <div class="editable-title">
          结构树
        </div>
        <div class="editable-content">
          <dom-tree :vnode="tree" @nodeclick="handleNodeClick" @exchangenode="handleExchangeNode"></dom-tree>
        </div>

      </div>
    </div>
    <i-modal class="insert-node-popup" v-model="insertNodePopup.isShow" :width="1000" :closable="false"
             :footer-hide="true">
      <i-form v-model="insertNodePopup.form" :label-width="80">
        <i-form-item label="节点类型" v-if="false">
          <i-radio-group v-model="insertNodePopup.form.type">
            <i-radio label="div">块级元素</i-radio>
            <i-radio label="span">内联元素</i-radio>
            <i-radio label="img">图片</i-radio>
          </i-radio-group>
        </i-form-item>
        <i-form-item label="上传图片" v-if="insertNodePopup.form.type === 'img'">
          <img class="img-preview" v-if="insertNodePopup.form.img" :src="insertNodePopup.form.img"/>

        </i-form-item>
        <i-form-item label="插入位置">
          <i-radio-group v-model="insertNodePopup.form.pos">
            <i-radio label="child">当前元素子级</i-radio>
            <i-radio label="prev" v-if="insertNodePopup.formVNode && insertNodePopup.formVNode.parentVNode">
              当前元素前面
            </i-radio>
            <i-radio label="next" v-if="insertNodePopup.formVNode && insertNodePopup.formVNode.parentVNode">
              当前元素后面
            </i-radio>
          </i-radio-group>
        </i-form-item>
      </i-form>
      <div class="insert-panel">
        <div class="insert-menu">
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'custom' }"
               @click="changeInsertPopupMenu('custom')">自定义
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'recently' }"
               @click="changeInsertPopupMenu('recently')">最近
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'words' }"
               @click="changeInsertPopupMenu('words')">文字
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'image' }"
               @click="changeInsertPopupMenu('image')">图片
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'button' }"
               @click="changeInsertPopupMenu('button')">按钮
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'icon' }"
               @click="changeInsertPopupMenu('icon')">图标
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'panel' }"
               @click="changeInsertPopupMenu('panel')">面板
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'layout' }"
               @click="changeInsertPopupMenu('layout')">布局
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'list' }"
               @click="changeInsertPopupMenu('list')">列表
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'table' }"
               @click="changeInsertPopupMenu('table')">表格
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'music' }"
               @click="changeInsertPopupMenu('music')">音乐
          </div>
        </div>
        <div class="insert-content">
          <template v-if="insertNodePopup.curMenu == 'custom'">
            <div @click="selectedInsertNode('panel', {}, {})">
              空白面板
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu == 'words'">
            <div style="font-weight: bold;" @click="selectedInsertNode('words', { fontWeight: 'bold' }, { 'children': ['我是标题-块级'] })">我是标题-块级</div>
            <div style="font-weight: bold;text-align: center;" @click="selectedInsertNode('words', { fontWeight: 'bold', textAlign: 'center' }, { 'children': ['我是标题-块级-居中'] })">我是标题-块级-居中</div>
            <div style="font-weight: bold;text-align: right;" @click="selectedInsertNode('words', { fontWeight: 'bold', textAlign: 'right' }, { 'children': ['我是标题-块级-居右'] })">我是标题-块级-居右</div>
            <div style="font-weight: bold;" @click="selectedInsertNode('words', { display: 'inline', fontWeight: 'bold' }, { 'children': ['我是标题-内联'] })">我是标题-内联
            </div>
            <div @click="selectedInsertNode('words', {}, { 'children': ['我是内容-块级'] })">我是内容-块级</div>
            <div style="text-align: center;" @click="selectedInsertNode('words', { textAlign: 'center' }, { 'children': ['我是内容-块级-居中'] })">我是内容-块级-居中</div>
            <div style="text-align: right;" @click="selectedInsertNode('words', { textAlign: 'right' }, { 'children': ['我是内容-块级-居右'] })">我是内容-块级-居右</div>
            <div @click="selectedInsertNode('words', { display: 'inline' }, { 'children': ['我是标题-内联'] })">我是内容-内联</div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'image'">
            <i-upload ref="nodeUploadBtn" action="https://wx.huiyou.lht.ren/h5/upload-img" accept="image/*"
                      :on-success="uploadNodeImgSuccess" data-type="node">
              <i-button icon="ios-cloud-upload-outline">上传图片</i-button>
            </i-upload>
          </template>
          <template v-if="insertNodePopup.curMenu === 'layout'">
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">两列</div>
              <div style="flex: 1;">两列</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">三列</div>
              <div style="flex: 1;">三列</div>
              <div style="flex: 1;">三列</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">四列</div>
              <div style="flex: 1;">四列</div>
              <div style="flex: 1;">四列</div>
              <div style="flex: 1;">四列</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">五列</div>
              <div style="flex: 1;">五列</div>
              <div style="flex: 1;">五列</div>
              <div style="flex: 1;">五列</div>
              <div style="flex: 1;">五列</div>
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'list'">
            <div class="content-item canclick" @click="selectDomStructure('list', $event)">
              <div style="position: relative;border: solid 1px #000;border-radius: .8rem;width: .6rem;display: inline-block;height: .6rem;background-color: transparent;flex-shrink: 0;margin-right: .5rem;"></div>
              列表前面有一个圆圈</div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'panel'">
            <div class="content-item" style="width: 100%;background-color: #fff;border-radius: 4px;box-shadow: 0rem 0.5rem 0.5rem 0.5px #7C7CF5;padding: .5rem 1rem;min-height: 5rem;" @click="selectDomStructure('panel', $event)">
            </div>
          </template>
        </div>
      </div>
    </i-modal>

    <i-modal v-model="preferences.isShowModal" title="首选项" :footer-hide="true">
      <i-form>
        <i-form-item label="背景色">
        </i-form-item>
      </i-form>
    </i-modal>
  </div>

</template>

<script>
  import {httpGetH5Data} from '../../http/h5';
  import {initDragger} from '../../utils/drag';
  import $ from 'jquery';

  export default {
    name: "canvas.vue",
    components: {
      RenderedHtml: {
        props: ['vnode', 'previewWindowHandler'],
        render(createElement) {
          if (this.previewWindowHandler) {
            this.previewWindowHandler.vnode = this.vnode;
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
      DomTree: {
        props: {
          vnode: Object,
        },
        data () {
          return {
            copiedData: undefined,
          };
        },
        render(createElement) {
          const renderData = this.generateDomTreeObj(this.vnode, createElement);
          return renderData;
        },
        methods: {
          generateDomTreeObj(vnodeObj, createElement) {
            const $this = this;
            const children = [];
            const curChildren = ['节点：' + vnodeObj.tag];
            if (vnodeObj.parentVNode) {
              curChildren.push(createElement('a', {
                style: {
                  marginLeft: '10px',
                },
                on: {
                  click (e) {
                    e.stopPropagation();
                    $this.copiedData = vnodeObj;
                  },
                }
              }, [
                '复制'
              ]));

              if (this.copiedData && this.copiedData !== vnodeObj) {
                curChildren.push(createElement('a', {
                  style: {
                    marginLeft: '10px',
                  },
                  on: {
                    click (e) {
                      e.stopPropagation();
                      $this.$emit('exchangenode', $this.copiedData,vnodeObj);
                      $this.copiedData = null;
                    },
                  }
                }, [
                  '粘贴'
                ]));
              }
            }

            children.push(createElement('div', {
              class: {
                domtreenode: true,
                curselected: vnodeObj.class && vnodeObj.class.curselected,
              }
            }, curChildren));
            vnodeObj.children && vnodeObj.children.forEach((elem) => {
              if (typeof elem === 'string') {
              } else {
                children.push($this.generateDomTreeObj(elem, createElement));
              }
            });

            return createElement('div', {
              on: {
                click(e) {
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
    props: {
      id: String,
    },
    data() {
      return {
        preferences: {
          isShowModal: false,
          setting: {
            fontSize: '14px',
            fontUnit: 'px',
            color: null,
            backgroundColor: {},
          }
        },
        previewWindowHandler: undefined,
        selectedRect: {
          isShow: false,
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        },
        insertNodePopup: {
          isShow: false,
          formVNode: undefined,
          curMenu: 'custom',
          style: {},
          form: {
            pos: 'child',
            type: 'div',
            img: '',
          },
        },
        isShow: true,
        resolutionX: 375,
        form: {
          kwd: '',
          parentVNode: undefined,
          vnode: undefined,
          attrs: {
            src: '',
          },
          class: {
            draggable: false,
            dropzone: false,
          },
          style: {
            width: {
              val: null,
              unit: '%',
            },
            height: {
              val: null,
              unit: '%',
            },
            display: '',
            flexGrow: null,
            flexShrink: null,
            flexBasis: {
              val: null,
              unit: 'rem',
            },
            justifyContent: null,
            flexWrap: null,
            alignItems: null,
            position: 'static',
            top: {
              val: null,
              unit: 'rem',
            },
            bottom: {
              val: null,
              unit: 'rem',
            },
            left: {
              val: null,
              unit: 'rem',
            },
            right: {
              val: null,
              unit: 'rem',
            },
            margin: {
              top: {
                val:  null,
                unit: 'rem',
              },
              bottom: {
                val: null,
                unit: 'rem',
              },
              left: {
                val: null,
                unit: 'rem',
              },
              right: {
                val: null,
                unit: 'rem',
              },
            },
            padding: {
              top: {
                val: null,
                unit: 'rem',
              },
              bottom: {
                val: null,
                unit: 'rem',
              },
              left: {
                val: null,
                unit: 'rem',
              },
              right: {
                val: null,
                unit: 'rem',
              },
            },
            borderTopWidth: {
              val: '0',
              unit: 'px',
            },
            borderTopColor: "",
            borderTopStyle: null,
            borderBottomWidth: {
              val: '0',
              unit: 'px',
            },
            borderBottomColor: "",
            borderBottomStyle: null,
            borderLeftWidth: {
              val: '0',
              unit: 'px',
            },
            borderLeftColor: "",
            borderLeftStyle: null,
            borderRightWidth: {
              val: '0',
              unit: 'px',
            },
            borderRightColor: "",
            borderRightStyle: null,
            color: '#000',
            fontSize: {
              val: null,
              unit: 'rem',
            },
            letterSpacing: {
              val: null,
              unit: 'rem',
            },
            borderRadius: {
              val: null,
              unit: 'px',
            },
            lineHeight: {
              val: null,
              unit: 'rem',
            },
            textAlign: null,
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
              color: ''
            },
          },
          textList: [],
        },
        tree: {
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
      }
    },
    created() {
      if (this.id) {

        httpGetH5Data(this.id).then((res) => {
          function iteratorSetParentVNode (curNode, parentVNode) {
            curNode.parentVNode = parentVNode;
            curNode.children.forEach((item) => {
              if (typeof item === 'object' && item !== null) {
                iteratorSetParentVNode(item, curNode);
              }

            });
          }
          const tree = JSON.parse(res.data.data.data);
          iteratorSetParentVNode(tree, null);
          this.tree = tree;
          this.$nextTick(() => {
            document.querySelector(".domtreenode.curselected").click()
            document.querySelector(".domtreenode.curselected").click();
          });
        });
      } else {
        this.tree = this.generateVNodeData(undefined, 'div');
      }

    },
    mounted() {
      const $this = this;
      this.$root.$on('reqTreeNodeData', () => {
        $this.$root.$emit('resTreeNodeData', $this.tree);
      });
    },
    methods: {
      transToAnotherPage() {
        this.previewWindowHandler = window.open('/preview.html', '_blank');
        this.previewWindowHandler.vnode = this.tree;
      },
      selectDomStructure (type, e) {
        let $root = $(e.target);
        if (!$root.hasClass("content-item")) {
          $root = $root.closest(".content-item");
        }
        const target = $root.get(0);

        const nodes = target.childNodes;
        const data = {
          children: [],
          style: this.domStyleToVNodeStyleObj(target.getAttribute('style')),
        };

        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].nodeType == 3) {
            data.children.push(nodes[i].nodeValue);
          } else if (nodes[i].nodeType == 1) {
            const children = [];
            if (nodes[i].childNodes.length > 0) {
              for (let j = 0; j < nodes[i].childNodes.length; j++) {
                const curNode = nodes[i].childNodes[j];
                if (curNode.nodeType == 3) {
                  children.push(curNode.nodeValue);
                } else {
                  children.push({
                    style: this.domStyleToVNodeStyleObj(curNode.getAttribute('style')),
                  });
                }
              }
            }

            data.children.push({
              style: this.domStyleToVNodeStyleObj(nodes[i].getAttribute('style')),
              children: children,
            });
          }
        }

        this.submitInsertNodePopup(data);
      },
      domStyleToVNodeStyleObj (styleStr) {
        const styleObj = {};
        const styleArr = styleStr.split(';');

        styleArr.forEach((style) => {
          const stylePair = style.split(':');
          stylePair[0] = stylePair[0].trim();
          if (typeof stylePair[1] == 'string') {
            stylePair[1] = stylePair[1].trim();
          }
          const key = this.strToCamel(stylePair[0]).trim();
          if (key.startsWith('border') && key !== 'borderRadius') {
            const valArr = stylePair[1].split(' ');
            if (key === 'border' || key === 'borderTop') {
              styleObj.borderTopStyle = valArr[1];
              styleObj.borderTopWidth = valArr[0];
              styleObj.borderTopColor = valArr[2] + valArr[3] + valArr[4];
            }
            if (key === 'border' || key === 'borderLeft') {
              styleObj.borderLeftStyle = valArr[1];
              styleObj.borderLeftWidth = valArr[0];
              styleObj.borderLeftColor = valArr[2] + valArr[3] + valArr[4];
            }

            if (key === 'border' || key === 'borderBottom') {
              styleObj.borderBottomStyle = valArr[1];
              styleObj.borderBottomWidth = valArr[0];
              styleObj.borderBottomColor = valArr[2] + valArr[3] + valArr[4];
            }

            if (key === 'border' || key === 'borderRight') {
              styleObj.borderRightStyle = valArr[1];
              styleObj.borderRightWidth = valArr[0];
              styleObj.borderRightColor = valArr[2] + valArr[3] + valArr[4];
            }
          } else if (key === 'flex' && stylePair[1].split(' ').length === 3) {
            const valArr = stylePair[1].split(' ');
            styleObj.flexGrow = valArr[0];
            styleObj.flexShrink = valArr[1];
            styleObj.flexBasis = valArr[2];
          } else {
            styleObj[key] = stylePair[1];
          }
        });

        return styleObj;
      },
      strToCamel (str) {
        return str.replace(/([^-])(?:-+([^-]))/g, (_,p1, p2)=>p1+p2.toUpperCase());
      },
      selectedInsertNode(type, style, attr) {
        const data = {
          style,
          children: [],
        };

        if (type == 'image') {
          this.insertNodePopup.form.type = 'img';
          data.src = attr.src;
        }
        if (attr.children && attr.children.length > 0) {
          data.children = attr.children;
        }
        this.submitInsertNodePopup(data);
      },
      changeInsertPopupMenu(type) {
        this.insertNodePopup.curMenu = type;
      },
      submitInsertNodePopup(data) {
        if (!data) {
          data = {};
        }

        if (this.insertNodePopup.form.type === 'img') {
          data.src = data.src;
        }
        if (this.insertNodePopup.form.pos === 'child') {
          this.addPanel(this.insertNodePopup.formVNode, this.insertNodePopup.form.type, data);
        } else {
          data.pos = this.insertNodePopup.form.pos;
          data.curVNode = this.insertNodePopup.formVNode;
          this.addPanel(this.insertNodePopup.formVNode.parentVNode, this.insertNodePopup.form.type, data);
        }
        this.$nextTick(() => {
          $(".curselected").length > 0 && this.switchSelectedRect($(".curselected").get(0), 'show');
        });
        this.insertNodePopup.isShow = false;
      },
      showInsertNodePopup(formVNode) {
        this.insertNodePopup.curMenu = 'custom';
        this.insertNodePopup.isShow = true;
        this.insertNodePopup.formVNode = formVNode;
        this.insertNodePopup.form.pos = 'child';
        this.insertNodePopup.form.type = 'div';
        this.insertNodePopup.form.img = '';
      },
      parseVNodeToFormFuncDic() {
        return {
          handleValWithUnit(formData, formKey, data, dataKey) {
            if (typeof data[dataKey] === 'string' && data[dataKey] !== '') {
              formData[formKey].val = Number(data[dataKey].match(/^[-0-9.]+/)[0]);
              formData[formKey].unit = data[dataKey].match(/\D+$/)[0];
            } else {
              formData[formKey].val = data[dataKey] == '' ? null : data[dataKey];
            }
          },
        }
      },
      switchSelectedRect(dom, type) {
        if (!type) {
          type = this.selectedRect.isShow ? 'hide' : 'show';
        }

        if (type == 'show') {
          const $dom = $(dom), panelOffset = $("#renderedHtml").offset(), offset = $dom.offset()
          this.selectedRect = {
            isShow: true,
            top: offset.top - panelOffset.top,
            left: offset.left - panelOffset.left,
            width: $dom.width(),
            height: $dom.height(),
          }
        } else {
          this.selectedRect.isShow = false;
        }
      },
      handleExchangeNode (originVNode, targetVNode) {
        const vnode = this.generateVNodeData(targetVNode.parentVNode, originVNode.tag, originVNode);
        const index = targetVNode.parentVNode.children.indexOf(targetVNode);
        targetVNode.parentVNode.children.splice(index, 1, vnode);
      },
      handleNodeClick(curNode) {
        if (typeof this.form.vnode === 'object' && curNode !== this.form.vnode) {
          this.form.vnode.class.curselected = false;
        }

        curNode.class.curselected = !curNode.class.curselected;
        if (curNode.class.curselected) {
          this.form.textList = [];
          this.form.vnode = curNode;
          this.form.parentVNode = curNode.parentVNode;
          const handler = this.parseVNodeToFormFuncDic();
          Object.keys(this.form.style).forEach((key) => {
            if (key === 'margin' || key === 'padding') {
              Object.keys(this.form.style[key]).forEach((mpkey) => {
                handler.handleValWithUnit(this.form.style[key], mpkey, curNode.style, key + mpkey.replace(mpkey[0], mpkey[0].toUpperCase()))
              });
            }

            if (key === 'boxShadow') {
              if (curNode.style.boxShadow) {
                const dataArr = curNode.style.boxShadow.split(" ")
                let offset = dataArr.length - 4;

                handler.handleValWithUnit(this.form.style[key], 'hShadow', {data: dataArr[offset]}, 'data')
                handler.handleValWithUnit(this.form.style[key], 'vShadow', {data: dataArr[offset + 1]}, 'data')
                handler.handleValWithUnit(this.form.style[key], 'blur', {data: dataArr[offset + 2]}, 'data')
                handler.handleValWithUnit(this.form.style[key], 'spread', {data: dataArr[offset + 3]}, 'data')
                if (dataArr.length === 7) {
                  this.form.style[key].color = dataArr[0] + dataArr[1] + dataArr[2];
                } else {
                  this.form.style[key].color = dataArr[4];
                }

              } else {
                this.form.style[key].hShadow.val = null;
                this.form.style[key].vShadow.val = null;
                this.form.style[key].blur.val = null;
                this.form.style[key].spread.val = null;
                this.form.style[key].color = '';
              }
              return;
            }

            if (key === 'backgroundImage') {
              if (curNode.style[key] == null) {
                this.form.style[key].direction = null;
                this.form.style[key].color0.len.val = null;
                this.form.style[key].color0.color = '';
                this.form.style[key].color1.len.val = null;
                this.form.style[key].color1.color = '';
              } else {
                const itemArr = curNode.style[key].replace("linear-gradient(", "").replace(")", "").split(",");
                this.form.style[key].direction = Number.parseFloat(itemArr[0]);
                const color0Arr = itemArr[1].split(" ");
                this.form.style[key].color0.len.val = color0Arr[1];
                this.form.style[key].color0.color = color0Arr[0];
                const color1Arr = itemArr[2].split(" ");
                this.form.style[key].color1.len.val = color1Arr[1];
                this.form.style[key].color1.color = color1Arr[0];
              }
              return;
            }

            if (typeof this.form.style[key] !== 'object' || this.form.style[key] == null) {
              this.form.style[key] = curNode.style[key];
            } else {
              if (this.form.style[key].unit !== undefined) {
                handler.handleValWithUnit(this.form.style, key, curNode.style, key)
              } else {

              }
            }

          });
          Object.keys(this.form.class).forEach((key) => {
            this.form.class[key] = curNode.class[key];
          });
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

        this.$nextTick(() => {
          if ($(".curselected").length > 0) {
            this.switchSelectedRect($('.curselected').get(0), 'show');
          } else {
            this.switchSelectedRect($('.curselected').get(0), 'hide');
          }
        })

      },
      uploadReplaceImgSuccess(res) {
        this.$refs.replaceUploadBtn.clearFiles();
        this.form.vnode.attrs.src = res.url;
      },
      uploadRootImgSuccess(res) {
        this.$refs.rootUploadBtn.clearFiles();
        this.addPanel(this.tree, 'img', {src: res.url});
      },
      uploadNodeImgSuccess(res) {
        this.$refs.nodeUploadBtn.clearFiles();
        this.selectedInsertNode('image', {}, {src: res.url});
      },
      changeBackgroundImage() {
        if (this.form.style.backgroundImage.direction === '' || this.form.style.backgroundImage.color0.color === '' || this.form.style.backgroundImage.color0.len.val === '' || this.form.style.backgroundImage.color1.color === '' || this.form.style.backgroundImage.color1.len.val === '') {
          this.form.vnode.style.backgroundImage = undefined;
          return;
        }
        this.form.vnode.style.backgroundImage = `linear-gradient(${this.form.style.backgroundImage.direction}deg,${this.form.style.backgroundImage.color0.color} ${this.form.style.backgroundImage.color0.len.val}${this.form.style.backgroundImage.color0.len.unit},${this.form.style.backgroundImage.color1.color} ${this.form.style.backgroundImage.color1.len.val}${this.form.style.backgroundImage.color1.len.unit})`;
      },
      changeBoxShadow() {
        this.form.vnode.style.boxShadow = `${this.form.style.boxShadow.hShadow.val}${this.form.style.boxShadow.hShadow.unit} ${this.form.style.boxShadow.vShadow.val}${this.form.style.boxShadow.vShadow.unit} ${this.form.style.boxShadow.blur.val}${this.form.style.boxShadow.blur.unit} ${this.form.style.boxShadow.spread.val}${this.form.style.boxShadow.spread.unit} ${this.form.style.boxShadow.color}`;
      },
      changeBorder(type) {
        this.form.vnode.style['border' + type.replace(type[0], type[0].toUpperCase())] = this.form.style.border[type].style + ' ' + this.form.style.border[type].width.val + this.form.style.border[type].width.unit + ' ' + this.form.style.border[type].color;
      },
      changeStyleWithUnit(type, defaultVal) {
        let val = 0;
        if (defaultVal !== undefined) {
          val = defaultVal;
        }
        if (this.form.style[type].val !== "" && this.form.style[type].val != null) {
          val = this.form.style[type].val + this.form.style[type].unit;
        }
        this.form.vnode.style[type] = val;
      },
      changeClass(type) {
        this.form.vnode.class[type] = this.form.class[type];
      },
      changeStyle(type) {
        this.form.vnode.style[type] = this.form.style[type];
      },
      changeMargin(direction) {
        let val = 0;
        if (this.form.style.margin[direction].val !== '') {
          val = this.form.style.margin[direction].val + this.form.style.margin[direction].unit;
        }
        this.form.vnode.style['margin' + direction.replace(direction[0], direction[0].toUpperCase())] = val;
      },
      changePadding(direction) {
        let val = 0;
        if (this.form.style.padding[direction].val !== '') {
          val = this.form.style.padding[direction].val + this.form.style.padding[direction].unit;
        }
        this.form.vnode.style['padding' + direction.replace(direction[0], direction[0].toUpperCase())] = val;
      },
      changePanelText(msg, index) {
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
      removePanel() {
        const $this = this;
        this.$Modal.confirm({
          title: '提示',
          content: '确认要删除此节点吗？',
          onOk() {
            $this.form.parentVNode.children.some((elem, index) => {
              if (elem === $this.form.vnode) {
                $this.$delete($this.form.parentVNode.children, index);
                return true;
              }
              return false;
            });
            $this.form.vnode = undefined;
            $this.form.parentVNode = undefined;
            $this.switchSelectedRect(undefined, 'hide');
          },
        });
      },
      generateVNodeData(parentVNode, tagName, data) {
        const $this = this;

        const style = {
          width: null,
          height: null,
          position: 'static',
          display: 'block',
          flexGrow: null,
          flexShrink: null,
          flexBasis: null,
          justifyContent: null,
          flexWrap: null,
          alignItems: null,
          top: '',
          bottom: '',
          left: '',
          right: '',
          marginLeft: null,
          marginRight: null,
          marginTop: null,
          marginBottom: null,
          paddingLeft: null,
          paddingRight: null,
          paddingTop: null,
          paddingBottom: null,
          borderLeftWidth: null,
          borderLeftColor: "",
          borderLeftStyle: null,
          borderRightWidth: null,
          borderRightColor: '',
          borderRightStyle: null,
          borderTopWidth: null,
          borderTopColor: "",
          borderTopStyle: null,
          borderBottomWidth: null,
          borderBottomColor: "",
          borderBottomStyle: null,
          color: '#000',
          fontSize: null,
          letterSpacing: null,
          borderRadius: null,
          lineHeight: null,
          textAlign: null,
          fontWeight: 'normal',
          backgroundColor: '',
          boxShadow: '',
          backgroundImage: null,
        }

        if (data && data.style) {
          Object.keys(data.style).forEach((key) => {
            style[key] = data.style[key];
          });
        }



        const curNode = {
          tag: tagName,
          parentVNode: parentVNode,
          class: {
            curselected: false,
            draggable: false,
            dropzone: false,
          },
          style,
          on: {
            click(e) {
              e.stopPropagation();
              $this.handleNodeClick(curNode);
            },
          },
          attrs: {},
          children: [],
        }

        if (data && data.children && data.children.length > 0) {
          data.children.forEach((elem) => {
            if (typeof elem === 'string') {
              curNode.children.push(elem);
            } else {
              curNode.children.push(this.generateVNodeData(curNode, 'div', elem));
            }
          });
        }

        if (tagName === 'img') {
          curNode.attrs = {
            src: data.src,
            width: '100%',
          }
          curNode.style.display = 'inline-block';
        }
        if (tagName === 'span') {
          curNode.style.display = 'inline';
        }
        return curNode;
      },
      addPanel(parentVNode, tagName, data) {
        const curNode = this.generateVNodeData(parentVNode, tagName, data);
        if (data && data.pos) {
          let curIndex = -1;
          parentVNode.children.forEach((elem, index) => {
            if (elem === data.curVNode) {
              curIndex = index;
            }
          });

          if (data.pos === 'next') {
            parentVNode.children.splice(curIndex + 1, 0, curNode);
          } else {
            parentVNode.children.splice(curIndex, 0, curNode);
          }
        } else {
          parentVNode.children.push(curNode);
        }

      },
    },
  }
</script>

<style scoped>
  .page-canvas {
    height: 100%;
  }

  .wrapper-canvas {
    width: 375px;
    height: calc(100% - 30px);
    border: solid 1px #ddd;
    overflow-y: auto;
    position: relative;
    background-color: #fff;
    margin: 10px auto auto auto;
  }

  .wrapper-canvas::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .wrapper-canvas::-webkit-scrollbar-thumb {
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

  .wrapper-canvas::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .main-container {
    display: flex;
    height: 100%;
  }

  .panel-canvas {
    flex: 1;
  }

  .panel-tree {
    width: 300px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .panel-setting {
    width: 400px;

  }

  .editable-panel {
    height: calc(100% - 30px);
    background-color: #fff;
    overflow-y: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: inset 0 0 2px rgba(6, 6, 6, 0.2);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .editable-panel .editable-title {
    background-color: #515a6e;
    color: #fff;
    padding: .5rem 1rem;
  }

  .editable-panel .editable-title-opt {
    float: right;
  }

  .editable-panel .editable-title-opt-item {
    margin-left: 10px;
    cursor: pointer;
  }

  .editable-panel .editable-title-opt-item:hover {
    color: #2d8cf0;
  }

  .editable-panel .editable-content {
    padding: 1rem;
    height: calc(100% - 14px);
    overflow: auto;
  }

  .editable-panel .editable-content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .editable-panel .editable-content::-webkit-scrollbar-thumb {
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

  .editable-panel .editable-content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .insert-node-popup .btn-cancel {
    margin-left: 10px;
  }

  .insert-node-popup .form-item-opt {
    margin-top: 20px;
  }

  .insert-node-popup .img-preview {
    width: 200px;
  }

  .insert-node-popup .insert-panel {
    display: flex;
  }

  .insert-node-popup .insert-menu {
    width: 100px;
    background-color: #3899ec;
    color: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .insert-node-popup .insert-menu-item {
    padding: 7px 10px;
    cursor: pointer;
  }

  .insert-node-popup .insert-menu-item:hover, .insert-node-popup .insert-menu-item.selected {
    background: #2b73b1;
  }

  .insert-node-popup .insert-menu-item.selected {
    cursor: initial;
  }

  .insert-node-popup .insert-content {
    border: solid 1px #3899ec;
    flex: 1;
    padding: 5px 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }


  .panel-tree .editable-content {
    padding-left: 0;
  }

  .setting-search-panel {
    padding: .5rem;
    border-bottom: solid 1px #ddd;
  }

  #renderedHtml {
    position: relative;
  }

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
  .canclick {
    cursor: pointer;
  }
</style>
<style>
  .page-canvas .ivu-form-item .ivu-form-item .ivu-form-item-content {
    margin-left: 80px !important;
  }

  .page-canvas .domtreenode {
    margin-left: 10px;
  }

  .page-canvas .domtreenode.curselected {
    background-color: #ccc;
  }

  .page-canvas .setting-img-preview {
    width: 200px;
  }

  .insert-node-popup .ivu-form-item {
    margin-bottom: 0;
  }

  .panel-setting .ivu-tabs {
    height: calc(100% - 38px);
  }

  .panel-setting .ivu-tabs-content {
    height: inherit;
  }

  .panel-setting .ivu-collapse {
    margin-left: -16px;
    margin-right: -16px;
  }

</style>

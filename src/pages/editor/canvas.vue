<template>
  <div class="page-canvas">
    <div class="main-container">
      <div class="panel-canvas">
        <div class="wrapper-canvas editable-panel"
             :style="{ width: resolutionX == '' ? '375px' : resolutionX + 'px' }">
          <div class="editable-title">
            {{ $t('display') }}
            <div class="editable-title-opt">
              <span class="editable-title-opt-item" @click="preferences.isShowModal = true">{{ $t('preferences') }}</span>
              <span class="editable-title-opt-item" @click="showInsertNodePopup(tree)">{{ $t('add') }}</span>
              <span class="editable-title-opt-item" @click="insertPage()">{{ $t('page') }}</span>
              <span class="editable-title-opt-item" @click="transToAnotherPage">{{ $t('moreResolution') }}</span>
            </div>
          </div>
          <div id="renderedHtml">

            <iframe class="iframepreview" src="/iframepreview.html" @load="initIframePreview"></iframe>
          </div>
        </div>
      </div>
      <div class="editable-panel panel-setting">
        <div class="editable-title">
          {{ $t('setting') }}
          <div class="editable-title-opt">
                        <span class="editable-title-opt-item" v-if="form.vnode && form.vnode.parentVNode"
                              @click="removePanel">{{ $t('remove') }}</span>
            <span class="editable-title-opt-item" v-if="form.vnode && form.vnode.tag !== 'img'"
                  @click="showInsertNodePopup(form.vnode)">{{ $t('add') }}</span>
          </div>
        </div>
        <i-tabs>
          <i-tab-pane :label="$t('style')">
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

                <i-form-item :label="$t('width')">
                  <i-input-number v-model="form.style.width.val"
                           @on-change="changeStyleWithUnit('width')">
                  </i-input-number>
                  <i-select v-model="form.style.width.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('width')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                    <i-option value="vw">vw</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('height')">
                  <i-input-number v-model="form.style.height.val"
                           @on-change="changeStyleWithUnit('height')">
                  </i-input-number>
                  <i-select v-model="form.style.height.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('height')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                    <i-option value="vw">vw</i-option>
                    <i-option value="vh">vh</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('display')">
                  <i-select v-model="form.style.display" style="width: 200px"
                            @on-change="changeStyle('display')">
                    <i-option value="none">{{ $t('hidden') }}</i-option>
                    <i-option value="block">{{ $t('block') }}</i-option>
                    <i-option value="inline-block">{{ $t('inlineBlock') }}</i-option>
                    <i-option value="inline">{{ $t('inline') }}</i-option>
                    <i-option value="flex">flex</i-option>
                  </i-select>
                </i-form-item>

                <template v-if="form.style.display === 'flex'">
                  <i-form-item :label="$t('grow')">
                    <i-input-number v-model="form.style.flexGrow"
                             @on-change="changeStyle('flexGrow', null)">
                    </i-input-number>
                  </i-form-item>

                  <i-form-item :label="$t('shrink')">
                    <i-input-number v-model="form.style.flexShrink"
                             @on-change="changeStyle('flexShrink', null)">
                    </i-input-number>
                  </i-form-item>

                  <i-form-item :label="$t('basis')">
                    <i-input-number v-model="form.style.flexBasis.val"
                             @on-change="changeStyleWithUnit('flexBasis')">
                    </i-input-number>
                    <i-select v-model="form.style.flexBasis.unit"
                              style="width: 70px"
                              @on-change="changeStyleWithUnit('flexBasis')">
                      <i-option value="rem">rem</i-option>
                      <i-option value="px">px</i-option>
                      <i-option value="%">%</i-option>
                      <i-option value="vw">vw</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item label="justify-content">
                    <i-select v-model="form.style.justifyContent" style="width: 200px"
                              @on-change="changeStyle('justifyContent')">
                      <i-option value="flex-start">flex-start</i-option>
                      <i-option value="flex-end">flex-end</i-option>
                      <i-option value="center">center</i-option>
                      <i-option value="space-between">space-between</i-option>
                      <i-option value="space-around">space-around</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item label="align-items">
                    <i-select v-model="form.style.alignItems" style="width: 200px"
                              @on-change="changeStyle('alignItems')">
                      <i-option value="flex-start">flex-start</i-option>
                      <i-option value="flex-end">flex-end</i-option>
                      <i-option value="center">center</i-option>
                      <i-option value="baseline">baseline</i-option>
                    </i-select>
                  </i-form-item>

                  <i-form-item :label="$t('isWrap')">
                    <i-select v-model="form.style.flexWrap" style="width: 200px"
                              @on-change="changeStyle('flexWrap')">
                      <i-option value="nowrap">{{ $t('noWrap') }}</i-option>
                      <i-option value="wrap">{{ $t('wrap') }}</i-option>
                    </i-select>
                  </i-form-item>
                </template>

                <i-form-item :label="$t('position')">
                  <i-select v-model="form.style.position" style="width: 200px"
                            @on-change="changeStyle('position')">
                    <i-option value="static">{{ $t('default') }}</i-option>
                    <i-option value="absolute">{{ $t('absolute') }}</i-option>
                    <i-option value="relative">{{ $t('relative') }}</i-option>
                  </i-select>
                  <template v-if="form.style.position !== 'static'">
                    <i-form-item :label="$t('top')" >
                      <i-input-number v-model="form.style.top.val"
                               @on-change="changeStyleWithUnit('top')">
                      </i-input-number>
                      <i-select v-model="form.style.top.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('top')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                        <i-option value="vw">vw</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item :label="$t('right')">
                      <i-input-number v-model="form.style.right.val"
                               @on-change="changeStyleWithUnit('right')">
                      </i-input-number>
                      <i-select v-model="form.style.right.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('right')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                        <i-option value="vw">vw</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item :label="$t('bottom')">
                      <i-input-number v-model="form.style.bottom.val"
                               @on-change="changeStyleWithUnit('bottom')">
                      </i-input-number>
                      <i-select v-model="form.style.bottom.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('bottom')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                        <i-option value="vw">vw</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item :label="$t('left')">
                      <i-input-number v-model="form.style.left.val"
                               @on-change="changeStyleWithUnit('left')">
                      </i-input-number>
                      <i-select v-model="form.style.left.unit"
                                style="width: 60px"
                                @on-change="changeStyleWithUnit('left')">
                        <i-option value="rem">rem</i-option>
                        <i-option value="px">px</i-option>
                        <i-option value="%">%</i-option>
                        <i-option value="vw">vw</i-option>
                      </i-select>
                    </i-form-item>
                  </template>
                </i-form-item>

                <i-form-item :label="$t('color')">
                  <i-color-picker v-model="form.style.color" @on-change="changeStyle('color')"/>
                </i-form-item>


                <i-form-item :label="$t('fontSize')">
                  <i-input-number v-model="form.style.fontSize.val"
                           @on-change="changeStyleWithUnit('fontSize')">
                  </i-input-number>
                  <i-select v-model="form.style.fontSize.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('fontSize')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                    <i-option value="vw">vw</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('letterSpacing')">
                  <i-input-number v-model="form.style.letterSpacing.val"
                           @on-change="changeStyleWithUnit('letterSpacing')">
                  </i-input-number>
                  <i-select v-model="form.style.letterSpacing.unit"
                            style="width: 70px" @on-change="changeStyleWithUnit('letterSpacing')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                    <i-option value="vw">vw</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('lineHeight')">
                  <i-input-number v-model="form.style.lineHeight.val"
                           @on-change="changeStyleWithUnit('lineHeight')">
                  </i-input-number>
                  <i-select v-model="form.style.lineHeight.unit" style="width: 70px"
                            @on-change="changeStyleWithUnit('lineHeight')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="vw">vw</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('borderRadius')">
                  <i-input-number v-model="form.style.borderRadius.val"
                           @on-change="changeStyleWithUnit('borderRadius')">

                  </i-input-number>
                  <i-select v-model="form.style.borderRadius.unit"
                            style="width: 70px" @on-change="changeStyleWithUnit('borderRadius')">
                    <i-option value="rem">rem</i-option>
                    <i-option value="px">px</i-option>
                    <i-option value="%">%</i-option>
                    <i-option value="vw">vw</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('align')">
                  <i-select v-model="form.style.textAlign" style="width: 200px" :placeholder="$t('placeSelect')"
                            @on-change="changeStyle('textAlign')">
                    <i-option value="left">{{ $t('left') }}</i-option>
                    <i-option value="center">{{ $t('center') }}</i-option>
                    <i-option value="right">{{ $t('right') }}</i-option>
                  </i-select>
                </i-form-item>

                <i-form-item :label="$t('fontWeight')">
                  <i-checkbox v-model="form.style.fontWeight" true-value="bold" false-value="normal"
                              @on-change="changeStyle('fontWeight')"></i-checkbox>
                </i-form-item>

                <i-collapse>
                  <i-panel name="1">
                    {{ $t('edge') }}
                    <p slot="content">
                      <i-form-item :label="$t('margin')">
                        <i-form-item :label="$t('top')" :label-width="80">
                          <i-input-number v-model="form.style.margin.top.val"
                                   @on-change="changeMargin('top')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.top.unit"
                                    style="width: 60px" @on-change="changeMargin('top')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('right')" :label-width="80">
                          <i-input-number v-model="form.style.margin.right.val"
                                   @on-change="changeMargin('right')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.right.unit"
                                    style="width: 60px"
                                    @on-change="changeMargin('right')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('bottom')" :label-width="80">
                          <i-input-number v-model="form.style.margin.bottom.val"
                                   @on-change="changeMargin('bottom')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.bottom.unit"
                                    style="width: 60px"
                                    @on-change="changeMargin('bottom')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('left')" :label-width="80">
                          <i-input-number v-model="form.style.margin.left.val"
                                   @on-change="changeMargin('left')">
                          </i-input-number>
                          <i-select v-model="form.style.margin.left.unit"
                                    style="width: 60px" @on-change="changeMargin('left')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>

                      <i-form-item :label="$t('padding')">
                        <i-form-item :label="$t('top')" :label-width="80">
                          <i-input-number v-model="form.style.padding.top.val"
                                   @on-change="changePadding('top')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.top.unit"
                                    style="width: 60px" @on-change="changePadding('top')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('right')" :label-width="80">
                          <i-input-number v-model="form.style.padding.right.val"
                                   @on-change="changePadding('right')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.right.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('right')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('bottom')" :label-width="80">
                          <i-input-number v-model="form.style.padding.bottom.val"
                                   @on-change="changePadding('bottom')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.bottom.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('bottom')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('left')" :label-width="80">
                          <i-input-number v-model="form.style.padding.left.val"
                                   @on-change="changePadding('left')">
                          </i-input-number>
                          <i-select v-model="form.style.padding.left.unit"
                                    style="width: 60px"
                                    @on-change="changePadding('left')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>

                      <i-form-item :label="$t('border')">
                        <i-form-item :label="$t('top')" :label-width="80">
                          <i-input-number v-model="form.style.borderTopWidth.val"
                                   @on-change="changeStyleWithUnit('borderTopWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderTopWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderTopWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderTopColor"
                                          @on-change="changeStyle('borderTopColor')"/>
                          <i-select v-model="form.style.borderTopStyle" style="width: 130px"
                                    @on-change="changeStyle('borderTopStyle')" :placeholder="$t('placeSelect')">
                            <i-option value="none">{{ $t('none') }}</i-option>
                            <i-option value="solid">{{ $t('solid') }}</i-option>
                            <i-option value="dashed">{{ $t('dashed') }}</i-option>
                            <i-option value="double">{{ $t('double') }}</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('right')" :label-width="80">
                          <i-input-number v-model="form.style.borderRightWidth.val"
                                   @on-change="changeStyleWithUnit('borderRightWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderRightWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderRightWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderRightColor"
                                          @on-change="changeStyle('borderRightColor')"/>
                          <i-select v-model="form.style.borderRightStyle" style="width: 130px"
                                    @on-change="changeStyle('borderRightStyle')" :placeholder="$t('placeSelect')">
                            <i-option value="none">{{ $t('none') }}</i-option>
                            <i-option value="solid">{{ $t('solid') }}</i-option>
                            <i-option value="dashed">{{ $t('dashed') }}</i-option>
                            <i-option value="double">{{ $t('double') }}</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('bottom')" :label-width="80">
                          <i-input-number v-model="form.style.borderBottomWidth.val"
                                   @on-change="changeStyleWithUnit('borderBottomWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderBottomWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderBottomWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderBottomColor"
                                          @on-change="changeStyle('borderBottomColor')"/>
                          <i-select v-model="form.style.borderBottomStyle"
                                    style="width: 130px"
                                    @on-change="changeStyle('borderBottomStyle')" :placeholder="$t('placeSelect')">
                            <i-option value="none">{{ $t('none') }}</i-option>
                            <i-option value="solid">{{ $t('solid') }}</i-option>
                            <i-option value="dashed">{{ $t('dashed') }}</i-option>
                            <i-option value="double">{{ $t('double') }}</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('left')" :label-width="80">
                          <i-input-number v-model="form.style.borderLeftWidth.val"
                                   @on-change="changeStyleWithUnit('borderLeftWidth')">
                          </i-input-number>
                          <i-select v-model="form.style.borderLeftWidth.unit"
                                    style="width: 70px"
                                    @on-change="changeStyleWithUnit('borderLeftWidth')">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.borderLeftColor"
                                          @on-change="changeStyle('borderLeftColor')"/>
                          <i-select v-model="form.style.borderLeftStyle" style="width: 130px"
                                    @on-change="changeStyle('borderLeftStyle')" :placeholder="$t('placeSelect')">
                            <i-option value="none">{{ $t('none') }}</i-option>
                            <i-option value="solid">{{ $t('solid') }}</i-option>
                            <i-option value="dashed">{{ $t('dashed') }}</i-option>
                            <i-option value="double">{{ $t('double') }}</i-option>
                          </i-select>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                  <i-panel name="2">
                    {{ $t('shadow') }}
                    <p slot="content">
                      <i-form-item :label="$t('shadow')">
                        <i-form-item :label="$t('horizontal')" :label-width="80">
                          <i-input-number v-model="form.style.boxShadow.hShadow.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.hShadow.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('vertical')">
                          <i-input-number v-model="form.style.boxShadow.vShadow.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.vShadow.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('blur')">
                          <i-input-number v-model="form.style.boxShadow.blur.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.blur.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>
                        <i-form-item :label="$t('size')">
                          <i-input-number v-model="form.style.boxShadow.spread.val"
                                   @on-change="changeBoxShadow()">
                          </i-input-number>
                          <i-select v-model="form.style.boxShadow.spread.unit"
                                    style="width: 70px" @on-change="changeBoxShadow()">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                        </i-form-item>

                        <i-form-item :label="$t('color')">
                          <i-color-picker v-model="form.style.boxShadow.color"
                                          @on-change="changeBoxShadow()"/>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                  <i-panel name="3">
                    {{ $t('background') }}
                    <p slot="content">
                      <i-form-item :label="$t('backgroundType')">
                        <i-radio-group v-model="form.style.background.type" @on-change="changeBackground">
                          <i-radio label="color">
                            {{ $t('color') }}
                          </i-radio>
                          <i-radio label="image">{{ $t('image') }}</i-radio>
                          <i-radio label="gradients">{{ $t('gradients') }}</i-radio>
                        </i-radio-group>
                      </i-form-item>
                      <i-form-item :label="$t('backgroundColor')" v-if="form.style.background.type == 'color'">
                        <i-color-picker v-model="form.style.background.color"
                                        @on-change="changeBackground"/>
                      </i-form-item>

                      <i-form-item :label="$t('image')" v-if="form.style.background.type == 'image'">
                        <i-upload ref="backgroundImageUploadBtn" action="https://wx.huiyou.lht.ren/h5/upload-img" accept="image/*"
                                  :on-success="backgroundImageUploadSuccess">
                          <i-button icon="ios-cloud-upload-outline">{{ $t('uploadImage') }}</i-button>
                        </i-upload>
                        <div v-if="form.style.background.image">
                          <img :src="form.style.background.image" style="width: 50%">
                        </div>
                      </i-form-item>
                      <i-form-item :label="$t('gradients')" v-if="form.style.background.type == 'gradients'">
                        <i-input-number v-model="form.style.background.gradients.direction"
                                 @on-change="changeBackground"></i-input-number>
                        <i-form-item :label="$t('backgroundColor') + '1'" :label-width="80">
                          <i-input-number v-model="form.style.background.gradients.color0.len.val"
                                   @on-change="changeBackground">
                          </i-input-number>
                          <i-select v-model="form.style.background.gradients.color0.len.unit"
                                    style="width: 70px" @on-change="changeBackground">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.background.gradients.color0.color"
                                          @on-change="changeBackground"/>
                        </i-form-item>
                        <i-form-item :label="$t('backgroundColor') + '2'" :label-width="80">
                          <i-input-number v-model="form.style.background.gradients.color1.len.val"
                                   @on-change="changeBackground">
                          </i-input-number>
                          <i-select v-model="form.style.background.gradients.color1.len.unit"
                                    style="width: 70px" @on-change="changeBackground">
                            <i-option value="rem">rem</i-option>
                            <i-option value="px">px</i-option>
                            <i-option value="%">%</i-option>
                            <i-option value="vw">vw</i-option>
                          </i-select>
                          <i-color-picker v-model="form.style.background.gradients.color1.color"
                                          @on-change="changeBackground"/>
                        </i-form-item>
                      </i-form-item>
                    </p>
                  </i-panel>
                </i-collapse>
              </i-form>
            </div>
          </i-tab-pane>
          <i-tab-pane :label="$t('animation')">
            <i-form class="form" :label-width="80" v-if="form.vnode">
              <i-form-item  :label="$t('animation')">
                <i-checkbox v-model="form.style.animation.isShow" @on-change="changeAnimation">{{ $t('on') }}
                </i-checkbox>
              </i-form-item>
              <i-form-item :label="$t('type')" v-if="form.style.animation.isShow">
                <i-select v-model="form.style.animation.animationName" style="width: 70px" @on-change="changeAnimation">
                  <i-option value="bounce">bounce</i-option>
                  <i-option value="flash">flash</i-option>
                  <i-option value="pulse">pulse</i-option>
                  <i-option value="rubberBand">rubberBand</i-option>
                  <i-option value="shakeX">shakeX</i-option>
                  <i-option value="shakeY">shakeY</i-option>
                  <i-option value="headShake">headShake</i-option>
                  <i-option value="swing">swing</i-option>
                  <i-option value="tada">tada</i-option>
                  <i-option value="wobble">wobble</i-option>
                  <i-option value="jello">jello</i-option>
                  <i-option value="heartBeat">heartBeat</i-option>
                  <i-option value="backInDown">backInDown</i-option>
                  <i-option value="backInLeft">backInLeft</i-option>
                  <i-option value="backInRight">backInRight</i-option>
                  <i-option value="backInUp">backInUp</i-option>
                  <i-option value="backOutDown">backOutDown</i-option>
                  <i-option value="backOutLeft">backOutLeft</i-option>
                  <i-option value="backOutRight">backOutRight</i-option>
                  <i-option value="backOutUp">backOutUp</i-option>
                  <i-option value="bounceIn">bounceIn</i-option>
                  <i-option value="bounceInDown">bounceInDown</i-option>
                  <i-option value="bounceInLeft">bounceInLeft</i-option>
                  <i-option value="bounceInRight">bounceInRight</i-option>
                  <i-option value="bounceInUp">bounceInUp</i-option>
                  <i-option value="bounceOut">bounceOut</i-option>
                  <i-option value="bounceOutDown">bounceOutDown</i-option>
                  <i-option value="bounceOutLeft">bounceOutLeft</i-option>
                  <i-option value="bounceOutRight">bounceOutRight</i-option>
                  <i-option value="bounceOutUp">bounceOutUp</i-option>
                  <i-option value="fadeIn">fadeIn</i-option>
                  <i-option value="fadeInDown">fadeInDown</i-option>
                  <i-option value="fadeInDownBig">fadeInDownBig</i-option>
                  <i-option value="fadeInLeft">fadeInLeft</i-option>
                  <i-option value="fadeInLeftBig">fadeInLeftBig</i-option>
                  <i-option value="fadeInRight">fadeInRight</i-option>
                  <i-option value="fadeInUp">fadeInUp</i-option>
                  <i-option value="fadeInUpBig">fadeInUpBig</i-option>
                  <i-option value="fadeInTopLeft">fadeInTopLeft</i-option>
                  <i-option value="fadeInTopRight">fadeInTopRight</i-option>
                  <i-option value="fadeInBottomLeft">fadeInBottomLeft</i-option>
                  <i-option value="fadeInBottomRight">fadeInBottomRight</i-option>
                  <i-option value="fadeOut">fadeOut</i-option>
                  <i-option value="fadeOutDown">fadeOutDown</i-option>
                  <i-option value="fadeOutDownBig">fadeOutDownBig</i-option>
                  <i-option value="fadeOutLeft">fadeOutLeft</i-option>
                  <i-option value="fadeOutLeftBig">fadeOutLeftBig</i-option>
                  <i-option value="fadeOutRight">fadeOutRight</i-option>
                  <i-option value="fadeOutRightBig">fadeOutRightBig</i-option>
                  <i-option value="fadeOutUp">fadeOutUp</i-option>
                  <i-option value="fadeOutUpBig">fadeOutUpBig</i-option>
                  <i-option value="fadeOutTopLeft">fadeOutTopLeft</i-option>
                  <i-option value="fadeOutTopRight">fadeOutTopRight</i-option>
                  <i-option value="fadeOutBottomRight">fadeOutBottomRight</i-option>
                  <i-option value="fadeOutBottomLeft">fadeOutBottomLeft</i-option>
                  <i-option value="flip">flip</i-option>
                  <i-option value="flipInX">flipInX</i-option>
                  <i-option value="flipInY">flipInY</i-option>
                  <i-option value="flipOutX">flipOutX</i-option>
                  <i-option value="flipOutY">flipOutY</i-option>
                  <i-option value="lightSpeedInRight">lightSpeedInRight</i-option>
                  <i-option value="lightSpeedInLeft">lightSpeedInLeft</i-option>
                  <i-option value="lightSpeedOutRight">lightSpeedOutRight</i-option>
                  <i-option value="lightSpeedOutLeft">lightSpeedOutLeft</i-option>
                  <i-option value="rotate">rotate</i-option>
                  <i-option value="rotateIn">rotateIn</i-option>
                  <i-option value="rotateInDownLeft">rotateInDownLeft</i-option>
                  <i-option value="rotateInDownRight">rotateInDownRight</i-option>
                  <i-option value="rotateInUpLeft">rotateInUpLeft</i-option>
                  <i-option value="rotateInUpRight">rotateInUpRight</i-option>
                  <i-option value="rotateOut">rotateOut</i-option>
                  <i-option value="rotateOutDownLeft">rotateOutDownLeft</i-option>
                  <i-option value="rotateOutDownRight">rotateOutDownRight</i-option>
                  <i-option value="rotateOutUpLeft">rotateOutUpLeft</i-option>
                  <i-option value="rotateOutUpRight">rotateOutUpRight</i-option>
                  <i-option value="hinge">hinge</i-option>
                  <i-option value="jackInTheBox">jackInTheBox</i-option>
                  <i-option value="rollIn">rollIn</i-option>
                  <i-option value="rollOut">rollOut</i-option>
                  <i-option value="zoomIn">zoomIn</i-option>
                  <i-option value="zoomInDown">zoomInDown</i-option>
                  <i-option value="zoomInLeft">zoomInLeft</i-option>
                  <i-option value="zoomInRight">zoomInRight</i-option>
                  <i-option value="zoomInUp">zoomInUp</i-option>
                  <i-option value="zoomOut">zoomOut</i-option>
                  <i-option value="zoomOutDown">zoomOutDown</i-option>
                  <i-option value="zoomOutLeft">zoomOutLeft</i-option>
                  <i-option value="zoomOutRight">zoomOutRight</i-option>
                  <i-option value="zoomOutUp">zoomOutUp</i-option>
                  <i-option value="slideInDown">slideInDown</i-option>
                  <i-option value="slideInLeft">slideInLeft</i-option>
                  <i-option value="slideInRight">slideInRight</i-option>
                  <i-option value="slideInUp">slideInUp</i-option>
                  <i-option value="slideOutDown">slideOutDown</i-option>
                  <i-option value="slideOutLeft">slideOutLeft</i-option>
                  <i-option value="slideOutRight">slideOutRight</i-option>
                  <i-option value="slideOutUp">slideOutUp</i-option>
                </i-select>
              </i-form-item>
              <i-form-item :label="$t('delay')" v-if="form.style.animation.isShow">
                <i-input-number v-model="form.style.animation.animationDelay"  @on-change="changeAnimation">
                </i-input-number>
              </i-form-item>
              <i-form-item :label="$t('iteration')" v-if="form.style.animation.isShow">
                <i-checkbox v-model="form.style.animation.animationIterationCount" @on-change="changeAnimation">{{ $t('infinite') }}
                </i-checkbox>
              </i-form-item>
              <i-form-item :label="$t('timingFunction')" v-if="form.style.animation.isShow">
                <i-checkbox v-model="form.style.animation.animationTimingFunction" @on-change="changeAnimation">{{ $t('infinite') }}
                </i-checkbox>
              </i-form-item>
            </i-form>
          </i-tab-pane>
          <i-tab-pane :label="$t('event')">
            <i-form class="form" :label-width="80" v-if="form.vnode">
              <i-form-item :label="$t('drag')">
                <i-form-item :label="$t('status')" :label-width="80">
                  <i-checkbox v-model="form.class.draggable"
                              @on-change="changeClass('draggable')">{{ $t('on') }}
                  </i-checkbox>
                </i-form-item>
                <i-form-item :label="$t('targetArea')" :label-width="80">
                  <i-checkbox v-model="form.class.dropzone" @on-change="changeClass('dropzone')">
                    {{ $t('on') }}
                  </i-checkbox>
                </i-form-item>
                <i-form-item v-if="form.class.dropzone" :label="$t('backgroundColor')">
                  <i-color-picker v-model="form.vnode.event.targetArea.backgroundColor"/>
                </i-form-item>
                <i-form-item :label="$t('tapTarget')" :label-width="80">
                  <i-checkbox v-model="form.class.taptarget" @on-change="changeClass('taptarget')">
                    {{ $t('on') }}
                  </i-checkbox>
                </i-form-item>
                <i-form-item v-if="form.class.taptarget" :label="$t('backgroundColor')">
                  <i-color-picker v-model="form.vnode.event.tapTarget.backgroundColor"/>
                </i-form-item>
              </i-form-item>
              <i-form-item :label="$t('click')">
                <i-form-item :label="$t('status')" :label-width="80">
                  <i-checkbox v-model="form.class.clickable"
                              @on-change="changeClass('clickable')">{{ $t('on') }}
                  </i-checkbox>
                  <a href="javascript:void(0)" v-if="form.class.clickable" @click="addActionListStep(form.vnode.event.clickable.actionList)">{{ $t('addStep') }}</a>
                  <a href="javascript:void(0)" v-if="form.class.clickable" @click="addValidateStep(form.vnode.event.clickable.validate)">{{ $t('addValidate') }}</a>
                </i-form-item>
                <template v-if="form.class.clickable">
                  <div>校验</div>
                  <div v-for="(item, index) in form.vnode.event.clickable.validate">
                    <i-form-item :label="$t('target')">
                      <i-select v-model="item.target" style="width: 180px">
                        <i-option v-for="item in getFormNicknameList(form.nickNameList)" :value="item.nickName">{{ item.nickName }}</i-option>
                      </i-select>
                      <a href="javascript:void(0)">{{ $t('remove') }}</a>
                    </i-form-item>
                    <i-form-item :label="$t('rule')">
                      <div v-for="(ruleItem, index) in item.rules">
                        <i-select v-model="item.rules[index]" style="width: 150px;">
                          <i-option v-for="optionRule in form.ruleList" :value="optionRule">{{ optionRule }}</i-option>
                        </i-select>
                        {{ item.rules[ruleItem] }}
                        <a href="javascript:void(0)" @click="removeValidateRule(index, item.rules)">{{ $t('remove') }}</a>
                      </div>
                      <a href="javascript:void(0)" @click="addValidateRule(item.rules)">{{ $t('add') }}</a>
                    </i-form-item>
                  </div>
                  <div>执行</div>
                  <div v-for="(item, index) in form.vnode.event.clickable.actionList">
                    <i-form-item :label="$t('target')">
                      <i-select v-model="item.target.nickName" style="width: 180px" @on-change="changeClickTargetTag(item.target)">
                        <i-option v-for="item in form.nickNameList" :value="item.nickName">{{ item.nickName }}</i-option>
                      </i-select>
                      <a v-if="index > 0" href="javascript:void(0)" @click="removeActionListStep(form.vnode.event.clickable.actionList, index)">{{ $t('remove') }}</a>
                    </i-form-item>
                    <i-form-item  :label="$t('display')">
                      <i-select style="width: 180px" v-model="item.target.display"
                                @on-change="changeStyle('display')">
                        <i-option value="none">{{ $t('hidden') }}</i-option>
                        <i-option value="block">{{ $t('block') }}</i-option>
                        <i-option value="inline-block">{{ $t('inlineBlock') }}</i-option>
                        <i-option value="inline">{{ $t('inline') }}</i-option>
                        <i-option value="flex">flex</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item :label="$t('play')" :label-width="80" v-if="item.target.tag === 'video' || item.target.tag === 'audio'">
                      <i-checkbox v-model="item.target.play">{{ $t('on') }}
                      </i-checkbox>
                    </i-form-item>
                    <i-form-item :label="$t('selected')" v-if="item.target.tag === 'input'">
                      <i-checkbox v-model="item.target.selected">{{ $t('on') }}</i-checkbox>
                    </i-form-item>
                  </div>
                </template>
              </i-form-item>
              <i-form-item :label="$t('playend')" v-if="form.vnode.tag === 'video'">
                <i-form-item :label="$t('status')" :label-width="80">
                  <i-checkbox v-model="form.class.playend"
                              @on-change="changeClass('playend')">{{ $t('on') }}
                  </i-checkbox>
                  <a href="javascript:void(0)" v-if="form.class.playend" @click="addActionListStep(form.vnode.event.playend.actionList)">{{ $t('add') }}</a>
                </i-form-item>
                <template v-if="form.class.playend">
                  <div v-for="(item, index) in form.vnode.event.playend.actionList">
                    <i-form-item :label="$t('target')">
                      <i-select v-model="item.target.nickName" style="width: 180px" @on-change="changeClickTargetTag(item.target)">
                        <i-option v-for="item in form.nickNameList" :value="item.nickName">{{ item.nickName }}</i-option>
                      </i-select>
                      <a v-if="index > 0" href="javascript:void(0)" @click="removeActionListStep(form.vnode.event.playend.actionList, index)">{{ $t('remove') }}</a>
                    </i-form-item>
                    <i-form-item  :label="$t('display')">
                      <i-select style="width: 180px" v-model="item.target.display"
                                @on-change="changeStyle('display')">
                        <i-option value="none">{{ $t('hidden') }}</i-option>
                        <i-option value="block">{{ $t('block') }}</i-option>
                        <i-option value="inline-block">{{ $t('inlineBlock') }}</i-option>
                        <i-option value="inline">{{ $t('inline') }}</i-option>
                        <i-option value="flex">flex</i-option>
                      </i-select>
                    </i-form-item>
                    <i-form-item :label="$t('play')" :label-width="80" v-if="item.target.tag === 'video' || item.target.tag === 'audio'">
                      <i-checkbox v-model="item.target.play">{{ $t('on') }}
                      </i-checkbox>
                    </i-form-item>
                  </div>
                </template>
              </i-form-item>
            </i-form>
          </i-tab-pane>
        </i-tabs>
      </div>
      <div class="editable-panel panel-tree">
        <div class="editable-title">
          {{ $t('structureTree') }}
        </div>
        <div class="editable-content">
          <dom-tree :vnode="tree" @nodeclick="handleNodeClick" @exchangenode="handleExchangeNode" @openrenamepopup="openRenamePopup"></dom-tree>
        </div>

      </div>
    </div>
    <i-modal class="insert-node-popup" v-model="insertNodePopup.isShow" :width="1000" :closable="false"
             :footer-hide="true">
      <i-form v-model="insertNodePopup.form" :label-width="80">
        <i-form-item :label="$t('uploadImage')" v-if="insertNodePopup.form.type === 'img'">
          <img class="img-preview" v-if="insertNodePopup.form.img" :src="insertNodePopup.form.img"/>

        </i-form-item>
        <i-form-item :label="$t('insertPosition')">
          <i-radio-group v-model="insertNodePopup.form.pos">
            <i-radio label="child">{{ $t('childElement') }}</i-radio>
            <i-radio label="prev" v-if="insertNodePopup.formVNode && insertNodePopup.formVNode.parentVNode">
              {{ $t('beforeElement') }}
            </i-radio>
            <i-radio label="next" v-if="insertNodePopup.formVNode && insertNodePopup.formVNode.parentVNode">
              {{ $t('afterElement') }}
            </i-radio>
          </i-radio-group>
        </i-form-item>
      </i-form>
      <div class="insert-panel">
        <div class="insert-menu">
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'custom' }"
               @click="changeInsertPopupMenu('custom')">{{ $t('custom') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'recently' }"
               @click="changeInsertPopupMenu('recently')">{{ $t('recent') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'words' }"
               @click="changeInsertPopupMenu('words')">{{ $t('words') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'image' }"
               @click="changeInsertPopupMenu('image')">{{ $t('image') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'button' }"
               @click="changeInsertPopupMenu('button')">{{ $t('button') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'icon' }"
               @click="changeInsertPopupMenu('icon')">{{ $t('icon') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'panel' }"
               @click="changeInsertPopupMenu('panel')">{{ $t('panel') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'layout' }"
               @click="changeInsertPopupMenu('layout')">{{ $t('layout') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'list' }"
               @click="changeInsertPopupMenu('list')">{{ $t('list') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'table' }"
               @click="changeInsertPopupMenu('table')">{{ $t('table') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'music' }"
               @click="changeInsertPopupMenu('music')">{{ $t('music') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'video' }"
               @click="changeInsertPopupMenu('video')">{{ $t('video') }}
          </div>
          <div class="insert-menu-item" :class="{ selected: insertNodePopup.curMenu == 'form' }"
               @click="changeInsertPopupMenu('form')">{{ $t('form') }}
          </div>
        </div>
        <div class="insert-content">
          <template v-if="insertNodePopup.curMenu == 'custom'">
            <div @click="selectedInsertNode('panel', {}, {})">
              {{ $t('blankPanel') }}
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu == 'words'">
            <div class="canclick content-item" style="font-weight: bold;" @click="selectDomStructure('words', $event)">{{ $t('iamtitle') }}-{{ $t('block') }}</div>
            <div class="canclick content-item" style="font-weight: bold;text-align: center;" @click="selectDomStructure('words', $event)">{{ $t('iamtitle') }}-{{ $t('block') }}-{{ $t('center') }}</div>

            <div class="canclick content-item" style="font-weight: bold;text-align: right;" @click="selectDomStructure('words', $event)">{{ $t('iamtitle') }}-{{ $t('block') }}-{{ $t('right') }}</div>
            <div class="canclick content-item" style="font-weight: bold; display: inline;" @click="selectDomStructure('words', $event)">{{ $t('iamtitle') }}-{{ 'inline' }}
            </div>
            <div class="canclick content-item" @click="selectDomStructure('words', $event)">{{ $t('iamcontent') }}-{{ $t('block') }}</div>
            <div class="canclick content-item" style="text-align: center;" @click="selectDomStructure('words', $event)">{{ $t('iamcontent') }}-{{ $t('block') }}-{{ $t('center') }}</div>
            <div class="canclick content-item" style="text-align: right;" @click="selectDomStructure('words', $event)">{{ $t('iamcontent') }}-{{ $t('block') }}-{{ $t('right') }}</div>
            <div class="canclick content-item" style="display: inline;" @click="selectDomStructure('words', $event)">{{ $t('iamcontent') }}-{{ 'inline' }}</div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'image'">
            <i-upload ref="nodeUploadBtn" action="https://wx.huiyou.lht.ren/h5/upload-img" accept="image/*"
                      :on-success="uploadNodeImgSuccess" data-type="node">
              <i-button icon="ios-cloud-upload-outline">{{ $t('uploadImage') }}</i-button>
            </i-upload>
            <i-upload ref="nodeUploadBtn" action="https://wx.huiyou.lht.ren/h5/upload-img" accept="image/*"
                      :on-success="uploadNodeBackgroundSuccess" data-type="node">
              <i-button icon="ios-cloud-upload-outline">{{ $t('uploadImage') }}</i-button>
            </i-upload>
          </template>
          <template v-if="insertNodePopup.curMenu === 'layout'">
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">{{ $t('columnNums', { num: 2 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 2 }) }}</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">{{ $t('columnNums', { num: 3 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 3 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 3 }) }}</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">{{ $t('columnNums', { num: 4 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 4 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 4 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 4 }) }}</div>
            </div>
            <div class="content-item canclick" style="display: flex;" @click="selectDomStructure('layout', $event)">
              <div style="flex: 1;">{{ $t('columnNums', { num: 5 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 5 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 5 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 5 }) }}</div>
              <div style="flex: 1;">{{ $t('columnNums', { num: 5 }) }}</div>
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'list'">
            <div class="content-item canclick" @click="selectDomStructure('list', $event)">
              <div style="position: relative;border: solid 1px #000;border-radius: .8rem;width: .6rem;display: inline-block;height: .6rem;background-color: transparent;flex-shrink: 0;margin-right: .5rem;"></div>
              {{ $t('listDefaultMsg') }}</div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'panel'">
            <div class="content-item" style="width: 100%;background-color: #fff;border-radius: 4px;box-shadow: 0rem 0.5rem 0.5rem 0.5px #7C7CF5;padding: .5rem 1rem;min-height: 5rem;" @click="selectDomStructure('panel', $event)">
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'music'">
            <div>
              <i-input search :enter-button="$t('submit')" :placeholder="$t('musicInputNotice')" @on-search="submitMusic"/>
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'video'">
            <div>
              <i-input search :enter-button="$t('submit')" :placeholder="$t('videoInputNotice')" @on-search="submitVideo"/>
            </div>
          </template>
          <template v-if="insertNodePopup.curMenu === 'form'">
            <input class="content-item canclick" @click="selectDomStructure('input', $event)"></input>
            <div class="content-item canclick" @click="selectDomStructure('radio', $event)">
              <img src="https://h5maker.oss-cn-zhangjiakou.aliyuncs.com/imgs/444bcb3a3fcf8389296c49467f27e1d6.png">
              <input type="radio" style="display: none;"></input>
            </div>
          </template>
        </div>
      </div>
    </i-modal>

    <i-modal v-model="preferences.isShowModal" :title="$t('preferences')" :footer-hide="true">
      <i-form>
        <i-form-item :label="$t('lengthUnit')">
          <i-select v-model="preferences.setting.unit" style="width: 100px" @on-change="resetFormDefaultValue">
            <i-option value="rem">rem</i-option>
            <i-option value="px">px</i-option>
            <i-option value="%">%</i-option>
            <i-option value="vw">vw</i-option>
          </i-select>
        </i-form-item>
      </i-form>
    </i-modal>

    <i-modal v-model="renamePopup.isShow" :title="$t('renamenode')"  :footer-hide="true">
      <i-form>
        <i-form-item :label="$t('originname')">
          {{ renamePopup.originName }}
        </i-form-item>
        <i-form-item :label="$t('newname')">
          <i-input v-model="renamePopup.vnode.nickName"></i-input>
        </i-form-item>
      </i-form>
    </i-modal>
  </div>

</template>

<script>
  import {httpGetH5Data} from '../../http/h5';
  import $ from 'jquery';
  import { generatorVNodeHandler, stringifyVNode} from "../../utils/vnode";

  export default {
    name: "canvas.vue",
    components: {
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
            const curChildren = [this.$t('node') + ': ' + vnodeObj.nickName];

            curChildren.push(createElement('a', {
              style: {
                marginLeft: '10px',
              },
              on: {
                click (e) {
                  e.stopPropagation();
                  $this.$emit('openrenamepopup', vnodeObj);
                },
              }
            }, [
              this.$t('rename')
            ]));

            if (vnodeObj.parentVNode) {
              curChildren.push(createElement('a', {
                style: {
                  marginLeft: '10px',
                },
                on: {
                  click (e) {
                    $this.copiedData = vnodeObj;
                    e.stopPropagation();
                  },
                }
              }, [
                this.$t('copy')
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
                  this.$t('paste')
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
        iframePreview: null,
        preferences: {
          isShowModal: false,
          setting: {
            unit: '%',
          }
        },
        previewWindowHandler: undefined,

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
            clickable: false,
            playend: false,
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
            background: {
              type: 'color',
              color: '',
              image: '',
              gradients: {
                direction: 0,
                color0: {
                  len: {
                    val: 0,
                    unit: 'rem',
                  },
                  color: '',
                },
                color1: {
                  len: {
                    val: 0,
                    unit: 'rem',
                  },
                  color: '',
                },
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
            animation: {
              isShow: false,
              animationName: '',
              animationDelay: null,
              animationIterationCount: null,
              animationTimingFunction: null,
            },
          },
          textList: [],
          nickNameList: [],
          ruleList: ['required'],
        },
        tree: {
          tag: 'div',
          title: '',
          nickName: 'root',
          attrs: {},
          style: {},
          class: {
            curselected: false,
          },
          children: [],
        },
        renamePopup: {
          isShow: false,
          originName: '',
          vnode: {},
        },
      }
    },
    created() {
      const $this = this;
      if (this.id) {
        httpGetH5Data(this.id).then((res) => {
          this.$store.commit('setTitle', res.data.data.title);
          function iteratorSetParentVNode (curNode, parentVNode) {
            curNode.parentVNode = parentVNode;
            curNode.on.click = function (e) {
              e.stopPropagation();
              $this.handleNodeClick(curNode);
            }

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
            if (document.querySelector(".domtreenode.curselected")) {
              document.querySelector(".domtreenode.curselected").click()
              document.querySelector(".domtreenode.curselected").click();
            }

          });
        });
      } else {
        this.tree = this.generateVNodeData(undefined, {
          nickName: 'root',
          style: {
            position: 'relative',
          }
        });
        this.insertPage();
      }
    },
    mounted() {
      const $this = this;
      this.$root.$on('reqTreeNodeData', () => {
        $this.$root.$emit('resTreeNodeData', $this.tree);
      });
    },
    watch: {
      tree: {
        handler () {
          if (this.iframePreview) {
            localStorage.setItem('vnodeForView', stringifyVNode(this.tree));
            this.iframePreview.vnode = this.tree;
          }

          if (this.previewWindowHandler) {
            this.previewWindowHandler.postMessage({
              type: 'vnode',
              data: stringifyVNode(this.tree),
            }, "*");
          }
        },
        deep: true,

      },
    },
    methods: {
      getFormNicknameList (list) {
        const formList = [];
        list.forEach((item) => {
          if (item.tagName === 'input') {
            formList.push(item);
          }
        });
        return formList;
      },
      removeValidateRule (index, list) {
        list.splice(index, 1);
      },
      addValidateRule (list) {
        list.push(this.form.ruleList[0]);
      },
      addValidateStep (list) {
        list.push(this.getValidateStepItem());
      },
      getValidateStepItem () {
        return {
          target: '',
          rules: [],
        }
      },
      changeClickTargetTag (target) {
        this.form.nickNameList.some((elem) => {
          if (elem.nickName === target.nickName) {
            target.tag = elem.tagName;
            return true;
          }
          return false;
        });
      },
      addActionListStep (list) {
        list.push(this.getEmptyActionListItem());
      },
      getEmptyActionListItem () {
        return {
          target: {
            tag: '',
            nickName: '',
            display: '',
            play: false,
            selected: null,
          },
        }
      },
      removeActionListStep (list, index) {
        list.splice(index, 1)
      },
      changeAnimation () {
        this.form.vnode.class.animate__animated = this.form.style.animation.isShow;
        this.form.vnode.style.animationName = this.form.style.animation.animationName;
        this.form.vnode.style.animationDelay = this.form.style.animation.animationDelay ? this.form.style.animation.animationDelay + 's' : null;
        this.form.vnode.style.animationIterationCount = this.form.style.animation.animationIterationCount ? 'infinite' : null;
        this.form.vnode.style.animationTimingFunction = this.form.style.animation.animationTimingFunction ? 'linear' : null;
      },
      resetFormDefaultValue () {
        const $this = this;
        iteratorSetting(this.form.style);
        function iteratorSetting (style) {
          Object.keys(style).forEach((key) => {
            if (typeof style[key] === 'object' && style[key] !== null) {
              iteratorSetting(style[key]);
            } else if (key === 'unit' && style.val == null) {
              style[key] = $this.preferences.setting.unit;
            }
          });
        }
      },
      initIframePreview () {
        this.iframePreview = $(".iframepreview").get(0).contentWindow;
//        console.log(stringifyVNode(this.tree));
        localStorage.setItem('vnodeForView', stringifyVNode(this.tree));
        this.iframePreview.vnode = this.tree;
      },
      transToAnotherPage() {
        this.previewWindowHandler = window.open('/preview.html', '_blank');
        this.previewWindowHandler.postMessage({
          type: 'vnode',
          data: stringifyVNode(this.tree),
        }, "*");
      },
      submitMusic (link) {
        const data = {
          nickName: 'audio-panel',
          style: {
            position: 'absolute',
            top: '.3rem',
            right: '.3rem',
          },
          children: [
            {
              nickName: 'img',
              tagName: 'img',
              attrs: {
                src: 'http://special.dajie.com/html/vsite/pingan/images/music.png',
              },
              style: {
                width: '2rem',
              },
              children: [],
            },
            {
              nickName: 'audio',
              tagName: 'audio',
              children: [
                {
                  nickName: 'source',
                  tagName: 'source',
                  attrs: {
                    src: link,
                    type: 'audio/mpeg',
                  },
                }
              ],
            }
          ],
        };
        this.submitInsertNodePopup(data);
      },
      submitVideo (link) {
        const data = {
          nickName: 'video',
          tagName: 'video',
          attrs: {
            'playsinline': '',
            'webkit-playsinline': '',
            'poster': 'https://h5maker.oss-cn-zhangjiakou.aliyuncs.com/imgs/d6645bdd86b64b0001ab67a7ac7ca38a.jpg',
          },
          style: {
            width: '100%',
          },
          children: [
            {
              nickName: 'source',
              tagName: 'source',
              attrs: {
                src: link,
              },
            }
          ],
        };
        this.submitInsertNodePopup(data);
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
          nickName: type,
          style: this.domStyleToVNodeStyleObj(target.getAttribute('style')),
          attrs: {},
        };

        const vnodeHandler = generatorVNodeHandler();
        const tagName = $root[0].tagName.toLowerCase();
        if (tagName !== 'div') {
          data['tagName'] = tagName;
          if (typeof vnodeHandler[tagName] === 'function') {
            vnodeHandler[tagName]($root[0], data);
          }
        }
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

            const childData = {
              style: this.domStyleToVNodeStyleObj(nodes[i].getAttribute('style')),
              children: children,
              attrs: {},
            };

            const childTagName = nodes[i].tagName.toLowerCase();
            if (childTagName !== 'div') {
              childData['tagName'] = nodes[i].tagName.toLowerCase();
              console.log(typeof vnodeHandler[childTagName]);
              if (typeof vnodeHandler[childTagName] === 'function') {
                vnodeHandler[childTagName](nodes[i], childData);
              }
            }
            data.children.push(childData);
          }
        }

        this.submitInsertNodePopup(data);
      },
      domStyleToVNodeStyleObj (styleStr) {
        if (!styleStr) {
          return {};
        }
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

        if (this.insertNodePopup.form.pos === 'child') {
          this.addPanel(this.insertNodePopup.formVNode, data);
        } else {
          data.pos = this.insertNodePopup.form.pos;
          data.curVNode = this.insertNodePopup.formVNode;
          this.addPanel(this.insertNodePopup.formVNode.parentVNode, data);
        }
        this.insertNodePopup.isShow = false;
      },
      insertPage () {
        const data = {
          nickName: 'page',
          style: {
            position: 'relative',
          },
          attrs: {
            role: 'page',
          },
          children: [],
        };
        this.addPanel(this.tree, data);
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
      openRenamePopup: function (vnode) {
        this.renamePopup.isShow = true;
        this.renamePopup.vnode = vnode;
        this.renamePopup.originName = vnode.nickName;
      },
      handleExchangeNode (originVNode, targetVNode) {
        const vnode = this.generateVNodeData(targetVNode.parentVNode, originVNode);
        const index = targetVNode.parentVNode.children.indexOf(targetVNode);
        targetVNode.parentVNode.children.splice(index, 1, vnode);
      },
      iterateTree: function (node, callback) {
        if (!(typeof node == 'object' && node != null)) {
          return;
        }

        callback && callback(node);
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            this.iterateTree(node.children[i], callback);
          }
        }
      },
      handleNodeClick(curNode) {
        const nickNameList = [];
        const pageList = [];
        this.iterateTree(this.tree, (node) => {
          nickNameList.push({
            nickName: node.nickName,
            tagName: node.tag,
          });
        })

        this.form.nickNameList = nickNameList;
        if (typeof this.form.vnode === 'object' && curNode !== this.form.vnode) {
          this.form.vnode.class.curselected = false;
        }

        curNode.class.curselected = !curNode.class.curselected;
        if (curNode.class.curselected) {
          this.form.textList = [];
          this.form.vnode = curNode;
          this.form.parentVNode = curNode.parentVNode;
          this.form.style.animation.isShow = curNode.class.animate__animated;
          this.form.style.animation.animationName = curNode.style.animationName;
          console.log(curNode.style.animationDelay);
          this.form.style.animation.animationDelay = curNode.style.animationDelay && parseFloat(curNode.style.animationDelay);
          this.form.style.animation.animationIterationCount = curNode.style.animationIterationCount;
          this.form.style.animation.animationTimingFunction = curNode.style.animationTimingFunction;
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

            if (key === 'background') {
              if (curNode.style.backgroundColor) {
                this.form.style[key].type = 'color';
                this.form.style[key].color = curNode.style.backgroundColor;
              } else if (curNode.style.backgroundImage && curNode.style.backgroundImage.indexOf('linear-gradient') > -1) {
                this.form.style[key].type = 'gradients';
                const itemArr = curNode.style.backgroundImage.replace("linear-gradient(", "").replace(")", "").split(",");
                this.form.style[key].gradients.direction = Number.parseFloat(itemArr[0]);
                const color0Arr = itemArr[1].split(" ");
                this.form.style[key].gradients.color0.len.val = +color0Arr[1].match(/[\d-]+/)[0];
                this.form.style[key].gradients.color0.len.unit = color0Arr[1].match(/[\D]+$/)[0];
                this.form.style[key].gradients.color0.color = color0Arr[0];
                const color1Arr = itemArr[2].split(" ");
                this.form.style[key].gradients.color1.len.val = +color1Arr[1].match(/[\d-]+/)[0];
                this.form.style[key].gradients.color1.len.unit = color1Arr[1].match(/[\D]+$/)[0];
                this.form.style[key].gradients.color1.color = color1Arr[0];
              } else if (curNode.style.backgroundImage && curNode.style.backgroundImage.indexOf('url') > -1) {
                this.form.style[key].type = 'image';
                this.form.style[key].image = curNode.style.backgroundImage.replace("url('", "").replace("')", '');;
              } else {
                this.form.style[key].type = 'color';
                this.form.style[key].color = '';
              }
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
          this.resetFormDefaultValue();
        } else {
          this.form.vnode = undefined;
          this.form.parentVNode = undefined;
          this.form.textList = [];
        }

      },
      uploadReplaceImgSuccess(res) {
        this.$refs.replaceUploadBtn.clearFiles();
        this.form.vnode.attrs.src = res.url;
      },
      uploadRootImgSuccess(res) {
        this.$refs.rootUploadBtn.clearFiles();
        this.addPanel(this.tree, {src: res.url});
      },
      uploadNodeMusicSuccess (res) {
      },
      uploadNodeImgSuccess(res) {
        this.$refs.nodeUploadBtn.clearFiles();
        const data = {
          nickName: 'img',
          tagName: 'img',
          attrs: {
            src: res.url,
          },
          style: {
            width: '100%',
          }
        }
        this.submitInsertNodePopup(data);
      },
      uploadNodeBackgroundSuccess () {
        this.$refs.nodeUploadBtn.clearFiles();
        const data = {
          nickName: 'img',
          tagName: 'img',
          attrs: {
            src: res.url,
          },
          style: {
            width: '100%',
          }
        }
        this.submitInsertNodePopup(data);
      },
      backgroundImageUploadSuccess (res) {
        this.$refs.backgroundImageUploadBtn.clearFiles();
        this.form.style.background.image = res.url;
        this.changeBackground();
      },
      changeBackground () {
        const obj = this.form.style.background;
        this.form.vnode.style.backgroundColor = this.form.vnode.style.backgroundImage = '';

        if (obj.type === 'color') {
          this.form.vnode.style.backgroundColor = obj.color;
        }
        if (obj.type === 'image') {
          this.form.vnode.style.backgroundImage = "url('" + obj.image + "')";
        }

        if (obj.type === 'gradients') {
          if (this.form.style.background.gradients.direction === '' || this.form.style.background.gradients.color0.color === '' || this.form.style.background.gradients.color0.len.val === '' || this.form.style.background.gradients.color1.color === '' || this.form.style.background.gradients.color1.len.val === '') {
            this.form.vnode.style.backgroundImage = undefined;
            return;
          }
          this.form.vnode.style.backgroundImage = `linear-gradient(${this.form.style.background.gradients.direction}deg,${this.form.style.background.gradients.color0.color} ${this.form.style.background.gradients.color0.len.val}${this.form.style.background.gradients.color0.len.unit},${this.form.style.background.gradients.color1.color} ${this.form.style.background.gradients.color1.len.val}${this.form.style.background.gradients.color1.len.unit})`;
        }
      },
      changeBoxShadow() {
        this.form.vnode.style.boxShadow = `${this.form.style.boxShadow.hShadow.val}${this.form.style.boxShadow.hShadow.unit} ${this.form.style.boxShadow.vShadow.val}${this.form.style.boxShadow.vShadow.unit} ${this.form.style.boxShadow.blur.val}${this.form.style.boxShadow.blur.unit} ${this.form.style.boxShadow.spread.val}${this.form.style.boxShadow.spread.unit} ${this.form.style.boxShadow.color}`;
      },
      changeBorder(type) {
        this.form.vnode.style['border' + type.replace(type[0], type[0].toUpperCase())] = this.form.style.border[type].style + ' ' + this.form.style.border[type].width.val + this.form.style.border[type].width.unit + ' ' + this.form.style.border[type].color;
      },
      changeStyleWithUnit(type) {
        let val = null;
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
          title: this.$t('notice'),
          content: this.$t('removeNodeNotice'),
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
          },
        });
      },
      generateVNodeData(parentVNode, data) {
        const $this = this;

        if (!data) {
          data = {};
        }

        if (data.tag && !data.tagName) {
          data.tagName = data.tag;
        }

        let tagName = 'div';
        if (data.tagName) {
          tagName = data.tagName;
        }

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
          animationName: null,
          animationDelay: null,
          animationIterationCount: null,
          animationTimingFunction: null,
        }

        if (data && data.style) {
          Object.keys(data.style).forEach((key) => {
            style[key] = data.style[key];
          });
        }



        const curNode = {
          tag: tagName,
          parentVNode: parentVNode,
          nickName: data.nickName || tagName,
          class: {
            curselected: false,
            draggable: false,
            clickable: false,
            playend: false,
            dropzone: false,
            taptarget: false,
            animate__animated: false,
          },
          event: {
            targetArea: {
              backgroundColor: '',
            },
            tapTarget: {
              backgroundColor: '',
            },
            clickable: {
              actionList: [this.getEmptyActionListItem()],
              validate: [],
            },
            playend: {
              actionList: [this.getEmptyActionListItem()],
            }
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
              curNode.children.push(this.generateVNodeData(curNode, elem));
            }
          });
        }

        if (data.attrs) {
          curNode.attrs = $.extend(true, {}, curNode.attrs, data.attrs);
        }

        if (tagName === 'span') {
          curNode.style.display = 'inline';
        }
        return curNode;
      },
      addPanel(parentVNode, data) {
        const curNode = this.generateVNodeData(parentVNode, data);
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
    height: calc(100% - 36px);
  }

  .iframepreview {
    width: 100%;
    height: 100%;
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
    cursor: pointer;
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

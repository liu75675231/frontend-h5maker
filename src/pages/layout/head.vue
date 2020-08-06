<template>
  <div class="page-head">
    <div class="page-title">
      <i-input :placeholder="$t('titlePlaceholder')" v-model="title" style="width: 600px" />
    </div>
    <div class="page-opt">
      <i-button type="primary" @click="openHelpPopup">{{ $t('help') }}</i-button>
      <i-button type="primary" @click="$root.$emit('reqTreeNodeData')">{{ $t('save') }}</i-button>
    </div>
    <i-modal v-model="helpPopup.isShow">
      <div>{{ $t('howToUse') }}</div>
      <div>{{ $t('useNotice1') }}</div>
      <div>{{ $t('useNotice2') }}</div>
      <div>{{ $t('useNotice3') }}</div>
      <div>{{ $t('useNotice4') }}</div>
    </i-modal>
  </div>
</template>

<script>
  import copy from 'copy-to-clipboard';
  import http from '../../utils/http'

  export default {
    name: "head.vue",
    props: {
      id: String,
    },
    data: function () {
      return {
        title: '',
        helpPopup: {
          isShow: false,
        }
      };
    },
    mounted () {
      this.$root.$on("resTreeNodeData", (data) => {
        const str = JSON.stringify(data, (key, val) => {
          if (key == 'parentVNode') {
            return undefined;
          }
          return val;
        })
        http.request({
          url: '/h5/save',
          method: 'post',
          data: {
            id: this.id,
            title: this.title,
            data: str,
          },
        }).then((res) => {
          window.location.href = H5_ONLINE_HOST + '/show.html?id=' + res.data.data;
        });
      });
    },
    methods: {
      openHelpPopup () {
        this.helpPopup.isShow = true;
      },
      copyToClipboard () {
        copy(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Title</title>
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                }
              </style>
            </head>
            <body>
              ${ document.querySelector("#renderedHtml").innerHTML }
            </body>
          </html>
        `
        );
        this.$Message.info('源代码已成功保存到剪贴板');
      },
    },
  }
</script>

<style scoped>
  .page-head {
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
  <div class="page-head">
    <div class="page-title">
      <i-input placeholder="请输入H5的标题" style="width: 600px" />
    </div>
    <div class="page-opt">
      
      <i-button type="primary" @click="copyToClipboard">保存</i-button>
    </div>
  </div>
</template>

<script>
  import copy from 'copy-to-clipboard';
  export default {
    name: "head.vue",
    methods: {
      copyToClipboard () {
        copy(document.querySelector("#renderedHtml").innerHTML);
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

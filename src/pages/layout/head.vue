<template>
    <div class="page-head">
        <div class="page-title">
            <i-input placeholder="请输入H5的标题" style="width: 600px" />
        </div>
        <div class="page-opt">
            <i-button type="primary">保存</i-button>
        </div>


    </div>
</template>

<script>
  export default {
    name: "head.vue"
  }
</script>

<style scoped>
    .page-head {
        display: flex;
        justify-content: space-between;
    }
</style>

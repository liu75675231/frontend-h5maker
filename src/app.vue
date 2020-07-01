<template>
  <div id="app" class="height-p100">
    <i-layout class="height-p100">
      <i-header>
        <Head></Head>
      </i-header>
      <i-layout class="container-body">
        <i-content class="container-canvas">
          <Canvas></Canvas>
        </i-content>
      </i-layout>
    </i-layout>
    <!--<div>-->
      <!---->
      <!---->
    <!--</div>-->
  </div>
</template>

<script>
  import Head from './pages/layout/head.vue'
  import Canvas from './pages/layout/canvas.vue'
  import Setting from './pages/layout/setting.vue'
  export default {
    name: "app.vue",
    components: {
      Head,
      Canvas,
      Setting,
    }
  }
</script>

<style scoped>
  .container-body {
    height: calc(100% - 64px);
  }
  .container-canvas {
    height: 100%;
    overflow: hidden;
  }
  .container-sider {
    height: 100%;
    overflow: hidden;
  }
  .height-p100 {
    height: inherit;
  }
</style>
<style>
  html, body {
    height: 100%;
  }

</style>

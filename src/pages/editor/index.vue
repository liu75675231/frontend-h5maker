<template>
  <div id="app" class="height-p100">
    <i-layout class="height-p100">
      <i-header>
        <Head :id="id"></Head>
      </i-header>
      <i-layout class="container-body">
        <i-content class="container-canvas">
          <Canvas :id="id"></Canvas>
        </i-content>
      </i-layout>
    </i-layout>
  </div>
</template>

<script>
  import Head from './head.vue'
  import Canvas from './canvas.vue'
  import Setting from './setting.vue'
  export default {
    name: "index",
    data () {
      return {
        id: '',
        treeNode: {},
      };
    },
    components: {
      Head,
      Canvas,
      Setting,
    },
    created () {
      console.log(this.$store);
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('id')) {
        this.id = urlParams.get('id');
      }
    },
    methods: {
      updateTreeNode (treeNode) {
        console.log(treeNode);
        this.treeNode = treeNode;
      },
    },
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

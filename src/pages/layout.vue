<template>
  <div>
    <div class="layout-head">
      <div class="layout-head-left">
        <router-link to="/" class="company-name">h5Online</router-link>
      </div>
      <div class="layout-head-right">
        <a href="/editor.html" class="label-item" target="_blank">New website</a>
        <router-link to="/login" class="label-item">Log in</router-link>
        <router-link to="/register" class="label-item">Sign up</router-link>
      </div>
    </div>
    <div class="layout-body">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  export default {
    name: "layout"
  }
</script>

<style scoped>
  .layout-head {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    align-items: center;
    border-bottom: solid 1px #ddd;
    background: #fff;
  }
  .layout-head-left {

  }
  .layout-head-right {

  }
  .company-name {
    font-size: 20px;
    font-weight: bold;
    color: #2196F3;
    text-decoration: none;
  }

  .label-item {
    font-size: 13px;
    cursor: pointer;
    padding: 5px 10px 7px;
    border-radius: 4px;
    margin-left: 10px;
    color: #333;
    text-decoration: none;
  }
  .label-item:hover {
    background: #ddd;
  }
</style>

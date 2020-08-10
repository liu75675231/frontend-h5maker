<template>
  <div class="web-card-panel">
    <img class="web-card-img" src="https://library.elementor.com/wp-content/uploads/2020/04/Main-Library-Pic.jpg">
    <div class="web-card-info">
      <div class="web-card-title">my title</div>
      <div class="web-card-opt">
        <div class="web-card-opt-item">View</div>
        <div class="web-card-opt-item">Edit</div>
        <div class="web-card-opt-item">Clone</div>
        <div class="web-card-opt-item">Delete</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "webcard"
  }
</script>

<style scoped>
  .web-card-panel {
    display: inline-block;
    width: 250px;
    background-color: #fff;
    box-shadow: 0px 0px 7px 0 rgba(0,0,0,0.3);
  }
  .web-card-panel:hover {
    box-shadow: 0px 0px 18px 0 rgba(0,0,0,0.3);
  }
  .web-card-img {
    width: 100%;
  }
  .web-card-info {
    background-color: #2196F3;
    color: #fff;
  }
  .web-card-title {
    font-weight: bold;
    padding: 8px 10px;
    text-align: center;
  }
  .web-card-opt {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    border-top: solid 1px #056c9b;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .web-card-opt-item {
    margin-right: 10px;
    cursor: pointer;
  }
  .web-card-opt-item:hover {
    color: #888;
  }
</style>

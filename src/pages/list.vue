<template>
  <div class="page-list">
    <div class="box-panel">
      <div class="box-title">My page</div>
      <div class="card-list">
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
        <web-card class="card-item"></web-card>
      </div>
    </div>
    <div class="box-panel">
      <div class="box-title">Templates</div>
      <div class="card-list">
        <web-card class="card-item"></web-card>
      </div>
    </div>
  </div>
</template>

<script>
  import WebCard from './components/webcard.vue'
  export default {
    name: "list",
    components: {
      WebCard,
    }
  }
</script>

<style scoped>
  .page-list {
    width: 1100px;
    margin: auto;
    margin-top: 40px;
  }
  .box-panel {

  }
  .box-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .card-list {

  }
  .card-item {
    margin-right: 20px;
    margin-bottom: 30px;
  }
</style>

<template>
  <div class="page-list">
    <div class="box-panel" v-if="myH5List.length > 0">
      <div class="box-title">{{ $t('mypage') }}</div>
      <div class="card-list">
        <web-card v-for="item in myH5List" class="card-item" :title="item.title" :id="item.id" :user-id="item.user_id"></web-card>
      </div>
    </div>
    <div class="box-panel" v-if="templateList.length > 0">
      <div class="box-title">{{ $t('templates') }}</div>
      <div class="card-list">
        <web-card v-for="item in templateList" class="card-item" :title="item.title" :id="item.id"></web-card>
      </div>
    </div>
  </div>
</template>

<script>
  import WebCard from './components/webcard.vue'
  import { httpGetH5Templates, httpGetMyH5 } from '../http/h5'
  export default {
    name: "list",
    components: {
      WebCard,
    },
    data () {
      return {
        myH5List: [],
        templateList: [],
      };
    },
    created () {
      this.getH5Template();
      if (this.$store.state.user.id) {
        this.getMyH5();
      }
    },
    methods: {
      getH5Template () {
        httpGetH5Templates().then((res) => {
          this.templateList = res.data.data;
        });
      },
      getMyH5 () {
        httpGetMyH5().then((res) => {
          this.myH5List = res.data.data;
        });
      },
    },
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

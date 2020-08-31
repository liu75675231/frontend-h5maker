<template>
  <div class="web-card-panel">
    <img class="web-card-img" src="https://library.elementor.com/wp-content/uploads/2020/04/Main-Library-Pic.jpg">
    <div class="web-card-info">
      <div class="web-card-title">{{ title }}</div>
      <div class="web-card-opt">
        <div class="web-card-opt-item" @click="openPreview">{{ $t('view') }}</div>
        <div class="web-card-opt-item" @click="openEditor">{{ $t('edit') }}</div>
        <div class="web-card-opt-item" @click="removeH5" v-if="$store.state.user.id && $store.state.user.id === userId">{{ $t('remove') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { httpRemoveH5, httpCloneH5 } from '../../http/h5'
  export default {
    name: "webcard",
    props: {
      id: Number,
      title: String,
      userId: Number,
    },
    methods: {
      cloneH5 () {
        httpCloneH5(this.id).then((res) => {

        });
      },
      removeH5 () {
        const r = confirm(this.$t('removePageNotice'));
        if (r) {
          httpRemoveH5(this.id).then((res) => {
            this.$emit('removed')
          });
        }

      },
      openEditor () {
        if (!this.$store.state.user.id) {
          this.$router.push('/login');
          return;
        }
        if (this.$store.state.user.id == this.userId) {
          window.location.href = '/editor.html?id=' + this.id;
        } else {
          httpCloneH5(this.id).then((res) => {
            window.location.href = '/editor.html?id=' + res.data.data;
          });
        }

      },
      openPreview () {
        window.open('/show.html?id=' + this.id, '_blank');
      },
    },
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

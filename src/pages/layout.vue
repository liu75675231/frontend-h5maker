<template>
  <div>
    <div class="layout-head">
      <div class="layout-head-left">
        <router-link to="/" class="company-name">h5Online</router-link>
      </div>
      <div class="layout-head-right">
        <a href="javascript:void(0)" v-if="showEditor" class="label-item" @click="openEditor">{{ $t('newpage') }}</a>
        <template v-if="user.id">
          <span class="label-item">
            {{ user.username }}
          </span>
        </template>
        <template v-else>
          <router-link to="/login" class="label-item">{{ $t('login') }}</router-link>
          <router-link to="/register" class="label-item">{{ $t('signup') }}</router-link>
        </template>
      </div>
    </div>
    <div class="layout-body">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  export default {
    name: "layout",
    data () {
      return {
        user: {},
        showEditor: false,
      }
    },
    created () {
      let user = sessionStorage.getItem('userInfo');
      if (typeof user === 'string') {
        user = JSON.parse(user);
      }

      if (user && user.id && !this.$store.state.user.id) {
        this.$store.commit('updateUserInfo', user);
      }
      this.resetHeader();
    },
    methods: {
      resetHeader () {
        this.$store.state.user && (this.user = this.$store.state.user);
        if (this.$route.path !== '/login' && this.$route.path !== '/register') {
          this.showEditor = true;
        } else {
          this.showEditor = false;
        }
      },
      openEditor () {
        console.log(this.$route);
        if (this.user.id) {
          window.open('/editor.html', '_blank');
        } else {
          alert(this.$t('loginNotice'));
          this.$router.push('/login');
        }
      },
    },
    watch: {
      $route () {
        this.resetHeader();
      },
    },
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

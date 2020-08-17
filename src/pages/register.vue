<template>
  <div class="page-register">
    <div class="register-panel">
      <div class="register-title">{{ $t('signupPanelTitle') }}</div>
      <input class="register-input" type="text" name="username" v-model="username" :placeholder="$t('loginInputUsername')" maxlength="64"/>
      <input class="register-input" type="password" name="password" v-model="password" :placeholder="$t('loginInputPassword')" maxlength="16"/>
      <div class="register-btn" @click="register">{{ $t('signup') }}</div>
    </div>
  </div>

</template>

<script>
  import { register } from '../http/user'
  export default {
    name: "register",
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      checkEmail (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      },
      validate () {
        if (!this.username) {
          alert(this.$t('emptyUsername'));
          return false;
        }
        if (!this.checkEmail(this.username)) {
          alert(this.$t('invalidUsername'));
          return false;
        }
        if (!this.password) {
          alert(this.$t('emptyPassword'));
          return false;
        }
        if (this.password.length < 9) {
          alert(this.$t('invalidPassword'));
          return false;
        }

        return true;
      },
      register () {
        if (!this.validate()) {
          return;
        }
        register(this.username, this.password).then((res) => {
          if (res.data.msg !== true) {
            alert(this.$t(res.data.msg));
            return;
          }
          alert(this.$t('registerSuccess'));
          this.$router.push('/login');
        });
      },
    },
  }
</script>

<style scoped>
  .page-register {
    text-align: center;
  }
  .register-panel {
    width: 500px;
    display: inline-block;
    background-color: #fff;
    border: solid 1px #e5e5e5;
    box-shadow: 0 1px 2px #e0e0e0;
    margin-top: 100px;
    border-radius: 4px;
    padding: 20px 60px;
    color: #333;
  }
  .register-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .register-input {
    display: block;
    border: 1px solid #ccc;
    width: 100%;
    height: 30px;
    margin-bottom: 15px;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .register-input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  .register-btn {
    display: inline-block;
    background-color: #2196F3;
    color: #fff;
    padding: 4px 30px 7px;
    border-radius: 3px;
    cursor: pointer;
  }
  .register-btn:hover {
    background-color: #196db0;
  }
</style>

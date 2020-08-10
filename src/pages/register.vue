<template>
  <div class="page-register">
    <div class="register-panel">
      <div class="register-title">Sign Up. Start designing for free</div>
      <input class="register-input" type="text" name="username" placeholder="Enter a valid email address"/>
      <input class="register-input" type="password" name="password" placeholder="Password"/>
      <div class="register-btn">Sign up</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "register"
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

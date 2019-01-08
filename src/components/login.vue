<template>
  <div class="login">
    <img class="logbg" src="../../static/images/logbg.jpg" alt>
    <div class="main">
      <img class="titleName" src="../../static/images/titlename.png" alt>
      <img class="lo" src="../../static/images/lo.png" alt>
      <div class="additional">
        <span class="additionalSpan" @click="getRegister">还没有账号我要求注册</span>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <span class="additionalSpan">忘记密码？</span>
      </div>
      <div class="user" style="margin-top:20px;">
        <span>
          <p>用</p>
          <p>户</p>
          <p>名</p>
        </span>
        <img src="../../static/images/yonghuming.png" alt>
        <input type="text" placeholder="请输入用户名" v-model="username">
      </div>
      <div class="pass">
        <span>
          <p>密</p>
          <p>码</p>
        </span>
        <img src="../../static/images/mima.png" alt>
        <input type="password" placeholder="请输入密码" v-model="password">
        <p v-show="show == 1" class="mistakeUser">用户名或密码错误</p>
      </div>

      <div class="pass Register" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      show: 0
    };
  },
  methods: {
    getRegister() {
      this.$router.push({ path: "/Register" });
    },
    getIndex() {
    },
    login() {
      const that = this;
      that.$http
        .post("/auth/login", {
          username: that.username,
          password: that.password
        })
        .then(function(response) {
          console.log(response.data.data.token);
          let dataToken = response.data.data.token
          let username = response.data.data.username
          document.cookie="token="+dataToken 
          that.$router.push({ path: "/Index" });
          localStorage.setItem('userName',username);
        })
        .catch(function(error) {
          console.log(error);
          that.show = 1;
          that.username = "";
          that.password = "";
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .logbg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  .main {
    width: 400px;
    height: 100%;
    margin-left: 50%;
    text-align: center;
    padding: 100px 0;
    box-sizing: border-box;
    .titleName {
      width: 100%;
    }
    .lo {
      margin-top: 20px;
    }
    .user,
    .pass {
      width: 300px;
      height: 60px;
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 5px;
      color: #f4b729;
      padding: 0 20px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      span {
        width: 65px;
        display: flex;
        justify-content: space-between;
      }
      img {
        width: 22px;
        height: 22px;
        margin: 0 10px;
      }
      input {
        flex: 1;
        border: none;
        height: 50px;
        color: #f4b729;
      }
      .mistakeUser {
        position: absolute;
        bottom: -29px;
        right: 0;
        color: red;
        margin: 5px 0;
      }
    }
    .additional {
      color: #f4b729;
      margin-top: 20px;
      text-align: right;
      margin-right: 20px;
    }
    .Register {
      cursor: pointer;
      font-weight: bold;
      justify-content: center;
    }
  }
  .additionalSpan {
    cursor: pointer;
  }
}
</style>

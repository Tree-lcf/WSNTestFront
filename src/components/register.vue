<template>
  <div class="register">
    <img class="logbg" src="../../static/images/logbg.jpg" alt>
    <div class="main">
      <img class="titleName" src="../../static/images/register.png" alt>
      <img class="lo" src="../../static/images/lo.png" alt>
      <div class="user">
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
          <p>邮</p>
          <p>箱</p>
        </span>
        <img src="../../static/images/mima.png" alt>
        <input type="text" placeholder="请输入邮箱" v-model="email">
      </div>
      <div class="pass">
        <span>
          <p>密</p>
          <p>码</p>
        </span>
        <img src="../../static/images/mima.png" alt>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="pass Register" @click="register">确认注册</div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>当前用户名已经被占用,请使用不同的用户名</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      dialogVisible: false
    };
  },

  methods: {
    register() {
      const that = this;
      that.$http
        .post("/auth/register", {
          username: that.username,
          email: that.email,
          password: that.password
        })
        .then(function(response) {
          console.log(response);
          that.$router.push({ path: "/" });
        })
        .catch(function(error) {
          console.log(error);
          that.dialogVisible = true
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.register {
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
    // background: rgb(13, 36, 63);
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
      margin-top: 20px;
      border-radius: 5px;
      color: #f4b729;
      padding: 0 20px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 63px;
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
    }
    .Register {
      cursor: pointer;
      font-weight: bold;
      justify-content: center;
    }
  }
}
</style>

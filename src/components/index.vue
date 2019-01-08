<template>
  <div class="warp">
    <div class="head">
      <div class="headTit">WSN Testing System</div>
      <div class="headNav">
        <router-link to="/Index" tag="div">项目管理</router-link>
        <router-link to="/Port" tag="div">接口管理</router-link>
        <router-link to="/Configuration" tag="div">配置管理</router-link>
        <router-link to="/Example" tag="div">测试管理</router-link>
        <router-link to="/Report" tag="div">报告管理</router-link>
      </div>
      <div class="exit pointer" @click="logout">退出</div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 项目新增弹窗 -->
    <div class="popUp" v-show="secondPopShow==0">
      <h1 style="margin-top:20px">新增编辑项目</h1>
      <div>
        <span>项目名称</span>
        <input type="text" placeholder="必填且惟一">
      </div>
      <div>
        <span>项目负责人</span>
        <input type="text" placeholder="必填且惟一">
      </div>
      <div class="popUpFoot">
        <p>确定</p>
        <!-- <p style="background:red" @click="popUpshow2">取消</p> -->
      </div>
    </div>
    <div class="fourthPopUp" v-show="secondPopShow==0">
      <h1>新增/编辑测试配置</h1>
      <div>
        <span>项目名称</span>
      </div>
      <div>
        <span>项目负责人</span>
        <input type="text" placeholder="必填且惟一">
      </div>
      <div class="fourthPopUpFoot">
        <p>确定</p>
        <!-- <p style="background:red" @click="fourthPopUpshow2">取消</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      secondPopShow: 1
    };
  },
  methods: {
    logout() {
      const that = this;
      that.$http
        .get("/auth/logout", {
          params: {}
        })
        .then(function(response) {
          function getCookie(key) {
            var arr,
              reg = RegExp("(^| )" + key + "=([^;]+)(;|$)");
            if ((arr = document.cookie.match(reg)))
              //["username=liuwei;", "", "liuwei", ";"]
              return decodeURIComponent(arr[2]);
            else return null;
          }
          function delCookie(key) {
            var date = new Date();
            date.setTime(date.getTime() - 1);
            var delValue = getCookie(key);
            if (!!delValue) {
              document.cookie =
                key + "=" + delValue + ";expires=" + date.toGMTString();
            }
          }
          delCookie("token");
          localStorage.removeItem('userName');
          that.$router.push({ path: "/" });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
  position: relative;
  .head {
    width: 100%;
    height: 70px;
    background: rgb(12, 36, 61);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .headTit {
      color: rgb(255, 146, 0);
      font-weight: bold;
    }
    .headNav {
      width: 550px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      div {
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-left: 5px;
        color: #000;
        border-radius: 10px;
        background: #fff;
        cursor: pointer;
      }
      .router-link-active {
        color: #fff;
        background: #03ccbb;
      }
    }
    .exit {
      width: 160px;
      color: red;
      font-weight: bold;
    }
  }
  .main {
    width: 100%;
  }
  .fourthPopUp {
    width: 40%;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    top: 100px;
    left: 30%;
    z-index: 1000;
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 100px;
      }
      input {
      }
    }
    .fourthPopUpFoot {
      width: 300px;
      height: 40px;
      display: flex;
      justify-content: space-around;
      p {
        width: 40px;
        height: 20px;
        font-size: 14px;
        color: #fff;
        line-height: 20px;
        text-align: center;
        background: rgb(0, 157, 214);
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>



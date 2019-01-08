<template>
  <!-- 测试用例管理 -->
  <div class="wrap">
    <div class="head">
      <div class="headTit">测试用例管理</div>
      <div>
        <el-select v-model="projectVal" placeholder="项目名称 默认全选">
          <el-option
            v-for="item in project"
            :key="item.value"
            :label="item.project_name"
            :value="item.project_id"
          ></el-option>
        </el-select>
        <el-select v-model="modulesVal" placeholder="模块名称 默认全选">
          <el-option
            v-for="item in modules"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span class="addPort pointer" style="width:50px;margin-left: 3px;">查询</span>
        <span class="addPort pointer" @click="skipAddExample">新增项目</span>
      </div>
    </div>
    <div class="main" v-for="(item,index) in projectList" :key="index">
      <div class="projectName">{{item.project_name}}</div>
      <div class="modules" v-for="(j,i) in item.modules.list" :key="i">
        <div class="modulesName">{{j.name}}</div>
        <div class="api" v-if="j.api_list.length == 0">
          <div class="list" style="text-align: center;">
            无接口
          </div>
        </div>
        <div class="api" v-for="(z,x) in j.api_list" :key="x" v-else>
          <div class="list">
            <div>
              <span>{{z.id}}</span>
              <i>{{z.name}}</i>
            </div>
            <div class="listTit">
              <i>Test Cases (10)</i>
              <el-progress :text-inside="true" :stroke-width="18" :show-text="false" :percentage="70" status="success"></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "items",
  data() {
    return {
      project: [],
      projectVal: "",
      modules: [],
      modulesVal: "",
      projectList: [],
    };
  },
  mounted() {
    this.projectsList();
  },
  methods: {
    skipAddExample() {
      this.$router.push({ path: "/AddExample" });
    },
    projectsList() {
      const that = this;
      that.$http
        .get("/api/projectsList", {
          params: {}
        })
        .then(function(response) {
          console.log(response.data.data.project_items);
          that.project = response.data.data.project_items;
          that.projectList = response.data.data.project_items;
        })
        .catch(function(error) {
          console.log(error.response.status);
          if(error.response.status == 401){
            that.$router.push({ path: "/" });
          }
        });
    },
  },
  watch: {
    // 模块管理
    projectVal(val, oldVal) {
      const that = this;
      that.modulesVal = ''
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.projectVal,
          module_name: "",
          origin_name: "",
          operate_type: "3"
        })
        .then(function(response) {
          // console.log(response.data.data.modules.list);
          that.modules = response.data.data.modules.list
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  box-sizing: border-box;
  font-size: 14px;
  overflow: auto;
  .head {
    .headTit {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .addPort {
      display: inline-block;
      width: 80px;
      height: 20px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      border-radius: 5px;
      margin-left: 50px;
      background: rgb(0, 157, 214);
    }
  }
  .main {
    margin-top: 20px;
    width: 100%;
    .projectName{
      width: 150px;
      height: 30px;
      color: #fff;
      line-height: 30px;
      text-align: center;
      background: rgb(0, 157, 214);
    }
    .modules{
      flex: 1;
      margin-top: 20px;
      margin-left: 180px;
      display: flex;
      justify-content: space-between;
      .modulesName{
        width: 150px;
        height: 30px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        background: rgb(0, 157, 214);
      }
      .api{
        flex: 1;
        margin-left: 50px;
        .list {
          height: 30px;
          margin-bottom: 20px;
          background: rgb(132, 205, 255);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            span {
              display: inline-block;
              width: 50px;
              height: 20px;
              line-height: 20px;
              color: #fff;
              text-align: center;
              margin-left: 10px;
              margin-right: 20px;
              border-radius: 5px;
              background: rgb(0, 157, 214);
            }
            i {
              font-style: normal;
              margin-right: 20px;
            }
          }
          .listTit {
            display: flex;
            align-items: center;
            div{
              width: 100px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

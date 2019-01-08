<template>
  <!-- 项目管理 -->
  <div class="wrap">
    <div class="head">
      <span class="headTit">项目管理</span>
      <span class="addItem pointer" @click="popShow">新增项目</span>
    </div>
    <div class="main" v-for="(item,index) in project_items" :key="index">
      <div class="mainHead">
        <div class="mainHeadLeft">{{item.project_name}}</div>
        <div class="mainHeadRight">
          <span class="editor pointer" @click="updataShow(item.project_id,item.project_owner)">编辑</span>
          <span class="del pointer" @click="projectDel(item.project_id)">删除</span>
        </div>
      </div>
      <div class="mainContent" v-if="!showPrise">
        <div>
          成员数
          <span @click="relevanceShow(item.project_id)">管理</span>
        </div>
        <div>
          模块数
          <span @click="moduleShow(item.project_id)">管理</span>
        </div>
        <div>
          接口数
          <span @click="skipPort">查看详情</span>
        </div>
        <div>
          用例数
          <span @click="skipExample">查看详情</span>
        </div>
      </div>
      <div class="mainContent" v-if="showPrise">
        <div>尚未添加模块请添加</div>
        <div>尚未添加接口请添加</div>
      </div>
    </div>
    <!-- 项目新增弹窗 -->
    <div class="popUp" v-if="showPop">
      <h1 style="margin-top:20px">新增项目</h1>
      <div class="popUpItem">
        <span>项目名称</span>
        <input type="text" placeholder="必填且惟一" v-model="project_name">
      </div>
      <div class="popUpItem">
        <span>项目负责人</span>
        <input type="text" placeholder="必填且惟一" v-model="owner_name">
      </div>
      <div class="popUpFoot">
        <p @click="projectCreate">确定</p>
        <p style="background:red" @click="popHidden">取消</p>
      </div>
    </div>
    <!-- 项目编辑弹窗 -->
    <div class="popUp" v-if="updataPop">
      <h1 style="margin-top:20px">编辑项目</h1>
      <div class="popUpItem">
        <span>项目名称</span>
        <input type="text" placeholder="必填且惟一" v-model="project_name">
      </div>
      <div class="popUpItem">
        <span>项目负责人</span>
        <input type="text" placeholder="必填且惟一" v-model="owner_name">
      </div>
      <div class="popUpFoot">
        <p @click="projectUpdate">确定</p>
        <p style="background:red" @click="popHidden">取消</p>
      </div>
    </div>
    <!-- 模块管理弹窗 -->
    <div class="popUp" v-if="modulePop">
      <h1 style="margin-top:20px">模块管理</h1>
      <div class="tableDate">
        <div class="button" style="width:3%;float:right;">
          <P>
            <el-button
              class="el-icon-plus"
              style="background:#409EFF;color:#fff"
              @click.prevent="addRow()"
            ></el-button>
          </P>
          <p>
            <el-button
              class="el-icon-minus"
              style="margin-top:5px;background:#409EFF;color:#fff"
              @click.prevent="delData()"
            ></el-button>
          </p>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%"
            @selection-change="selectRow"
          >
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column label="模块名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" @change="inputBlur" @focus='inputFocus'></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="popUpFoot">
        <p @click="popHidden">确定</p>
        <p style="background:red" @click="popHidden">取消</p>
      </div>
    </div>
    <!-- 管理用户弹窗 -->
    <div class="popUp" v-if="relevancePop">
      <h1 style="margin-top:20px">管理用户</h1>
      <div class="popUpItem">
        <el-transfer v-model="value1" :data="data" :titles="['选择成员', '选中成员']"></el-transfer>
      </div>
      <div class="popUpFoot">
        <p @click="popHidden">确定</p>
        <p style="background:red" @click="popHidden">取消</p>
      </div>
    </div>
    <!-- 增加模块 -->
    <div class="popUp2" v-if="addPop">
      <input type="text" class="popUpItem" v-model="addaddModuleName" placeholder="填写名称">
      <div class="popUpFoot">
        <p @click="addModule">确定</p>
        <p style="background:red" @click="popHidden2">取消</p>
      </div>
    </div>
    <el-button :plain="true" @click="openSuccess" style="display:none">成功</el-button>
    <el-button :plain="true" @click="openError" style="display:none">失败</el-button>
  </div>
</template>

<script>
export default {
  name: "items",
  data() {
    const generateData = _ => {
      const that = this;
      const data = [];
      that.$http
        .get("/api/users", {
          params: {}
        })
        .then(function(response) {
          // console.log(response.data.data)
          const users = response.data.data.users;
          const name = localStorage.getItem("userName");
          for (let item of users) {
            data.push({
              label: item.username,
              key: item.user_id,
              disabled: item.username == name
            });
          }
          return data;
        })
        .catch(function(error) {
          console.log(error);
        });
      return data;
    };
    return {
      showPrise: true,
      project_items: [],
      showPop: false,
      modulePop: false,
      relevancePop: false,
      updataPop: false,
      addPop: false,
      project_name: "",
      owner_name: "",
      tableData: [{ name: "1111" }, { name: "1111" }],
      selectlistRow: [],
      data: generateData(),
      value1: [],
      quondamValue1: [],
      projectId: "",
      origin_project_id: "",
      origin_owner_name: "",
      moduleId: "",
      addaddModuleName: "",
      origin_module_list: '',
      origin_module: '',
    };
  },
  mounted() {
    this.projectsList();
  },
  methods: {
    // 获取表格选中时的数据
    selectRow(val) {
      // console.log(val)
      this.origin_module_list = val
    },
    inputFocus(event) {
      console.log(event.target.value)
      this.origin_module = event.target.value
    },
    inputBlur(event) {
      console.log(event)
      const that = this;
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.moduleId,
          module_name: event,
          origin_module_name: that.origin_module,
          operate_type: "2"
        })
        .then(function(response) {
          // console.log(response.data);
          that.moduleOperate()
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    addRow() {
      this.addPop = true;
    },
    delData() {
      const that = this;
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.moduleId,
          module_name: "",
          origin_module_list: that.origin_module_list,
          operate_type: "4"
        })
        .then(function(response) {
          // console.log(response.data);
          that.moduleOperate()
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    skipPort() {
      this.$router.push({ path: "/Port" });
    },
    skipExample() {
      this.$router.push({ path: "/Example" });
    },
    popShow() {
      this.showPop = true;
    },
    moduleShow(val) {
      this.modulePop = true;
      this.moduleId = val;
      this.moduleOperate();
    },
    relevanceShow(val) {
      this.relevancePop = true;
      this.projectInfo(val);
    },
    updataShow(val1, val2) {
      this.updataPop = true;
      this.origin_project_id = val1;
      this.origin_owner_name = val2;
    },
    popHidden() {
      this.showPop = false;
      this.modulePop = false;
      this.updataPop = false;
      this.relevancePop = false;
      this.addaddModuleName = '';
    },
    popHidden2() {
      this.addPop = false;
    },
    openSuccess(val) {
      this.$message({
        message: val,
        type: "success"
      });
    },
    openError(val) {
      this.$message.error(val);
    },
    // 项目列表
    projectsList() {
      const that = this;
      that.$http
        .get("/api/projectsList", {
          params: {}
        })
        .then(function(response) {
          console.log(response.data.data.project_items)
          that.project_items = response.data.data.project_items;
          if (that.project_items.length == 0) {
            that.showPrise = true;
          } else {
            that.showPrise = false;
          }
        })
        .catch(function(error) {
          console.log(error.response.status);
          if(error.response.status == 401){
            that.$router.push({ path: "/" });
          }
        });
    },
    projectCreate() {
      const that = this;
      that.$http
        .post("/api/projectCreate", {
          project_name: that.project_name,
          owner_name: that.owner_name
        })
        .then(function(response) {
          that.openSuccess("完成");
          that.showPop = false;
          that.projectsList();
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    projectDel(val) {
      const that = this;
      that.$http
        .post("/api/projectDel", {
          project_id: val
        })
        .then(function(response) {
          that.openSuccess("完成");
          that.projectsList();
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    projectUpdate() {
      const that = this;
      that.$http
        .post("/api/projectUpdate", {
          project_name: that.project_name,
          owner_name: that.owner_name,
          origin_project_id: that.origin_project_id,
          origin_owner_name: that.origin_owner_name
        })
        .then(function(response) {
          that.openSuccess("完成");
          that.projectsList();
          that.updataPop = false;
          that.origin_owner_name = "";
          that.origin_project_id = "";
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    projectInfo(val) {
      const that = this;
      that.$http
        .get("/api/projectInfo", {
          params: {
            project_id: val
          }
        })
        .then(function(response) {
          // console.log(response.data.data.users.list);
          that.value1 = response.data.data.users.list;
          that.quondamValue1 = response.data.data.users.list;
          that.projectId = val;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 模块管理
    moduleOperate() {
      const that = this;
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.moduleId,
          module_name: "",
          origin_name: "",
          operate_type: "3"
        })
        .then(function(response) {
          // console.log(response.data);
          that.tableData = response.data.data.modules.list
        })
        .catch(function(error) {
          that.openError(error.response.data.message);
        });
    },
    addModule() {
      const that = this;
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.moduleId,
          module_name: that.addaddModuleName,
          origin_name: "",
          operate_type: "1"
        })
        .then(function(response) {
          // console.log(response.data);
          that.addPop = false;
          that.moduleOperate()
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    value1(val, oldVal) {
      const that = this;
      if (that.value1.length > that.quondamValue1.length) {
        var subset = [];
        var subSet = function(arr1, arr2) {
          var set1 = new Set(arr1);
          var set2 = new Set(arr2);
          for (let item of set1) {
            if (!set2.has(item)) {
              subset.push(item);
            }
          }
          return subset;
        };
        subSet(that.value1, that.quondamValue1);
        that.$http
          .post("/api/projectLinkUser", {
            project_id: that.projectId,
            user_id_list: subset,
            follow_type: "1"
          })
          .then(function(response) {
            that.projectInfo(that.projectId);
          })
          .catch(function(error) {
            that.openError(error.response.data.message);
          });
      } else if (that.value1.length < that.quondamValue1.length) {
        var subset = [];
        var subSet = function(arr1, arr2) {
          var set1 = new Set(arr1);
          var set2 = new Set(arr2);
          for (let item of set1) {
            if (!set2.has(item)) {
              subset.push(item);
            }
          }
          return subset;
        };
        subSet(that.quondamValue1, that.value1);
        that.$http
          .post("/api/projectLinkUser", {
            project_id: that.projectId,
            user_id_list: subset,
            follow_type: "2"
          })
          .then(function(response) {
            that.projectInfo(that.projectId);
          })
          .catch(function(error) {
            that.openError(error.response.data.message);
          });
      }
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
    }
    .addItem {
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
    .mainHead {
      width: 100%;
      height: 30px;
      padding: 0 40px;
      box-sizing: border-box;
      border: 1px solid #000;
      background: rgb(132, 205, 255);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .mainHeadLeft {
        width: 100px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        background: rgb(0, 157, 214);
      }
      .mainHeadRight {
        width: 120px;
        height: 20px;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          width: 50px;
          height: 20px;
          border-radius: 5px;
        }
        .editor {
          background: rgb(0, 157, 214);
        }
        .del {
          background: rgb(255, 0, 0);
        }
      }
    }
    .mainContent {
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #999;
        position: relative;
        span {
          width: 60px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          background: rgb(0, 157, 214);
          display: inline-block;
          position: absolute;
          bottom: 15px;
          left: 50%;
          margin-left: -30px;
        }
      }
    }
  }
  .popUp {
    width: 800px;
    height: 500px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #999;
    position: absolute;
    top: 100px;
    left: 50%;
    z-index: 1000;
    margin-left: -400px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .popUpItem {
      margin-top: 40px;
      span {
        display: inline-block;
        width: 100px;
      }
      input {
      }
    }
    .tableDate {
      width: 500px;
      margin: 20px 0;
    }
    .popUpFoot {
      width: 500px;
      height: 40px;
      margin-top: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      p {
        width: 100px;
        height: 40px;
        font-size: 14px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        background: rgb(0, 157, 214);
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .popUp2 {
    width: 400px;
    height: 200px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #999;
    position: absolute;
    top: 200px;
    left: 50%;
    z-index: 2000;
    margin-left: -200px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .popUpItem {
      width: 200px;
    }
    .tableDate {
      width: 500px;
      margin: 20px 0;
    }
    .popUpFoot {
      width: 200px;
      height: 40px;
      margin-top: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      p {
        width: 80px;
        height: 40px;
        font-size: 14px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        background: rgb(0, 157, 214);
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>

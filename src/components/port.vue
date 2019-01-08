<template>
  <!-- 接口管理 -->
  <div class="wrap">
    <div class="head">
      <div class="headTit">接口管理</div>
      <div>
        <el-select v-model="projectVal" placeholder="项目名称 默认全选">
          <el-option
            v-for="item in project"
            :key="item.value"
            :label="item.project_name"
            :value="item.project_id"
          ></el-option>
        </el-select>
        <el-select v-model="modulesVal" placeholder="模块名称 默认全选" @change="selectChang">
          <el-option v-for="item in modules" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <span class="addPort pointer" style="width:50px;margin-left: 3px;" @click="inquire">查询</span>
        <span class="addPort pointer" @click="skipAddPort">新增项目</span>
      </div>
    </div>
    <div class="main">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        v-for="(item,index) in projectList"
        :key="index"
      >
        <el-collapse-item :title="item.project_name" :name="item.project_id">
          <div class="mainHead" v-if="item.module_list.length == 0">
            <div>无模块</div>
          </div>
          <div v-else v-for="(j,i) in item.module_list" :key="i">
            <div class="mainHead">
              <div>{{j.module_name}}</div>
            </div>
            <div class="portList">
              <el-table :data="j.api_list" style="width: 900px;margin: 0 auto" max-height="200">
                <el-table-column fixed prop="api_id" label="ID" width="100" align="center"></el-table-column>
                <el-table-column prop="req_method" label="方式" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="接口名" width="250" align="center"></el-table-column>
                <el-table-column prop="req_relate_url" label="接口URL" width="250" align="center"></el-table-column>
                <el-table-column label="编辑" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="skipEditorPort(scope.row.id,j.id,j.name,item.project_id,item.project_name)"
                      type="text"
                      size="small"
                    >编辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.row.id,j.id,item.project_id)"
                      type="text"
                      size="small"
                      style="color:red"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button :plain="true" @click="openError" style="display:none">失败</el-button>
  </div>
</template>

<script>
export default {
  name: "items",
  data() {
    return {
      showPrise: true,
      showPop: false,
      returnPop: false,
      activeNames: [],
      way: [
        {
          value: "post",
          label: "post"
        },
        {
          value: "get",
          label: "get"
        }
      ],
      wayValue: "",
      project: [],
      projectVal: "",
      modules: [],
      modulesVal: "",
      projectList: []
    };
  },
  mounted() {
    this.projectsList();
    this.apiOperate();
  },
  methods: {
    openError(val) {
      this.$message.error(val);
    },
    deleteRow(index1, index2, index3) {
      console.log(index2, index3);
      let arr = [];
      arr.push(index1);
      const that = this;
      that.$http
        .post("/api/apiOperate", {
          operate_type: "4",
          api_id: arr,
          module_id: index2,
          project_id: index3
        })
        .then(function(response) {
          console.log(response.data);
          that.projectsList();
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    skipEditorPort(val1, val2, val3, val4, val5) {
      this.$router.push({
        path: "/EditorPort",
        query: {
          api_id: val1,
          module_id: val2,
          module_name: val3,
          project_id: val4,
          project_name: val5
        }
      });
    },
    popShow() {
      this.showPop = true;
    },
    skipAddPort() {
      this.$router.push({ path: "/AddPort" });
    },
    returnShow() {
      this.returnPop = true;
    },
    popHidden() {
      this.showPop = false;
      this.returnPop = false;
    },
    handleChange(val) {
      // console.log(val);
    },
    selectChang(val) {
      // console.log(val);
    },
    apiOperate() {
      const that = this;
      that.$http
        .post("/api/apiOperate", {
          operate_type: "3"
        })
        .then(function(response) {
          // console.log(response.data.data.Api_items);
          that.projectList = response.data.data.Api_items;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    // 项目列表
    projectsList() {
      const that = this;
      that.$http
        .get("/api/projectsList", {
          params: {}
        })
        .then(function(response) {
          // console.log(response.data.data.project_items);
          that.project = response.data.data.project_items;
        })
        .catch(function(error) {
          console.log(error.response.status);
          if (error.response.status == 401) {
            that.$router.push({ path: "/" });
          }
        });
    },
    inquire() {
      const that = this;
      that.$http
        .post("/api/apiOperate", {
          operate_type: "6",
          module_id: that.modulesVal,
          project_id: that.projectVal
        })
        .then(function(response) {
          console.log(response.data);
          that.projectList = response.data.data.Api_items;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  },
  watch: {
    // 模块管理
    projectVal(val, oldVal) {
      const that = this;
      that.modulesVal = "";
      that.$http
        .post("/api/moduleOperate", {
          project_id: that.projectVal,
          module_name: "",
          origin_name: "",
          operate_type: "3"
        })
        .then(function(response) {
          // console.log(response.data.data.modules.list);
          that.modules = response.data.data.modules.list;
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
    .mainHead {
      width: 900px;
      height: 40px;
      margin: 10px auto;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      background: #95c1ee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        padding: 0 10px;
        background: #fff;
        margin-right: 10px;
      }
    }
    .portList {
      margin: 0 auto;
    }
  }
}
</style>
<style>
.el-input__inner {
  width: 200px;
  height: 20px;
  line-height: 20px;
  border-radius: 0px;
  border: 1px solid #000;
}
.el-input__icon {
  line-height: 20px;
}
.el-select .el-input .el-select__caret {
  color: #000;
}
.el-select {
  margin: 0 !important;
}
</style>

<template>
  <!-- 测试配置管理 -->
  <div class="wrap">
    <div class="head">
      <div class="headTit">测试配置管理</div>
      <div>
        <el-select v-model="projectVal" placeholder="项目名称 默认全选" @change='selectChang'>
          <el-option
            v-for="item in project"
            :key="item.value"
            :label="item.project_name"
            :value="item.project_id"
          ></el-option>
        </el-select>
        <span class="addConfiguration pointer" @click="popShow(1)">新增测试配置</span>
      </div>
    </div>
    <div class="main">
      <div class="mainList" v-for="(item,index) in projectList" :key="index">
        <div class="listLeft">{{item.project_name}}</div>
        <div class="listRight">
          <div class="list" v-if="item.envs.list.length == 0">
            <div>无配置</div>
          </div>
          <div class="list" v-for="(j,i) in item.envs.list" :key="i">
            <div>{{j.env_id}}</div>
            <div>{{j.env_name}}</div>
            <div>{{j.env_host}}</div>
            <div>{{j.env_desc}}</div>
            <div>
              <span class="pointer" style="background: rgb(0, 157, 214)" @click="popShow(2,j.env_id)">编辑</span>
              <span class="pointer" @click="delEnt(j.env_id)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目新增编辑弹窗 -->
    <div class="popUp" v-if="showPop">
      <h1 style="margin-top:20px">新增/编辑测试配置</h1>
      <div class="popUpItem" v-if="prjectName">
        <span>项目名称</span>
        <el-select v-model="projectVal2" placeholder="保存必选">
          <el-option
            v-for="item in project2"
            :key="item.value"
            :label="item.project_name"
            :value="item.project_id"
          ></el-option>
        </el-select>
      </div>
      <div class="popUpItem">
        <span>配置名称</span>
        <input type="text" placeholder="必填且惟一" v-model="env_name">
      </div>
      <div class="popUpItem">
        <span>配置描述</span>
        <input type="text" placeholder="必填且惟一" v-model="env_desc">
      </div>
      <div class="popUpItem">
        <span>配置主机</span>
        <input type="text" placeholder v-model="env_host">
      </div>
      <div class="tableDate">变量设定</div>
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
            <el-table-column label="key" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.key"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tableDate">输出提取</div>
      <div class="tableDate">
        <div class="button" style="width:3%;float:right;">
          <P>
            <el-button
              class="el-icon-plus"
              style="background:#409EFF;color:#fff"
              @click.prevent="addRow2()"
            ></el-button>
          </P>
          <p>
            <el-button
              class="el-icon-minus"
              style="margin-top:5px;background:#409EFF;color:#fff"
              @click.prevent="delData2()"
            ></el-button>
          </p>
        </div>
        <div class="table">
          <el-table
            :data="tableData2"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%"
            @selection-change="selectRow2"
          >
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column label="key" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.key"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tableDate">结果判断</div>
      <div class="tableDate">
        <div class="button" style="width:3%;float:right;">
          <P>
            <el-button
              class="el-icon-plus"
              style="background:#409EFF;color:#fff"
              @click.prevent="addRow3()"
            ></el-button>
          </P>
          <p>
            <el-button
              class="el-icon-minus"
              style="margin-top:5px;background:#409EFF;color:#fff"
              @click.prevent="delData3()"
            ></el-button>
          </p>
        </div>
        <div class="table">
          <el-table
            :data="tableData3"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%"
            @selection-change="selectRow3"
          >
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actual"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="期望值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.expect"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="逻辑值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.eq"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="popUpFoot">
        <p @click="getEnt">确定</p>
        <p style="background:red" @click="popHidden">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "items",
  data() {
    return {
      showPrise: true,
      showPop: false,
      prjectName: true,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      project: [],
      projectVal: "",
      project2: [],
      projectVal2: "",
      projectList: [],
      tableData: [],
      selectlistRow: [],
      tableData2: [],
      selectlistRow2: [],
      tableData3: [],
      selectlistRow3: [],
      env_name: "",
      env_desc: "",
      env_host: "",
      env_id: "",
      button: '',
    };
  },
  mounted() {
    this.projectsList();
  },
  methods: {
    popShow(val1,val2) {
        const that = this;
      if (val1 == 1) {
        that.showPop = true;
        that.prjectName = true;
        that.button = 1
      } else {
      that.$http
        .post("/api/envOperate", {
          operate_type: "3",
          env_id: val2
        })
        .then(function(response) {
          // console.log(response.data.data);
          that.env_name = response.data.data.env_name
          that.env_id = response.data.data.env_id
          that.env_desc = response.data.data.env_desc
          that.env_host = response.data.data.env_host
          that.tableData = response.data.data.env_var
          that.tableData2 = response.data.data.extracts
          that.tableData3 = response.data.data.asserts
        })
        .catch(function(error) {
          console.log(error.response.data.message);
        });
        that.showPop = true;
        that.prjectName = false;
        that.button = 2
      }
    },
    popHidden() {
      this.showPop = false;
      this.env_name = ''
      this.env_desc = ''
      this.env_host = ''
      this.tableData = []
      this.tableData2 = []
      this.tableData3 = []
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    selectRow2(val) {
      this.selectlistRow2 = val;
    },
    selectRow3(val) {
      this.selectlistRow3 = val;
    },
    // 增加行
    addRow() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.tableData.push(list);
    },
    addRow2() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.tableData2.push(list);
    },
    addRow3() {
      let eq = "eq";
      var list = {
        key: this.actual,
        value: this.expect,
        eq: eq
      };
      this.tableData3.push(list);
    },
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        console.log(this.tableData.length);
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.tableData.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      // this.$refs.tableData.clearSelection();
    },
    delData2() {
      for (let i = 0; i < this.selectlistRow2.length; i++) {
        let val = this.selectlistRow2;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.tableData2.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.tableData2.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      // this.$refs.tableData2.clearSelection();
    },
    delData3() {
      for (let i = 0; i < this.selectlistRow3.length; i++) {
        let val = this.selectlistRow3;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.tableData3.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.tableData3.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      // this.$refs.tableData3.clearSelection();
    },
    selectChang(val){
      console.log(val)
      const that = this;
      that.$http
        .get("/api/projectInfo", {
          params: {
            project_id: val
          }
        })
        .then(function(response) {
          // console.log(response.data.data);
          let newProject = []
          newProject.push(response.data.data)
          that.projectList = newProject;
        })
        .catch(function(error) {
          console.log(error);
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
          that.project2 = response.data.data.project_items;
          that.projectList = response.data.data.project_items;
        })
        .catch(function(error) {
          console.log(error.response.status);
          if(error.response.status == 401){
            that.$router.push({ path: "/" });
          }
        });
    },
    getEnt() {
      const that = this;
      if(that.button == 1){
        that.$http
        .post("/api/envOperate", {
          project_id: that.projectVal2,
          env_name: that.env_name,
          env_host: that.env_host,
          operate_type: "1",
          env_var: that.tableData,
          extracts: that.tableData2,
          asserts: that.tableData3,
          env_desc: that.env_desc
        })
        .then(function(response) {
          // console.log(response.data);
          that.showPop = false;
          that.projectsList();
        })
        .catch(function(error) {
          console.log(error.response.data.message);
        });
      }else{
        that.$http
        .post("/api/envOperate", {
          env_name: that.env_name,
          env_id: that.env_id,
          env_host: that.env_host,
          operate_type: "2",
          env_var: that.tableData,
          extracts: that.tableData2,
          asserts: that.tableData3,
          env_desc: that.env_desc,
          project_id: ''
        })
        .then(function(response) {
          // console.log(response.data);
          that.showPop = false;
          that.projectsList();
        })
        .catch(function(error) {
          console.log(error.response.data.message);
        });
      }
    },
    delEnt(val) {
      const that = this;
      that.$http
        .post("/api/envOperate", {
          operate_type: "4",
          env_id: val
        })
        .then(function(response) {
          // console.log(response.data);
          that.projectsList();
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
    .addConfiguration {
      display: inline-block;
      width: 120px;
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
    .mainList {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .listLeft {
        width: 15%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgb(132, 205, 255);
      }
      .listRight {
        width: 80%;
        .list {
          width: 100%;
          height: 30px;
          margin-bottom: 10px;
          background: rgb(132, 205, 255);
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            span {
              display: inline-block;
              width: 50px;
              height: 20px;
              color: #fff;
              text-align: center;
              margin-right: 20px;
              border-radius: 5px;
              background: rgb(255, 0, 0);
            }
          }
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
    padding-left: 80px;
    margin-left: -400px;
    box-sizing: border-box;
    overflow: auto;
    .popUpItem {
      width: 500px;
      height: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 100px;
      }
      input {
        height: 18px;
        line-height: 18px;
        border: 1px solid #000;
      }
      .send {
        display: inline-block;
        width: 50px;
        height: 20px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        margin-left: 10px;
        border-radius: 2px;
        background: rgb(0, 157, 214);
      }
    }
    .tableDate {
      width: 660px;
      margin: 20px 0;
    }
    .popUpFoot {
      width: 500px;
      height: 40px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-around;
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
}
</style>
<style>
.el-input__inner {
  padding: 0 !important;
  width: 171px !important;
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

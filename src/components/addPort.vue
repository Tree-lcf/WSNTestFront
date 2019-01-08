<template>
  <!-- 新增接口管理 -->
  <div class="wrap">
    <span class="wrapTit">新增项目</span>
    <div class="popUpItem">
      <div>
        <span>项目名称</span>
        <el-select v-model="projectVal" placeholder="保存必选">
          <el-option
            v-for="item in project"
            :key="item.value"
            :label="item.project_name"
            :value="item.project_id"
          ></el-option>
        </el-select>
      </div>
      <div style="margin-left:20px">
        <span>接口模块</span>
        <el-select v-model="modulesVal" placeholder="保存必选">
          <el-option v-for="item in modules" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div style="margin-left:20px">
        <span>接口名称</span>
        <input type="text" v-model="operateName">
      </div>
    </div>
    <div class="popUpItem">
      <el-select v-model="wayValue" placeholder="wayValue">
        <el-option v-for="item in way" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <input type="text" placeholder="主机地址" v-model="req_temp_host">
      <input type="text" placeholder="相对URL" v-model="req_relate_url">
      <span class="send pointer" @click="apiOperate">Send</span>
      <span class="send pointer" @click="apiOperateOne">保存</span>
    </div>
    <div class="main">
      <div class="mainLeft">
        <div class="port">接口参数</div>
        <div class="portMain">
          <div class="portTit" style="margin-top: 0">Params</div>
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
                :data="req_params"
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
                <el-table-column label="value" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="portTit">Headers</div>
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
                :data="req_headers"
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
                <el-table-column label="value" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="portTit">Cookies</div>
          <div class="tableDate">
            <div class="button" style="width:3%;float:right;">
              <P>
                <el-button
                  class="el-icon-plus"
                  style="background:#409EFF;color:#fff"
                  @click.prevent="addRow4()"
                ></el-button>
              </P>
              <p>
                <el-button
                  class="el-icon-minus"
                  style="margin-top:5px;background:#409EFF;color:#fff"
                  @click.prevent="delData4()"
                ></el-button>
              </p>
            </div>
            <div class="table">
              <el-table
                :data="req_cookies"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 95%"
                @selection-change="selectRow4"
              >
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column label="key" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="value" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="portTit">Bodys</div>
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
                :data="req_body"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 95%"
                @selection-change="selectRow3"
              >
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column label="key" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="value" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="mainRight">
        <div class="returnPort">
          <span>接口返回</span>
          <div class="returnPortDiv" v-if="returnStatus">
            <div>
              <span>Status:</span>
              <i>{{returnData.status_code}}</i>
            </div>
            <div>
              <span>Time:</span>
              <i>{{returnData.elapsed_ms}}ms</i>
            </div>
          </div>
        </div>
        <div class="returnVal">
          <div v-if="returnStatus">{{returnData}}</div>
        </div>
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
    return {
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
      wayValue: "post",
      project: [],
      projectVal: "",
      modules: [],
      modulesVal: "",
      req_params: [],
      selectlistRow: [],
      req_headers: [],
      selectlistRow2: [],
      req_body: [],
      selectlistRow3: [],
      req_cookies: [],
      selectlistRow4: [],
      operateName: "",
      req_temp_host: "",
      req_relate_url: "",
      returnData: {},
      returnStatus: false
    };
  },
  mounted() {
    this.projectsList();
  },
  methods: {
    openSuccess(val) {
      this.$message({
        message: val,
        type: "success"
      });
    },
    openError(val) {
      this.$message.error(val);
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
    selectRow4(val) {
      this.selectlistRow4 = val;
    },
    // 增加行
    addRow() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.req_params.push(list);
    },
    addRow2() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.req_headers.push(list);
    },
    addRow3() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.req_body.push(list);
    },
    addRow4() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.req_cookies.push(list);
    },
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        console.log(this.req_params.length);
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.req_params.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.req_params.splice(i, 1);
            }
          });
        });
      }
    },
    delData2() {
      for (let i = 0; i < this.selectlistRow2.length; i++) {
        let val = this.selectlistRow2;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.req_headers.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.req_headers.splice(i, 1);
            }
          });
        });
      }
    },
    delData3() {
      for (let i = 0; i < this.selectlistRow3.length; i++) {
        let val = this.selectlistRow3;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.req_body.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.req_body.splice(i, 1);
            }
          });
        });
      }
    },
    delData4() {
      for (let i = 0; i < this.selectlistRow4.length; i++) {
        let val = this.selectlistRow4;
        // 获取选中行的索引的方法
        val.forEach((val, index) => {
          this.req_cookies.forEach((v, i) => {
            if (val === v) {
              // i 为选中的索引
              this.req_cookies.splice(i, 1);
            }
          });
        });
      }
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
        })
        .catch(function(error) {
          console.log(error.response.status);
          if(error.response.status == 401){
            that.$router.push({ path: "/" });
          }
        });
    },
    apiOperate() {
      const that = this;
      if (that.projectVal == "") {
        that.openError("请选择项目名称");
      } else if (that.modulesVal == "") {
        that.openError("请选择接口模块");
      } else if (that.operateName == "") {
        that.openError("请填写接口名称");
      } else if (that.req_temp_host == "") {
        that.openError("请填写主机地址");
      } else if (that.req_relate_url == "") {
        that.openError("请填写相对URL");
      } else {
        that.$http
        .post("/api/apiOperate", {
          project_id: that.projectVal,
          module_id: that.modulesVal,
          name: that.operateName,
          req_method: that.wayValue,
          req_temp_host: that.req_temp_host,
          req_relate_url: that.req_relate_url,
          req_params: that.req_params,
          req_headers: that.req_headers,
          req_body: that.req_body,
          req_cookies: that.req_cookies,
          operate_type: "5",
          extracts: "",
          asserts: "",
          variables: ""
        })
        .then(function(response) {
          console.log(response.data);
          that.returnStatus = true;
          that.returnData =
            response.data.data.details[0].records[0].meta_data.response;
        })
        .catch(function(error) {
          console.log(error.response);
          that.returnData = error.response;
        });
      }
    },
    apiOperateOne() {
      const that = this;
      if (that.projectVal == "") {
        that.openError("请选择项目名称");
      } else if (that.modulesVal == "") {
        that.openError("请选择接口模块");
      } else if (that.operateName == "") {
        that.openError("请填写接口名称");
      } else if (that.req_temp_host == "") {
        that.openError("请填写主机地址");
      } else if (that.req_relate_url == "") {
        that.openError("请填写相对URL");
      } else {
        that.$http
        .post("/api/apiOperate", {
          project_id: that.projectVal,
          module_id: that.modulesVal,
          name: that.operateName,
          req_method: that.wayValue,
          req_temp_host: that.req_temp_host,
          req_relate_url: that.req_relate_url,
          req_params: that.req_params,
          req_headers: that.req_headers,
          req_body: that.req_body,
          req_cookies: that.req_cookies,
          operate_type: "1",
          extracts: "",
          asserts: "",
          variables: ""
        })
        .then(function(response) {
          console.log(response.data);
          that.openSuccess('已保存')
        })
        .catch(function(error) {
          console.log(error.response);
        });
      }
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
  box-sizing: border-box;
  font-size: 14px;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  .wrapTit {
    font-size: 18px;
    font-weight: bold;
  }
  .popUpItem {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    span {
      display: inline-block;
      width: 60px;
    }
    input {
      margin-left: 20px;
    }
    .send {
      background: rgb(0, 157, 214);
      width: 50px;
      height: 20px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      border-radius: 5px;
      margin-left: 20px;
    }
  }
  .main {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    .mainLeft {
      width: 570px;
      .port {
        width: 550px;
        height: 30px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        background: rgb(0, 207, 255);
      }
      .portMain {
        width: 570px;
        height: 420px;
        overflow: auto;
        margin-top: 20px;
        .portTit {
          margin: 5px;
        }
        .tableDate {
          width: 500px;
        }
      }
    }
    .mainRight {
      width: 550px;
      height: 400px;
      margin-left: 20px;
      .returnPort {
        width: 550px;
        height: 30px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        background: rgb(0, 207, 255);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .returnPortDiv {
          width: 250px;
          height: 28px;
          background: #fff;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            span {
              color: #000;
              display: inline;
            }
            i {
              font-style: normal;
              color: rgb(0, 207, 255);
            }
          }
        }
      }
      .returnVal {
        height: 300px;
        margin-top: 20px;
        border: 1px solid #999;
      }
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

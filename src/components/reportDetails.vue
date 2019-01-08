<template>
  <!-- 报告管理 -->
  <div class="wrap">
    <p>Request</p>
    <div class="RequestDiv">URL</div>
    <div class="RequestDiv">URL</div>
    <div class="RequestDiv">URL</div>
    <div class="RequestDiv">URL</div>
    <p>Response</p>
    <div class="ResponseDiv">URL</div>
    <p>Validators</p>
    <div class="ValidatorsDiv">URL</div>
    <p>Extracts</p>
    <div class="ExtractsDiv">
      <!-- <div class="button" style="width:3%;float:right;">
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
      </div> -->
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
    <p>Traceback Message</p>
    <div class="TracebackDiv">URL</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      req_params: [],
      selectlistRow: [],
      id: ''
    };
  },
  created() {
    this.getId()
  },  
  methods: {
    selectRow(val) {
      this.selectlistRow = val;
    },
    addRow() {
      var list = {
        key: this.key,
        value: this.value
      };
      this.req_params.push(list);
    },
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
    getId() {
      let id = this.$route.query.id
      console.log(id)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  padding: 0 100px 30px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  p {
    color: red;
    margin: 20px 0 10px 0;
  }
  .RequestDiv {
    width: 300px;
    margin-top: 10px;
    border: 1px solid #999;
  }
  .ResponseDiv {
    width: 300px;
    height: 100px;
    margin-top: 10px;
    border: 1px solid #999;
  }
  .ValidatorsDiv {
    width: 500px;
    height: 100px;
    margin-top: 10px;
    border: 1px solid #999;
  }
  .ExtractsDiv {
    width: 500px;
    margin-top: 10px;
  }
  .TracebackDiv{
    width: 500px;
    height: 100px;
    margin-top: 10px;
    border: 1px solid #999;
  }
}
</style>

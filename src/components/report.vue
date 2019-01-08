<template>
  <!-- 报告管理 -->
  <el-table :data="tableData" style="width: 850px;margin: 0 auto">
    <el-table-column fixed prop="id" label="ID" width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="报告名" width="300" align="center"></el-table-column>
    <el-table-column prop="isPass" label="Pass" width="100" align="center"></el-table-column>
    <el-table-column prop="details" label="详情" width="100" align="center">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="skipReportDetails(scope.row.id, tableData)"
          type="text"
          size="small"
        >查看</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" width="150" align="center"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small"
          style="color:red"
        >移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "03",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "02",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "04",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "01",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "08",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "06",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        },
        {
          id: "07",
          name: "王小虎",
          isPass: "pass",
          details: "详情",
          date: "2018-12-14 08:00:00"
        }
      ]
    };
  },
  mounted(){
    this.report()
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    skipReportDetails(val1, val2) {
      console.log(val1,val2)
      this.$router.push({
        path: "/ReportDetails",
        query: {
          id: val1
        }
      });
    },
    report() {
      const that = this;
      that.$http
        .post("/api/report", {})
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error.response.data.message);
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
</style>

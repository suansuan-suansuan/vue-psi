<template>
  <div class="UserInfo1">
    <el-row>
      商品编码：
      <el-input style="width:10%" v-model="form.code" placeholder="请输入商品编码"></el-input>
      商品名称：
      <el-input style="width:10%" v-model="form.name" placeholder="请输入商品名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
    </el-row>
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 30px">
      <el-table-column
          prop="product_number"
          label="商品编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="product_name"
          label="商品名称">
      </el-table-column>
      <el-table-column
          prop="expiration"
          :formatter="formatterController"
          label="过期时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="depot_name"
          label="所在仓库">
      </el-table-column>
    </el-table>
    <div class="page-list">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :total="Number(total)"
          :page-sizes="[1,20,30, 50]"
          layout="sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ProductOverdue",
  data() {
    return {
      tableData:[],
      form: {
        code: '',
        name: '',
        page: 1,
        pageSize: 10,
      },
      total:'',
      value1: '',
    };
  },
  methods: {
    formatterController:function(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.form.pageSize = pageSize
      this.find(this.form);
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.form.page = val
      this.find(this.form)
    },
    find() {
      var vm =this;
      vm.axios.post("http://localhost:8089/cypsi/sel/goodsOut",this.form)
          .then(res => {
            this.tableData=res.data.data.list;
            this.total=res.data.data.total;
          })
    },
    update(){
      this.form.startTime= this.value1[0];
      this.form.endTime= this.value1[1];
    }
  },
  mounted() {
    this.find();
  }
}
</script>
<style>
.UserInfo1 {
  width: 100%;
  height: 90%;
  background-color: white;
  font-size: 12px;
}
</style>
<style scoped>
</style>
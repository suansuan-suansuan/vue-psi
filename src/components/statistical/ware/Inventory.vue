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
          label="商品编码"
          width="180">
      </el-table-column>
      <el-table-column
          prop="product_name"
          label="商品名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="vendor_name"
          label="供应商">
      </el-table-column>
      <el-table-column
          prop="depot_name"
          label="仓库名称">
      </el-table-column>
      <el-table-column
          prop="product_spec"
          label="型号规格">
      </el-table-column>
      <el-table-column
          prop="unit_name"
          label="单位">
      </el-table-column>
      <el-table-column
          prop="inventory_quantity"
          label="数量">
      </el-table-column>
      <el-table-column
          prop="cost_price"
          label="成本价">
      </el-table-column>
      <el-table-column
          prop="purchase_money"
          label="售价">
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
export default {
  name: "Inventory",
  data() {
    return {
      tableData:[],
      form: {
        name: '',
        code:'',
        startTime:'',
        endTime:'',
        page: 1,
        pageSize: 10,
      },
      total: '',
      shortcuts: [{
        text: '上周报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }, {
        text: '前日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
          return [start, end]
        })(),
      },{
        text: '昨日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          return [start, end]
        })(),
      },{
        text: '本月至今',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      },{
        text: '当日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
          return [start, end]
        })(),
      }],
      value1: '',
    };
  },
  methods: {
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
      let vm = this;
      vm.axios.post("http://localhost:8089/cypsi/sel/listProduct",this.form)
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
<style scoped>
</style>
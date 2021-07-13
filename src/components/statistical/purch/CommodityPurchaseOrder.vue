<template>
  <div class="UserInfo1">
    <el-row>
      时间段：
      <el-select v-model="value1" placeholder="请选择" @change="update">
        <el-option
            v-for="item in shortcuts"
            :key="item.value"
            :label="item.text"
            :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="form.startTime"
          type="date"
          :editable="false"
          prefix-icon="el-icon-caret-bottom"
          value-format="yyyy-MM-dd"
          :clearable='false'>
      </el-date-picker>
      <span style="padding: 0 3px">--</span>
      <el-date-picker
          v-model="form.endTime"
          type="date"
          :editable="false"
          prefix-icon="el-icon-caret-bottom"
          value-format="yyyy-MM-dd"
          :clearable='false'>
      </el-date-picker>
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
          prop="product_spec"
          label="型号规格">
      </el-table-column>
      <el-table-column
          prop="unit_name"
          label="单位">
      </el-table-column>
      <el-table-column
          prop="Puorder_Timestamp"
          :formatter="formatterController"
          label="开单日期">
      </el-table-column>
      <el-table-column
          prop="Puorder_state"
          label="单据号">
      </el-table-column>
      <el-table-column
          prop="vendor_name"
          label="供应商">
      </el-table-column>
      <el-table-column
          prop="Puorders_num"
          label="订货数量">
      </el-table-column>
      <el-table-column
          prop="Puorders_Price"
          label="订货金额">
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
  name: "CommodityPurchaseOrder",
  data() {
    return {
      tableData:[],
      form: {
        code: '',
        name: '',
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
        text: '前日至今',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
          return [start, end]
        })(),
      },{
        text: '昨日至今',
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
    formatterController:function(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    find() {
      if (new Date(this.form.startTime).getTime()>new Date(this.form.endTime).getTime()){
        this.$notify({
          title: '提示',
          message: '开始时间不能小于结束时间'
        });
        return false;
      }
      var vm =this;
      vm.axios.post("http://localhost:8089/cypsi/sel/PurchaseOrder",this.form)
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
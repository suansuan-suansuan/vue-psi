<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%;">
    <el-table-column
        prop="product_number"
        label="商品编码"
        width="180">
    </el-table-column>
    <el-table-column
        prop="depot_name"
        label="仓库名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="product_num"
        label="数量">
    </el-table-column>
    <el-table-column
        prop="product_number"
        label="商品名称">
    </el-table-column>
    <el-table-column
        prop="product_spec"
        label="型号规格">
    </el-table-column>
    <el-table-column
        prop="unit_name"
        label="单位">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    find() {
      var vm = this;
      vm.axios.get("http://localhost:8089/cypsi/sel/listSalesProduct")
          .then(res => {
            this.tableData = res.data.data;
            console.log("888",this.tableData);
          })
    },
  },
  mounted() {
    this.find();
  }
}
</script>
<style scoped>
</style>
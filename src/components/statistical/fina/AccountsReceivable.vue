<template>
  <div class="UserInfo1">
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 30px">
      <el-table-column
          prop="sk"
          label="总收款"
          width="180">
      </el-table-column>
      <el-table-column
          prop="fk"
          label="总付款"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AccountsReceivable",
  data(){
    return{
      tableData:[]
    }
  },
  methods: {
    find() {
      var vm = this;
      vm.axios.get("http://localhost:8089/cypsi/sel/findCollectionAndPayment", this.form)
          .then(res => {
            this.tableData = res.data.data;
            console.log(res.data.data)
          })
    }
  },
  mounted() {
    this.find();
  }
}
</script>
<style scoped>
</style>
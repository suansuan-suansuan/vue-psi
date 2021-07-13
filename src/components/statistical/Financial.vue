<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账单流水" name="first">
        <BillFlow></BillFlow>
      </el-tab-pane>
      <el-tab-pane label="应收款明细" name="second">
        <AccountsReceivable></AccountsReceivable>
      </el-tab-pane>
      <el-tab-pane label="应付款明细" name="third">
        <AccountsPayable></AccountsPayable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AccountsPayable from "@/components/statistical/fina/AccountsPayable";
import AccountsReceivable from "@/components/statistical/fina/AccountsReceivable";
import BillFlow from "@/components/statistical/fina/BillFlow";
export default {
  name: "Financial",
  components:{AccountsPayable,AccountsReceivable,BillFlow},
  data(){
    return{
      activeName:"first"
    }
  }
}
</script>
<style scoped>
</style>
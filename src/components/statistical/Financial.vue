<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收款" name="second">
        <AccountsReceivable></AccountsReceivable>
      </el-tab-pane>
      <el-tab-pane label="付款" name="third">
        <AccountsPayable></AccountsPayable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AccountsPayable from "@/components/statistical/fina/AccountsPayable";
import AccountsReceivable from "@/components/statistical/fina/AccountsReceivable";
export default {
  name: "Financial",
  components:{AccountsPayable,AccountsReceivable},
  data(){
    return{
      activeName:"first"
    }
  }
}
</script>
<style scoped>
</style>
<template>
  <div class="UserInfo1">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收款" name="second">
        <AccountsReceivable></AccountsReceivable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AccountsReceivable from "@/components/statistical/fina/AccountsReceivable";
export default {
  name: "Financial",
  components:{AccountsReceivable},
  data(){
    return{
      activeName:"second"
    }
  }
}
</script>
<style scoped>
.UserInfo1 {
  width: 100%;
  height: 90%;
  background-color: white;
  font-size: 24px;
}
</style>
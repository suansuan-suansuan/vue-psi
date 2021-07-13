<template>
  <div class="UserInfo1">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品库存报警" name="first">
        <AnnualStructure></AnnualStructure>
      </el-tab-pane>
      <el-tab-pane label="库存明细" name="second">
        <Inventory></Inventory>
      </el-tab-pane>
      <el-tab-pane label="商品过期查询" name="third">
        <ProductOverdue></ProductOverdue>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AnnualStructure from "@/components/statistical/ware/AnnualStructure";
import Inventory from "@/components/statistical/ware/Inventory";
import ProductOverdue from "@/components/statistical/ware/ProductOverdue";
export default {
  name: "Warehouse",
  components:{AnnualStructure,Inventory,ProductOverdue},
  data(){
    return{
      activeName:"first"
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
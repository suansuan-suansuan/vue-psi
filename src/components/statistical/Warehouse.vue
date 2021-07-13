<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="年度结构分析" name="first">
        <AnnualStructure></AnnualStructure>
      </el-tab-pane>
      <el-tab-pane label="库存明细" name="second">
        <Inventory></Inventory>
      </el-tab-pane>
      <el-tab-pane label="商品过期查询" name="third">
        <ProductSalesOrder></ProductSalesOrder>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AnnualStructure from "@/components/statistical/ware/AnnualStructure";
import Inventory from "@/components/statistical/ware/Inventory";
import ProductSalesOrder from "@/components/statistical/sal/ProductSalesOrder";
export default {
  name: "Warehouse",
  components:{AnnualStructure,Inventory,ProductSalesOrder},
  data(){
    return{
      activeName:"first"
    }
  }
}
</script>
<style scoped>
</style>
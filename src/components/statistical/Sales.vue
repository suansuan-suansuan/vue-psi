<template>
  <div class="UserInfo1">
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品销售明细" name="second">
        <CommoditySales></CommoditySales>
      </el-tab-pane>
      <el-tab-pane label="商品销售订单明细" name="third">
        <ProductSalesOrder></ProductSalesOrder>
      </el-tab-pane>
      <el-tab-pane label="销售毛利明细" name="fourth">
        <SalesGrossProfit></SalesGrossProfit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommoditySales from "@/components/statistical/sal/CommoditySales";
import ProductSalesOrder from "@/components/statistical/sal/ProductSalesOrder";
import SalesGrossProfit from "@/components/statistical/sal/SalesGrossProfit";
export default {
  name: "Sales",
  components:{CommoditySales,ProductSalesOrder,SalesGrossProfit},
  data() {
    return {
      activeName: 'second'
    };
  },
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
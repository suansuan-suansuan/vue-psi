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
      <el-tab-pane label="业务员收款明细" name="fourth1">
        <SalesmanCollection></SalesmanCollection>
      </el-tab-pane>
      <el-tab-pane label="业务员销售明细" name="fourth2">
        <SalesmanSales></SalesmanSales>
      </el-tab-pane>
      <el-tab-pane label="收款流水明细" name="first">
        <CollectionFlow></CollectionFlow>
      </el-tab-pane>
      <el-tab-pane label="前10畅销的商品" name="fourth3">
        <Top></Top>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CollectionFlow from "@/components/statistical/sal/CollectionFlow";
import CommoditySales from "@/components/statistical/sal/CommoditySales";
import ProductSalesOrder from "@/components/statistical/sal/ProductSalesOrder";
import SalesGrossProfit from "@/components/statistical/sal/SalesGrossProfit";
import SalesmanCollection from "@/components/statistical/sal/SalesmanCollection";
import SalesmanSales from "@/components/statistical/sal/SalesmanSales";
import Top from "@/components/statistical/sal/Top";
export default {
  name: "Sales",
  components:{CollectionFlow,CommoditySales,ProductSalesOrder,SalesGrossProfit,SalesmanCollection,SalesmanSales,Top},
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
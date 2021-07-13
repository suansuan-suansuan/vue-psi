<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品采购订单明细表" name="first">
        <CommodityPurchaseOrder></CommodityPurchaseOrder>
      </el-tab-pane>
      <el-tab-pane label="供货商供货明细表" name="second">
        <SupplierSupply></SupplierSupply>
      </el-tab-pane>
      <el-tab-pane label="商品采购明细表" name="third">
        <CommodityPurchase></CommodityPurchase>
      </el-tab-pane>
      <el-tab-pane label="业务员采购明细表" name="fourth">
        <SalesmanPurchase></SalesmanPurchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CommodityPurchase from "@/components/statistical/purch/CommodityPurchase";
import CommodityPurchaseOrder from "@/components/statistical/purch/CommodityPurchaseOrder";
import SupplierSupply from "@/components/statistical/purch/SupplierSupply";
import SalesmanPurchase from "@/components/statistical/purch/SalesmanPurchase";
export default {
  name: "Purchasing",
  components:{CommodityPurchase,CommodityPurchaseOrder,SalesmanPurchase,SupplierSupply},
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {

  }
}
</script>
<style scoped>
</style>
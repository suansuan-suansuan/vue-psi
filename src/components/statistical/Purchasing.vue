<template>
  <div class="UserInfo1">
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品采购订单明细表" name="first">
        <CommodityPurchaseOrder></CommodityPurchaseOrder>
      </el-tab-pane>
      <el-tab-pane label="供货商供货明细表" name="second">
        <SupplierSupply></SupplierSupply>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CommodityPurchaseOrder from "@/components/statistical/purch/CommodityPurchaseOrder";
import SupplierSupply from "@/components/statistical/purch/SupplierSupply";
export default {
  name: "Purchasing",
  components:{CommodityPurchaseOrder,SupplierSupply},
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
.UserInfo1 {
  width: 100%;
  height: 90%;
  background-color: white;
  font-size: 24px;
}
</style>
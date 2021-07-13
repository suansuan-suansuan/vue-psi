<template>
  <div>
    <el-button @click="open = true" type="primary">新增销售订单</el-button>
    考勤时间：
    <el-date-picker
      type="date"
      v-model="pageInfo.Starttime"
      size="mini"
      value-format="yyyy-MM-dd HH:mm:ss"
      style="width: 80px"
    >
    </el-date-picker>
    至
    <el-date-picker
      type="date"
      v-model="pageInfo.Endtime"
      size="mini"
      value-format="yyyy-MM-dd HH:mm:ss"
      style="width: 80px"
    >
    </el-date-picker>
    <el-button @click="highSelect()">查询</el-button>
  </div>

  <!-- 11111111111111111111111111111111111111 -->
  <el-dialog
    title="销售订单"
    v-model="open"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="form" ref="form" label-width="100px">
      <div>
        <el-form-item label="销售单编号" :label-width="formLabelWidth">
          <el-input
            v-model="saleorder.saleOrderId"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="客户" :label-width="formLabelWidth">
          <el-select
            v-model="saleorder.customer"
            placeholder="请选择"
            autocomplete="off"
          >
            <el-option
              v-for="item in baseCustomer"
              :key="item.customerNumber"
              :label="item.customerName"
              :value="item.customerNumber"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="findProduct()">添加商品</el-button>
        </el-form-item>
        <el-dialog title="选择商品" v-model="open1">
          <el-table
            ref="multipleTable"
            @selection-change="handleSelectionChange2"
            :data="productdatas"
            style="width: 100%"
            max-height="800px"
            border
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="product_name" label="产品名称" width="200" />
            <el-table-column
              prop="product_number"
              label="产品编号"
              width="120"
            />
            <el-table-column
              prop="remarks"
              label="备注"
              width="120"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="product_spec"
              label="规格"
              width="120"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="inventory_quantity"
              label="库存总量"
              width="120"
            />
            <el-table-column
              prop="purchase_unit_price"
              label="销售单价"
              width="120"
            />
          </el-table>
          <div>
            <el-button style="float: right" @click="addproduct()"
              >确定
            </el-button>
          </div>
        </el-dialog>
        <el-form-item label="交货日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="saleorder.deliveryTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="审批人" :label-width="formLabelWidth">
          <el-select v-model="saleorder.approver" placeholder="请选择">
            <el-option
              v-for="item in baseCustomer"
              :key="item.customerNumber"
              :label="item.customerName"
              :value="item.customerNumber"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="应收款" :label-width="formLabelWidth">
          <el-input
            v-model="saleorder.receivables"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="预售款" :label-width="formLabelWidth">
          <el-input v-model="saleorder.advance" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 这里是表单 -->
        <el-table
          border
          :header-cell-style="{ background: '#ebebeb' }"
          ref="multipleTable"
          stripe
          show-summary
          :summary-method="getSummaries"
          :data="productdata"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed="right" label="操作">
            <el-button type="text" size="small" v-on:click="deleteInfo(index)"
              >X</el-button
            >
          </el-table-column>
          <el-table-column prop="product_name" label="商品名" width="120">
          </el-table-column>
          <el-table-column prop="product_number" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="remarks" label="备注" width="120">
          </el-table-column>
          <el-table-column prop="product_spec" label="规格" width="120">
          </el-table-column>
          <el-table-column prop="inventory_quantity" label="库存" width="120">
          </el-table-column>
          <el-table-column prop="purchase_unit_price" label="单价" width="120">
          </el-table-column>
          <el-table-column prop="productNum" label="数量" width="120">
          </el-table-column>
          <el-table-column prop="saleMoney" label="金额" width="120">
          </el-table-column>
        </el-table>

        <el-form-item>
          <el-button :plain="true" @click="open = false">取 消</el-button>
          <el-button :plain="true" type="primary" @click="addorder(0)"
            >确定</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>

  <!-- 显示 -->
  <el-table
    border
    :header-cell-style="{ background: '#ebebeb' }"
    ref="multipleTable"
    stripe
    :data="Caiset"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
  >
    <el-table-column prop="puorderId" label="ID" width="150"> </el-table-column>
    <el-table-column prop="puorderTimestamp" label="采购订单时间" width="120">
    </el-table-column>
    <el-table-column prop="puorderC" label="仓库" width="120">
    </el-table-column>
    <el-table-column prop="approval" label="审批状态">
      <template v-slot="Ca">
        <p v-if="Ca.row.approval == 0">未审核</p>
        <p v-if="Ca.row.approval == 1">已审核</p>
      </template>
    </el-table-column>
    <el-table-column prop="puorderCg" label="采购员" width="120">
    </el-table-column>
    <el-table-column prop="puorderState" label="采购编号" width="120">
    </el-table-column>
    <el-table-column prop="puorderTotal" label="订单金额" width="120">
    </el-table-column>
    <el-table-column prop="explain" label="说明" width="120"> </el-table-column>
    <el-table-column prop="puorderG" label="供应商名称" width="120">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        Starttime: "",
        Endtime: "",
        currentPage: 1, //当前页数，由用户指定
        pagesize: 3, //每页显示的条数
        total: 0, //总记录条数，数据库查出来的
      },
      formLabelWidth: "100px",
      Caiset: [],
      joinstockdata: [], //已选库存产品
      open: false,
      open1: false,
      baseCustomer: [], //客户
      approver: [], //审批人
      productdatas: [],
      saleMoney: 0,
      sss: [],
      productdata: [
        // {
        //   productId: "",
        //   productName: "",
        //   productNumber: "",
        //   remarks: "",
        //   productSpec: "",
        //   inventoryQuantity: "",
        //   purchaseMoney: 0,
        // },
      ],
      //订单信息
      saleorder: {
        //表头单据信息
        saleOrderId: "XSDD" + Date.now(), //单据编号
        saleOrderTime: new Date(), //单据时间
        deliveryTime: new Date(), //交货时间
        customer: "", //客户
        salesmen: "", //销售人员
        remarks: "", // 订单备注
        approver: "", //审批人
        //表尾买家信息
        receivables: 0, //应收款
        advance: 0, //预收款
      },
    };
  },
  created() {
    this.findCustomer();
  },
  methods: {
    deleteInfo(index) {
      this.Caiset.splice(index, 1);
    },
    //添加订单
    addorder(type) {
      var _this = this;
      this.axios({
        url: "http://localhost:8089/cypsi/SaleOrder/add/" + type,
        data: {
          order: JSON.stringify(_this.saleorder), //_this.formorder ,
          orderdetails: JSON.stringify(_this.productdata), //_this.productdata//
        },
        method: "post",
      })
        .then(function (response) {
          _this.approver = response.data.list;
          _this.open = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //添加销售产品
    addproduct() {
      //var productlist = [];
      //       this.productdatas.forEach((item) => {
      //         productlist.push(item.productId);
      //       });
      //       this.joinstockdata.forEach((item) => {
      //         if (productlist.indexOf(item) == -1) {
      //           this.productdatas.push(item);
      //         }
      //       });
      for (var i = 0; i < this.sss.length; i++) {
        this.productdata.push(this.sss[i]);
        for (var j = 0; j < this.productdata.length; j++) {
          this.productdata[j].productNum = 1;
          this.productdata[j].saleMoney =
            this.productdata[j].productNum *
            this.productdata[j].purchase_unit_price;
        }
      }
      console.log("sssssss:" + JSON.stringify(this.productdata));
      //       for (var i = this.productdatas.length - 1; i >= 0; i--) {
      //         if (
      //           this.productdata[i].productId == null &&
      //           this.productdatas.length > 1
      //         ) {
      //           this.productdatas.splice(i, 1);
      //         }
      //       }
      this.open1 = false;
    },
    //获取审批人
    findApprover() {
      var _this = this;
      this.axios({
        url: "http://localhost:8089/cypsi/BaseCustomer/baseCustomer",
        method: "get",
      })
        .then(function (response) {
          _this.approver = response.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSelectionChange2(val) {
      this.sss = val;
      console.log("this.sss:", this.sss);
    },
    //新增一行
    addrow(productdata) {
      productdata.push({
        productId: "",
        productName: "",
        productNumber: "",
        remarks: "",
        productSpec: "",
        inventoryQuantity: "",
        purchaseMoney: 0,
        saleMoney: "", //销售金额
      });
    },
    //获取客户
    findCustomer() {
      var _this = this;
      this.axios({
        url: "http://localhost:8089/cypsi/BaseCustomer/baseCustomer",
        method: "get",
      })
        .then(function (response) {
          _this.baseCustomer = response.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取产品
    findProduct() {
      var _this = this;
      _this.open1 = true;
      this.axios({
        url: "http://localhost:8089/cypsi/SaleOrder/getproduct",
        method: "get",
      })
        .then(function (response) {
          _this.productdatas = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 表格合计的，后台处理了钱数数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.property == "saleMoney") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

          if (index == 7) {
            this.saleorder.receivables = sums[index] = sums[index].toFixed(2);
          }
          console.log("sssssssss", this.saleorder.receivables);
          sums[index];
        }
      });
      return sums;
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>
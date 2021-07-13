<template>
  <div>
    <el-button @click="isopen()">新增采购订单</el-button>
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
    title="采购订单"
    v-model="open"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="form" ref="form" label-width="100px">
      <div>
        <el-button @click="open1 = true" type="primary">添加产品</el-button>
        <el-form-item label="采购时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.puorderTimestamp"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="选择仓库" :label-width="formLabelWidth">
          <el-select
            value-key="depotId"
            v-model="form.BaseDepot"
            placeholder="请选择"
          >
            <el-option
              v-for="item in BaseDepotData"
              :key="item.depotId"
              :label="item.depotName"
              :value="item.depotId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="选择供应商" :label-width="formLabelWidth">
          <el-select
            value-key="vendorId"
            v-model="basevendor"
            placeholder="请选择"
            @change="findbasevendor()"
          >
            <el-option
              v-for="item in BaseVendorData"
              :key="item.vendorId"
              :label="item.vendorName"
              :value="item.vendorId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input
            v-model="form.puorderTotal"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="采购说明" :label-width="formLabelWidth">
          <el-input v-model="form.explain" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 这里是表单 -->
        <el-table
          border
          :header-cell-style="{ background: '#ebebeb' }"
          ref="multipleTable"
          stripe
          :data="Caiset"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="puordersId" label="ID" width="120">
          </el-table-column>
          <el-table-column prop="puordersName" label="产品名称" width="120">
          </el-table-column>
          <el-table-column prop="puordersUnit" label="产品单位" width="120">
          </el-table-column>
          <el-table-column prop="puordersNum" label="产品采购数量" width="120">
          </el-table-column>
          <el-table-column prop="puordersPrice" label="产品单价" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <el-button type="text" size="small" v-on:click="deleteInfo(index)"
              >X</el-button
            >
          </el-table-column>
        </el-table>

        <el-form-item>
          <el-button :plain="true" @click="open = false">取 消</el-button>
          <el-button :plain="true" type="primary">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>

  <!-- 	2222222222222222222222222222222222 -->
  <el-dialog
    title="添加产品"
    v-model="open1"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="form" ref="form" label-width="100px">
      <div>
        <el-form-item label="选择产品" :label-width="formLabelWidth">
          <el-select
            value-key="productId"
            v-model="form.BaseProduct"
            placeholder="请选择"
          >
            <el-option
              v-for="item in BaseProductData"
              :key="item.productId"
              :label="item.productName"
              :value="item.productId"
            />
          </el-select>
        </el-form-item>

        <el-table
          border
          :header-cell-style="{ background: '#ebebeb' }"
          ref="multipleTable"
          stripe
          :data="Caiset"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="puordersId" label="ID" width="120">
          </el-table-column>
          <el-table-column prop="puordersName" label="产品名称" width="120">
          </el-table-column>
          <el-table-column prop="puordersUnit" label="产品单位" width="120">
          </el-table-column>
          <el-table-column prop="puordersNum" label="产品采购数量" width="120">
          </el-table-column>
          <el-table-column prop="puordersPrice" label="产品单价" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <el-button type="text" size="small" v-on:click="deleteInfo(index)"
              >X</el-button
            >
          </el-table-column>
        </el-table>

        <el-form-item>
          <el-button :plain="true" @click="open1 = false">取 消</el-button>
          <el-button :plain="true" type="primary">确定</el-button>
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
    <el-table-column type="selection" width="50" align="center">
    </el-table-column>
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
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="updatePuo(scope.row.puorderId)"
          >审批</el-button
        >
      </template>
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
//import qs from "qs";
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
      BaseVendorData: [],
      BaseDepot: [],
      BaseDepotData: [],
      BaseProductData: [],
      baseDepot: "",
      open: false,
      open1: false,
      basevendor: "",
      BaseProduct: "",
      form: {
        puorderTimestamp: "",
        puorderC: "",
        approval: "",
        apptime: "",
        puorderCg: "",
        puorderState: "",
        puorderTotal: "",
        explain: "",
        puorderG: "",
        vendorId: "",
        vendorName: "",
        basevendor: "",
        BaseDepot: {},
        depotId: "",
        depotName: "",
        productId: "", //产品ID 详情表添加到详情
        productName: "",
      },
    };
  },
  created() {
    const _this = this;
    this.axios
      .get("http://localhost:8089/cypsi/test/PuoselectAll", {
        params: this.pageInfo,
      })
      .then(function (response) {
        _this.Caiset = response.data.list;
        _this.pageInfo.total = response.data.total;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      }),
      this.axios
        .get("http://localhost:8089/cypsi/BaseVendor/selectAll88")
        .then(function (response) {
          _this.BaseVendorData = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }),
      this.axios
        .get("http://localhost:8089/cypsi/BaseDepotController/queryAllWWWW")
        .then(function (response) {
          _this.BaseDepotData = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }),
      this.axios
        .get("http://localhost:8089/cypsi/baseProduct/GenJuselectAll")
        .then(function (response) {
          _this.BaseProductData = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    findbasevendor() {
      console.log("ss" + this.basevendor);
    },
    isopen() {
      this.open = true;
    },
    deleteInfo(index) {
      this.Caiset.splice(index, 1);
    },
    updatePuo(typeid) {
      this.form.puorderId = typeid;
      const _this = this;
      this.axios
        .put("http://localhost:8089/cypsi/test/updatePuo", this.form)
        .then(function () {
          _this.axios
            .get("http://localhost:8089/cypsi/test/PuoselectAll", {
              params: _this.pageInfo,
            })
            .then(function (response) {
              console.log(response.data);
              _this.Caiset = response.data.list;
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    handleCurrentChange(currentPage) {
      var _this = this;
      this.pageInfo.currentPage = currentPage;
      //var ps = qs.stringify(this.pageInfo);
      this.axios
        .get("http://localhost:8089/cypsi/test/PuoselectAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.Caiset = response.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(pagesize) {
      var _this = this;
      this.pageInfo.pagesize = pagesize;
      //var ps = qs.stringify(this.pageInfo);
      this.axios
        .get("http://localhost:8089/cypsi/test/PuoselectAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.Caiset = response.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    highSelect() {
      const _this = this;
      this.axios
        .get("http://localhost:8089/cypsi/test/selectAllSJ", {
          params: this.pageInfo,
        })
        .then(function (response) {
          _this.Caiset = response.data.list;
          _this.pageInfo.total = response.data.total;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    BaseVendor() {
      const _this = this;
      this.axios
        .get("http://localhost:8089/cypsi/BaseVendor/selectAll88")
        .then(function (response) {
          _this.BaseVendorData = response.data.list;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>

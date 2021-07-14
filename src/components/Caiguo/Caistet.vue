<template>
	<div>
		<el-button @click="isopen()">新增采购订单</el-button>
		考勤时间：
		<el-date-picker type="date" v-model="pageInfo.Starttime" size="mini" value-format="yyyy-MM-dd HH:mm:ss"
			style="width: 80px;">
		</el-date-picker>
		至
		<el-date-picker type="date" v-model="pageInfo.Endtime" size="mini" value-format="yyyy-MM-dd HH:mm:ss"
			style="width: 80px;">
		</el-date-picker>
		<el-button @click="highSelect()">查询</el-button>
	</div>

	<!-- 11111111111111111111111111111111111111 -->
	<el-dialog title="采购订单" v-model="open" width="60%" :before-close="handleClose">
		<el-form :model="form" ref="form" label-width="100px">

			<div>
				<el-button @click="findProduct()" type="primary">添加产品</el-button>
				<el-form-item label="采购时间" :label-width="formLabelWidth">
					<el-date-picker v-model="saleorder.puorderTimestamp" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>


				<el-form-item label="选择仓库" :label-width="formLabelWidth">
					<el-select value-key="depotId" v-model="saleorder.puorderC" placeholder="请选择">
						<el-option v-for="item in BaseDepotData" :key="item.depotId" :label="item.depotName"
							:value="item.depotId" />
					</el-select>
				</el-form-item>


				<el-form-item label="选择供应商" :label-width="formLabelWidth">
					<el-select value-key="vendorId" v-model="saleorder.puorderG" placeholder="请选择"
						@change="findbasevendor()">
						<el-option v-for="item in BaseVendorData" :key="item.vendorId" :label="item.vendorName"
							:value="item.vendorId" />
					</el-select>
				</el-form-item>

				<el-form-item label="采购说明" :label-width="formLabelWidth">
					<el-input v-model="saleorder.explain" autocomplete="off"></el-input>
				</el-form-item>
				<!-- 这里是表单 -->
				<el-table border :header-cell-style="{ background: '#ebebeb' }" ref="multipleTable" stripe show-summary
					:summary-method="getSummaries" :data="productdata" tooltip-effect="dark"
					@selection-change="handleSelectionChange">
					<el-table-column fixed="right" label="操作">
						<el-button type="text" size="small" v-on:click="deleteInfo(index)">X</el-button>
					</el-table-column>
					<el-table-column prop="product_name" label="商品名" width="120">
					</el-table-column>
					<el-table-column prop="product_number" label="商品编号" width="120">
					</el-table-column>
					<el-table-column prop="remarks" label="备注" width="120">
					</el-table-column>
					<el-table-column prop="product_spec" label="规格" width="120">
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
					<el-button :plain="true" type="primary" @click="addorder()">确定</el-button>
				</el-form-item>
			</div>
		</el-form>
	</el-dialog>

	<!-- 	2222222222222222222222222222222222 -->
	<el-dialog title="添加产品" v-model="open1" width="60%" :before-close="handleClose">
		<el-form :model="form" ref="form" label-width="100px">
			<div>
				<el-table ref="multipleTable" @selection-change="handleSelectionChange2" :data="productdatas"
					style="width: 100%" max-height="800px" border>
					<el-table-column type="selection" width="55" />
					<el-table-column prop="product_name" label="产品名称" width="200" />
					<el-table-column prop="product_number" label="产品编号" width="120" />
					<el-table-column prop="remarks" label="备注" width="120" :show-overflow-tooltip="true" />
					<el-table-column prop="product_spec" label="规格" width="120" :show-overflow-tooltip="true" />
					<el-table-column prop="purchase_unit_price" label="销售单价" width="120" />
				</el-table>

				<el-form-item>
					<el-button :plain="true" @click="open1 = false">取 消</el-button>
					<el-button :plain="true" type="primary" @click="addproduct()">确定</el-button>
				</el-form-item>
			</div>
		</el-form>
	</el-dialog>



	<!-- 显示 -->
	<el-table border :header-cell-style="{background:'#ebebeb'}" ref="multipleTable" stripe :data="Caiset"
		tooltip-effect="dark" @selection-change="handleSelectionChange">
		<el-table-column type="selection" width="50" align="center">
		</el-table-column>
		<el-table-column prop="puorderTimestamp" label="采购订单时间" width="120">
		</el-table-column>
		<el-table-column prop="puorderC" label="仓库" width="120">
			<template v-slot="Ca">
				<p v-if="Ca.row.puorderC==1">哈柏</p>
				<p v-if="Ca.row.puorderC==2">1</p>
				<p v-if="Ca.row.puorderC==2">上海总部</p>
			</template>
		</el-table-column>
		<el-table-column prop="approval" label="审批状态">
			<template v-slot="Ca">
				<p v-if="Ca.row.approval==0">未审核</p>
				<p v-if="Ca.row.approval==1">已审核</p>
			</template>
		</el-table-column>
		<el-table-column prop="puorderC" label="采购员" width="120">
		</el-table-column>
		<el-table-column prop="puorderState" label="采购编号" width="120">
		</el-table-column>
		<el-table-column prop="explain" label="说明" width="120">
		</el-table-column>
		<el-table-column prop="puorderG" label="供应商名称" width="120">
		</el-table-column>
		<el-table-column fixed="right" label="操作">
			<template #default="scope">
				<el-button type="text" size="small" @click="updatePuo(scope.row.puorderId)">生成入库单</el-button>
			</template>
		</el-table-column>
	</el-table>
	<div class="block">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'

	export default {
		data() {
			return {
				pageInfo: {
					Starttime: '',
					Endtime: '',
					currentPage: 1, //当前页数，由用户指定
					pagesize: 3, //每页显示的条数
					total: 0 //总记录条数，数据库查出来的
				},
				formLabelWidth: '100px',
				Caiset: [],
				BaseVendorData: [],
				BaseDepot: [],
				BaseDepotData: [],
				BaseProductData: [],
				productdatas: [],
				productdata: [],
				baseDepot: '',
				sss: [],
				saleMoney: 0,
				joinstockdata: [], //已选库存产品
				open: false,
				open1: false,
				basevendor: "",
				BaseProduct: "",
				form: {
					puorderTimestamp: "",
					puorderC: "",
					approval: "",
					apptime: "",
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
					productName: ""
				},
				saleorder: {
					//表头单据信息
					puorderState: "XSDD" + Date.now(), //单据编号
					puorderG: "",
					puorderC: "",
					puorderTimestamp: new Date(),
					explain: "", // 订单备注
				},
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/cypsi/test/PuoselectAll", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.Caiset = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(response.data)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/cypsi/BaseVendor/selectAll88")
				.then(function(response) {
					_this.BaseVendorData = response.data
					console.log(response);
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/cypsi/BaseDepotController/queryAllWWWW")
				.then(function(response) {
					_this.BaseDepotData = response.data
					console.log(response);
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/cypsi/baseProduct/GenJuselectAll")
				.then(function(response) {
					_this.BaseProductData = response.data
					console.log(response);
				}).catch(function(error) {
					console.log(error)
				})
		},
		methods: {
			handleSelectionChange2(val) {
				this.sss = val;
				console.log("this.sss:", this.sss);
			},
			findbasevendor() {
				console.log("ss" + this.basevendor)
			},
			isopen() {
				this.open = true;
			},
			deleteInfo(index) {
				this.Caiset.splice(index, 1);
			},
			updatePuo(typeid) {
				this.form.puorderId = typeid;
				const _this = this
				this.axios.put("http://localhost:8089/cypsi/test/updatePuo", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/cypsi/test/PuoselectAll", {
								params: _this.pageInfo
							})
							.then(function(response) {
								console.log(response.data)
								_this.Caiset = response.data.list
							}).catch(function(error) {
								console.log(error)
							})
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/cypsi/test/PuoselectAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.Caiset = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/cypsi/test/PuoselectAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.Caiset = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			highSelect() {
				const _this = this
				this.axios.get("http://localhost:8089/cypsi/test/selectAllSJ", {
						params: this.pageInfo,
					})
					.then(function(response) {
						_this.Caiset = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//添加销售产品
			addproduct() {
				var productlist = [];
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
				this.open1 = false;
			},
			//新增一行
			addrow(productdata, event) {
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
			//获取产品
			findProduct() {
				var _this = this;
				_this.open1 = true;
				this.axios({
						url: "http://localhost:8089/cypsi/SaleOrder/getproduct",
						method: "get",
					})
					.then(function(response) {
						_this.productdatas = response.data.data;
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			BaseVendor() {
				const _this = this
				this.axios.get("http://localhost:8089/cypsi/BaseVendor/selectAll88")
					.then(function(response) {
						_this.BaseVendorData = response.data.list
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}, // 表格合计的，后台处理了钱数数据
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
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
						sums[index];
					}
				});
				return sums;
			},
			//添加订单
			addorder() {
				var _this = this;
				this.axios({
						url: "http://localhost:8089/cypsi/POcha/adds",
						data: {
							order: JSON.stringify(_this.saleorder), //_this.formorder ,
							orderdetails: JSON.stringify(_this.productdata), //_this.productdata//
						},
						method: "post",
					})
					.then(function(response) {
						_this.approver = response.data.list;
						_this.open = false;
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.el-input {
		width: 300px;
	}
</style>

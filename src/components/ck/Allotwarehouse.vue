<template>
	<div class="body">
		<el-row>
			<el-col :span="24">
				<div>
					<div>
						<span>
							订单编号：
							<el-input style="width: 100px;" clearable size="mini" v-model="pageInfo.serialNumber"></el-input>
						</span>
						<span>
							制单人：
							<el-input style="width: 100px;" clearable size="mini" v-model="pageInfo.serialNumber"></el-input>
						</span>
						<span>
							调入仓库：
							<el-select value-key="depotId" v-model="pageInfo.cangku" placeholder="请选择">
								<el-option v-for="item in BaseDepot" :key="item.depotId" :label="item.depotName" :value="item.depotId" />
							</el-select>

						</span>

						<span style="float: right;">
							<el-button size="mini" type="primary" @click="dialogFormVisible = true">新增</el-button>
							<el-button size="mini" type="success">查询</el-button>
							<el-button size="mini" type="info" @click="upd();insertGoods();insertSaleDelivery();">审核通过</el-button>
							<el-button size="mini" type="danger" @click="del()">删除</el-button>
						</span>
					</div>
					<div>
						<el-dialog title="仓库调拨单" v-model="dialogFormVisible">
							<div>
								<el-form ref="form2" :model="form2" label-width="80px">
									<el-row>
										<el-col :span="12">
											<el-form-item label="调入仓库" style="width: 300px;">
												<el-select value-key="depotId" v-model="form2.transferredtothewarehouse" placeholder="请选择">
													<el-option v-for="item in BaseDepot" :key="item.depotId" :label="item.depotName" :value="item.depotName" />
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="2">
											<el-form-item label="调出仓库" style="width: 300px;">
												<el-select value-key="depotId" v-model="form2.bringupthewarehouse" placeholder="请选择">
													<el-option v-for="item in BaseDepot" :key="item.depotId" :label="item.depotName" :value="item.depotName" />
												</el-select>
											</el-form-item>
										</el-col>
										<el-form-item label="说明:" style="width: 600px;">
											<el-input v-model="form.documentmaker"></el-input>
										</el-form-item>
									</el-row>
									<div>商品列表</div>
									<!-- 这里是表单 -->
									<el-table border :header-cell-style="{background:'#ebebeb'}" ref="multipleTable" stripe :data="Product"
									 tooltip-effect="dark" @selection-change="handleSelectionChange2">
										<el-table-column type="selection">
										</el-table-column>
										<el-table-column prop="productNumber" label="产品编号" width="120">
										</el-table-column>
										<el-table-column prop="productName" label="产品名称" width="120">
										</el-table-column>
										<el-table-column prop="productSpec" label="规格型号" width="120">
										</el-table-column>
										<el-table-column prop="purchaseMoney" label="单价" width="120">
										</el-table-column>
										<el-table-column prop="costPrice" label="成本价" width="120">
										</el-table-column>
										<el-table-column prop="purchaseUnitPrice" label="销价" width="120">
										</el-table-column>
										<el-table-column prop="remarks" label="备注" width="120">
										</el-table-column>
									</el-table>
								</el-form>
							</div>
							<div style="text-align: center;margin-top: 10px;">
								<span>
									<el-button size="mini" type="primary" @click="insertAllotwarehouse()">确认</el-button>
									<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
								</span>
							</div>
						</el-dialog>
					</div>
				</div>
				<div class="table">
					<el-table :data="tableData" border @selection-change="handleSelectionChange">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column prop="serialNumber" label="订单编号">
						</el-table-column>
						<el-table-column prop="documentationDate" label="制单日期">
						</el-table-column>
						<el-table-column prop="documentmaker" label="制单人">
						</el-table-column>
						<el-table-column prop="transferredtothewarehouse" label="调入仓库">
						</el-table-column>
						<el-table-column prop="bringupthewarehouse" label="调出仓库">
						</el-table-column>
						<el-table-column prop="operator" label="经手人">
						</el-table-column>
						<el-table-column label="审核标志">
							<template #default="scope">
								<i class="el-icon-success" v-show="scope.row.approval==1" style="color:#67c23A;margin-left: 20px;"></i>
								<i class="el-icon-warning" v-show="scope.row.approval==0" style="margin-left: 20px;"></i>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
					 :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
					 :total="pageInfo.total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				multipleSelection: [],
				tableData: [],
				BaseDepot: [],
				Product: [],
				form: {
					channelid: '',
					timeLiness: '',
					name: '',
					region: '',
				},
				form2: {
					approval: '',
					channelid: '',
					bringupthewarehouse: '',
					transferredtothewarehouse: '',
					documentmaker: '',
					serialNumber: '',
				},
				chuku: {
					deliveryOrderId: '',
					remarks: '',
				},
				ruku: {
					puorderId: '',
					depotId: '',
					explain: '',
					goodsState: '',
					
				},
				dialogFormVisible: false,
				pageInfo: {
					cangku: '',
					currentPage: 1,
					pagesize: 3,
					total: 0,
					serialNumber: '',
					documentmaker: '',
					depotName: '',
				},
			}
		},
		methods: {
			//总复选框的全选和取消全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//获取当前页码
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage
				this.selectAllotwarehouse();
				this.highSelect();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectAllotwarehouse();
				this.highSelect();
			},
			//查询仓库 
			selectCangku() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/selectCangku")
					.then(function(response) {
						this_.BaseDepot = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},

			//查询产品
			selectProduct() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/selectProduct")
					.then(function(response) {
						this_.Product = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增调拨单
			insertAllotwarehouse() {
				this.selectAllotwarehouse();
				const _this = this
				this.axios.post('http://localhost:8089/cypsi/insertAllotwarehouse', this.form2)
					.then(function(response) {
						console.log(response)
						// var diao = response.data
						// _this.deptDate.push(diao)
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			//调拨新增出库单
			insertSaleDelivery() {
				const _this = this
				this.axios.post('http://localhost:8089/cypsi/insertSaleDelivery', this.chuku)
					.then(function(response) {
						console.log(response)

					}).catch(function(error) {
						console.log(error)
					})
			},

			//调拨新增入库单
			insertGoods() {
				const _this = this
				this.axios.post('http://localhost:8089/cypsi/insertGoods', this.ruku)
					.then(function(response) {
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//调拨单审核
			upd() {
				if (this.multipleSelection.length === 0) {} else {
					this.multipleSelection.forEach(item => {
						this.updateAudit("1", item.channelid)
					});
				}
			},
			updateAudit(approval, channelid) {
				const _this = this
				this.form.approval = approval
				this.form.channelid = channelid
				console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/AllotwarehouseAudit", this.form)
					.then(function(response) {
						_this.selectAllotwarehouse();
					}).catch(function(error) {
						console.log(error)
					})
			},

			// 分页查询所有
			selectAllotwarehouse() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/selectAllotwarehouse", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						var row = this_.tableData
						row.approval = this_.tableData.approval
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 高级查询
			highSelect() {
				if (this.pageInfo.serialNumber == "" && this.pageInfo.documentmaker == "" && this.pageInfo.depotName == "") {
					this.selectBylikeAllotwarehouse();
				} else {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8089/cypsi/selectBylikeAllotwarehouse", {
							params: this.pageInfo,
						})
						.then(function(response) {
							_this.tableData = response.data.list
							_this.pageInfo.total = response.data.total
							// console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			},

			//逻辑删除		调拨单
			del() {
				if (this.multipleSelection.length === 0) {} else {
					this.multipleSelection.forEach(item => {
						this.deleteupdate(item.channelid, "1")
					});
				}
			},
			deleteupdate(channelid, timeLiness) {
				const _this = this
				this.form.channelid = channelid
				this.form.timeLiness = timeLiness
				// console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/DelAllotwarehouse", this.form)
					.then(function(response) {
						_this.selectAllotwarehouse();
					}).catch(function(error) {
						console.log(error)
					})
			},
			
		},

		created() {
			this.selectAllotwarehouse();
			this.selectCangku();
			this.selectProduct();
		},
		computed: {

		}
	}
</script>

<style scoped="scoped">
	.body {
		font-family: "隶体";
	}

	.table {
		margin-top: 10px;
	}
</style>

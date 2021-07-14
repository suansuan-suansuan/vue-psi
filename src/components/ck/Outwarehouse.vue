<template>
	<div class="body">
		<el-row>
			<el-col :span="24">
				<div>
					<div>
						<span style="width: 300px;">
							出库日期：
							<el-date-picker type="date" size="mini" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100px;" v-model="pageInfo.Starttime">
							</el-date-picker>
						</span>
						<span style="width: 300px;">
							至
							<el-date-picker type="date" size="mini" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100px;" v-model="pageInfo.Endtime">
							</el-date-picker>
						</span>
						<span>
							销售人员：
							<el-input style="width: 100px;" clearable size="mini" v-model="pageInfo.salesmen"></el-input>
						</span>
						<span>
							单据备注：
							<el-input style="width: 100px;" clearable size="mini" v-model="pageInfo.remarks"></el-input>
						</span>
						<span style="float: right;">
							<el-button size="mini" type="success" @click="highSelect()">查询</el-button>
							<el-button size="mini" type="info" @click="upd()">出库审核</el-button>
							<el-button size="mini" type="danger" @click="del()">删除</el-button>
						</span>
					</div>

				</div>
				<div class="table">
					<el-table :data="tableData" border @selection-change="handleSelectionChange">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column prop="deliveryOrderId" label="销售出库单编号">
						</el-table-column>
						<el-table-column prop="deliveryOrderTime" label="出库日期">
						</el-table-column>
						<el-table-column prop="salesmen" label="销售人员">
						</el-table-column>
						<el-table-column prop="receivables" label="应收款">
						</el-table-column>
						<el-table-column prop="remarks" label="单据备注">
						</el-table-column>
						<el-table-column label="出库状态">
							<template #default="scope">
								<i class="el-icon-success" v-show="scope.row.deliveryState==1" style="color:#67c23A;margin-left: 20px;"></i>
								<i class="el-icon-warning" v-show="scope.row.deliveryState==0" style="margin-left: 20px;"></i>
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
				tableData: [],
				multipleSelection: [],
				pageInfo: {
					currentPage: 1,
					total: 0,
					Starttime: '',
					Endtime: '',
					salesmen: '',
					remarks: '',
				},
				form: {
					deliveryOrderId: '',
					timeLiness: '',
					approvalState: '',
					deliveryOrderId: '',
					approvalTime: '',
				
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
				this.selectOutwarehouse();
				this.highSelect();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectOutwarehouse();
				this.highSelect();
			},
			// 分页查询所有
			selectOutwarehouse() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/selectOutwarehouse", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						// console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 高级查询
			highSelect() {
				if (this.pageInfo.Starttime == "" && this.pageInfo.Endtime == "" && this.pageInfo.salesmen == "" && this.pageInfo.remarks == "") {
					this.selectOutwarehouse();
				} else {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8089/cypsi/selectBylikeOutwarehouse", {
							params: this.pageInfo,
						})
						.then(function(response) {
							_this.tableData = response.data.list
							_this.pageInfo.total = response.data.total
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			//逻辑删除		出库单
			del() {
				if (this.multipleSelection.length === 0) {
				} else {
					this.multipleSelection.forEach(item => {
						this.deleteupdate(item.deliveryOrderId, "1")
					});
				}
			},
			deleteupdate(deliveryOrderId, timeLiness) {
				const _this = this
				this.form.deliveryOrderId = deliveryOrderId
				this.form.timeLiness = timeLiness
				// console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/DelOutwarehouse", this.form)
					.then(function(response) {
						_this.selectOutwarehouse();
					}).catch(function(error) {
						console.log(error)
					})
			},
			//审核------出库单
			upd() {
				if (this.multipleSelection.length === 0) {
				} else {
					this.multipleSelection.forEach(item => {
						this.updateAudit("1",item.deliveryOrderId)
					});
				}
			},
			updateAudit(deliveryState,deliveryOrderId) {
				const _this = this
				this.form.deliveryOrderId = deliveryOrderId
				this.form.deliveryState = deliveryState
				console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/OutwarehouseAudit", this.form)
					.then(function(response) {
						_this.selectOutwarehouse();
					}).catch(function(error) {
						console.log(error)
					})
			}
		},

		created() {
			this.selectOutwarehouse();
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

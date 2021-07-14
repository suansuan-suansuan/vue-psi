<template>
	<div class="body">
		<el-row>
			<el-col :span="24">
				<div>
					<div>
						<span>
							仓库：
							<el-input style="width: 200px;" clearable size="mini" v-model="pageInfo.depotName"></el-input>
						</span>
						<span>
							产品：
							<el-input style="width: 200px;" clearable size="mini" v-model="pageInfo.productName"></el-input>
						</span>
				
						<span style="float: right;">
							<el-button size="mini" type="success" @click="highSelect()">查询</el-button>
							<el-button size="mini" type="danger" @click="del()">删除</el-button>
						</span>
					</div>

				</div>
				<div class="table">
					<el-table :data="tableData" border @selection-change="handleSelectionChange">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column prop="inventoryId" label="库存编号">
						</el-table-column>
						<el-table-column prop="baseDepot.depotName" label="仓库">
						</el-table-column>
						<el-table-column prop="baseProduct.productName" label="产品">
						</el-table-column>
						<el-table-column prop="inventoryQuantity" label="库存量">
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
				pageInfo: {
					depotName: '',
					productName: '',
					currentPage: 0,
					pagesize: 3,
					total: 0,
				},
				form: {
					inventoryId: '',
					timeLiness: '',
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
				this.selectChangewarehouse();
				this.highSelect();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectChangewarehouse();
				this.highSelect();
			},
			// 分页查询所有
			selectChangewarehouse() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/selectChangewarehouse", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 高级查询
			highSelect() {
				if (this.pageInfo.depotName == "" && this.pageInfo.productName == "") {
					this.selectChangewarehouse();
				} else {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8089/cypsi/selectBylikeAllotwarehouse", {
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
			//逻辑删除		库存表
			del() {
				if (this.multipleSelection.length === 0) {
				} else {
					this.multipleSelection.forEach(item => {
						this.deleteupdate(item.inventoryId, "1")
					});
				}
			},
			deleteupdate(inventoryId, timeLiness) {
				const _this = this
				this.form.inventoryId = inventoryId
				this.form.timeLiness = timeLiness
				// console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/DelChangewarehouse", this.form)
					.then(function(response) {
						_this.selectChangewarehouse();
					}).catch(function(error) {
						console.log(error)
					})
			},
		},


		created() {
			this.selectChangewarehouse();
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

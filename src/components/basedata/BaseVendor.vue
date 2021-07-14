<template>
	<div id="vendor">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="6">
						<el-input style="width: 260px; float: left" class="inline-input" placeholder="请输入供应商编号或供应商名"
							v-model="searchInput" size="medium">
							<template #append>
								<el-button icon="el-icon-search" size="small" @click="search"></el-button>
							</template>
						</el-input>
					</el-col>
					<el-col :span="14"></el-col>
					<el-col :span="2">
						<el-button size="medium" type="danger" v-show="delbut" @click="pelchVendor">批量删除
						</el-button>
					</el-col>
					<el-col :span="2">
						<el-button @click="addVendor" style="float: right;" size="medium" type="primary">新增
						</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" :height="tableHeight" tooltip-effect="dark"
					style="width: 100%; height: 490px;" @selection-change="SelectFun">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="operate" label="操作" width="135" show-overflow-tooltip>
						<template #default="scope">
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
								<el-button size="mini" circle type="primary" icon="el-icon-edit-outline"
									@click="editVendor">
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top">
								<el-button size="mini" circle type="success" icon="el-icon-delete-solid"
									@click="delVendor(scope.row.vendorId)">
								</el-button>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="vendorNumber" label="供应商编号" width="138">
					</el-table-column>
					<el-table-column label="供应商名称" width="120" prop="vendorName">
					</el-table-column>
					<el-table-column prop="fundAccount" label="账号" width="120" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="uid" label="负责人" width="120" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系人姓名" width="120" prop="contactName" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系地址" width="120" prop="contactAddress" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系电话" width="124" prop="contactNumber" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="remarks" label="备注" width="160" show-overflow-tooltip>
					</el-table-column>
				</el-table>
				<el-pagination :current-page="queryForm.pageNum" :page-sizes="[3, 6, 9, 12]"
					:page-size="queryForm.pageSize" layout=" total, sizes, prev, pager, next, jumper"
					:total="queryForm.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "vendor",
		data() {
			return {
				queryForm: {
					pageNum: 1,
					pageSize: 3,
					total: '',
					//workPointId: 1,
					//currentPage,pagesize:对应后端的
				},
				searchInput: '',
				delbut: false,
				tableData: [{}],
				state: true,
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/cypsi/All", {
				params: {
					"pageNum": this.queryForm.pageNum,
					"pageSize": this.queryForm.pageSize,
				}
			}).then(function(res) {
				console.log(res.data)
				_this.queryForm.total = res.data.total
				_this.tableData = res.data.list
			}).catch(function(err) {
				console.log(err)
			})
		},
		methods: {

			//当前页
			handleCurrentChange(pageNum) {
				this.queryForm.pageNum = pageNum
				if (this.queryType == 'search')
					this.search()
			},

			//页大小
			handleSizeChange(pagesize) {
				this.queryForm.pagesize = pagesize
				if (this.queryType == 'search')
					this.search()
			},

			//搜索框查询
			search() {
				const _this = this
				this.queryForm.vendorNumber = this.searchInput
				this.queryForm.vendorName = this.searchInput
				this.axios.get("http://localhost:8089/cypsi/search", {
					params: this.queryForm
				}).then(function(res) {
					console.log(res.data)
					_this.queryForm.total = res.data.total
					_this.tableData = res.data.list
				}).catch(function(err) {
					console.log(err)
				})
			},

			//删除操作
			delVendor(val) {
				const _this=this
				this.$confirm('此操作将会删除该数据且不能撤回，是否继续？', '提示', {
					confirmButtonTest: '确定',
					cancelButtonTest: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						url: "http://localhost:8089/cypsi/baseVendor",
						method: 'Delete',
						params: {
							"id": val
						}
					}).then(response => {
						this.loadData()
						this.$message({
							type: "success",
							message: '删除成功'
						})
					}).catch(() => {
						this.message({
							type: "info",
							message: '已取消操作'
						})
					})
				})
			}
		}
	}
</script>

<style>
	#vendor .el-container {
		height: 100%;
		width: 100%;
	}

	#vendor .el-header,
	#vendor .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	#vendor .el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
	}

	#vendor .el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 600px;

	}

	#vendor .el-row {
		margin-bottom: 5px;
	}

	#vendor .el-col {
		border-radius: 4px;
	}

	#vendor .row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#vendor .item {
		margin-top: 10px;
		margin-right: 10px;
	}

	/* #vendor .el-table td,
	#vendor .table th {
		padding: 0 4px;
		height: 10px;
		width: 20px;
	} */

	#vendor .font-style {
		text-align: right;
		vertical-align: middle;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>

<template>
	<div id="depot">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="6">
						<el-input style="width: 180px; float: left" class="inline-input" placeholder="请输入仓库名称"
							v-model="searchInput" size="medium">
							<template #append>
								<el-button icon="el-icon-search" size="small" @click="search"></el-button>
							</template>
						</el-input>
					</el-col>
					<el-col :span="14"></el-col>
					<el-col :span="2">
						<el-button size="medium" type="danger" v-show="delbut" @click="pelchDepot">批量删除
						</el-button>
					</el-col>
					<el-dialog v-bind="$attrs" v-model="Depot" @open="onOpen" @close="onClose" title="新增仓库">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="仓库编号：" prop="depotId">
										<el-input v-model="formData.depotId" :disabled='true' clearable
											:style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="仓库名称：" prop="depotName">
										<el-input v-model="formData.depotName" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="负责人：" prop="uid">
										<el-select v-model="formData.uid" value-key="uid" clearable placeholder="请选择"
											@change="selectUser" @click="findUser()" :style="{width: '100%'}">
											<el-option v-for="item in user" :key="item.uid" :label="item.uname"
												:value="item.uid" />


										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系电话：" prop="ontactNumber">
										<el-input v-model="formData.ontactNumber" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="备注：" prop="remarks">
										<el-input v-model="formData.remarks" type="textarea"
											:autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系地址：" prop="depotAddress">
										<el-input v-model="formData.depotAddress" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
							</el-form>
						</el-row>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="Depot=false">取 消</el-button>
								<el-button type="primary" @click="addDepot();Depot = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<el-dialog v-bind="$attrs" v-model="Depot1" @open="onOpen" @close="onClose" title="修改仓库">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData1" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="仓库编号：" prop="depotId">
										<el-input v-model="formData1.depotId" :disabled='true' clearable
											:style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="仓库名称：" prop="depotName">
										<el-input v-model="formData1.depotName" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="负责人：" prop="uid">
										<el-select v-model="formData1.uid" value-key="uid" clearable placeholder="请选择"
											@click="findUser()" :style="{width: '100%'}">
											<el-option v-for="item in user" :key="item.uid" :label="item.uname"
												:value="item.uid" />


										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系电话：" prop="ontactNumber">
										<el-input v-model="formData1.ontactNumber" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="备注：" prop="remarks">
										<el-input v-model="formData1.remarks" type="textarea"
											:autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系地址：" prop="depotAddress">
										<el-input v-model="formData1.depotAddress" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
							</el-form>
						</el-row>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="Depot1=false">取 消</el-button>
								<el-button type="primary" @click="updateDepo();Depot1=false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<el-col :span="2">
						<el-button @click="OpenDepot" style="float: right;" size="medium" type="primary">新增
						</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" :height="tableHeight" tooltip-effect="dark"
					style="width: 100%; height:460px; max-height: 460px; text-align: center;" @selection-change="SelectFun">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="operate" label="操作" width="135" show-overflow-tooltip>
						<template #default="scope">
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
								<el-button size="mini" circle type="primary" icon="el-icon-edit-outline"
									@click="editDepot(scope.$index,scope.row);Depot1=true">
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top">
								<el-button size="mini" circle type="success" icon="el-icon-delete-solid" content="删除"
									@click="delDepot(scope.row.depotId)">
								</el-button>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="depotId" label="仓库编号" width="150">
					</el-table-column>
					<el-table-column prop="depotName" label="仓库名称" width="155">
					</el-table-column>
					<el-table-column label="仓库负责人" width="150" prop="uid">
					</el-table-column>
					<el-table-column prop="ontactNumber" label="联系电话" width="160" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="仓库地址" width="160" prop="depotAddress" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="remarks" label="备注" width="220" show-overflow-tooltip>
					</el-table-column>
				</el-table>
				<el-pagination :current-page="queryForm.pageNum" :page-sizes="[10, 20, 40, 80]"
					:page-size="queryForm.pageSize" layout=" total, sizes, prev, pager, next, jumper"
					:total="queryForm.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "depot",
		data() {
			return {
				isAdd: false,
				user: [],
				formData1:{
					uname: '',
					depotId: '',
					depotName: '',
					uid: '',
					ontactNumber: '',
					depotAddress: '',
					remarks: '',
				},
				formData:{
					uname: '',
					depotId: '',
					depotName: '',
					uid: '',
					ontactNumber: '',
					depotAddress: '',
					remarks: '',
				},
				rules: {
					depotId: [{
						required: true,
						message: '请输入仓库编号',
						trigger: 'blur'
					}],
					depotName: [{
						required: true,
						message: '请输入仓库名',
						trigger: 'blur'
					}],
					uid: [{
						required: true,
						message: '请选择仓库责任人',
						trigger: 'change'
					}],
					ontactNumber: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}, {
						pattern: /^1(3|4|5|7|8|9)\d{9}$/,
						message: '手机号格式错误',
						trigger: 'blur'
					}],
					depotAddress: [{
						required: true,
						message: '请填写联系地址',
						trigger: 'blur'
					}],
					remarks: [],
				},
				Depot: false,
				Depot1: false,
				queryForm: {
					pageNum: 1,
					pageSize: 10,
					total: '',
					//workPointId: 1,
					//currentPage,pagesize:对应后端的
				},
				docuNumSequence: '',
				queryType: '',
				searchInput: '',
				delbut: false,
				tableData: [{}],
				state: true,
			}
		},
		created() {
			this.show()
		},
		methods: {
			show() {
				const _this = this
				this.axios.get("http://localhost:8089/cypsi/BaseDepotController/baseDepot", {
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
			handleCurrentChange(pageNum) {
				this.queryForm.pageNum = pageNum
				if (this.queryType == 'search')
					this.search()
			},
			handleSizeChange(pagesize) {
				this.queryForm.pagesize = pagesize
				if (this.queryType == 'search')
					this.search()
			},
			search() {
				const _this = this
				this.queryForm.depotName = this.searchInput
				this.axios.get("http://localhost:8089/cypsi/BaseDepotController/baseDepot/search", {
					params: this.queryForm
				}).then(function(res) {
					console.log(res.data)
					_this.queryForm.total = res.data.total
					_this.tableData = res.data.list
				}).catch(function(err) {
					console.log(err)
				})
			},
			editDepot(a,b){
				this.formData1=b
				this.Depot=false
			},
			//修改仓库
			updateDepo() {
				this.axios({
					url: 'http://localhost:8089/cypsi/BaseDepotController/baseDepot',
					method: 'put',
					data: this.formData1
				}).then(res => {
					console.log(res)
					this.$message({
						type: 'success',
						message: '仓库信息修改成功！'
					})
					this.tableData = res.data
					//_this.Depot1 = false
					this.show()
				})
			},
			//删除仓库
			delDepot(val) {
				const _this = this
				this.$confirm('确定要删除该仓库，是否继续？', '提示', {
					confirmButtonTest: '确定',
					cancelButtonTest: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						url: "http://localhost:8089/cypsi/BaseDepotController/baseDepot",
						method: 'Delete',
						params: {
							"id": val
						}
					}).then(response => {
						this.show()
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
			},
			//点击新增按钮弹出对话框
			OpenDepot() {
				this.Depot = true
				this.getDocuDate("CK")
			},

			//设置仓库编号
			getDocuDate(prefix) {
				this.formData.depotId = prefix + "-"
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/BaseDepotController/baseDepot/search',
					params: {
						'depotId': this.formData.depotId
					}
				}).then(res => {
					console.log(res)
					const docuNumSequence = (Array(5).join(0) + (res.data.list.length) + 1).slice(-5)
					this.formData.depotId = this.formData.depotId + docuNumSequence
				}).catch(err => {
					console.log(err)
				})
			},
			addDepot() {
				console.log(this.formData)
				this.axios.post("http://localhost:8089/cypsi/BaseDepotController/baseDepot",
					this.formData
				).then(res => {
					this.$message({
						type: 'success',
						message: '仓库信息新增成功！'
					})
					console.log(res)
					this.queryForm.total = res.data.total
					this.tableData = res.data
					this.show()
				})
			},

			//id绑定用户名
			selectUser() {
				this.user.forEach(e =>{
					if (e.uid == this.formData.uid)
					  this.formData.uname = e.uname
				})
			},
			//查询责任人
			findUser() {
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/BaseDepotController/user',
				}).then(res => {
					console.log(res)
					console.log("2222")
					this.user = res.data
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	#depot .el-container {
		height: 100%;
		width: 100%;
	}

	#depot .el-header,
	#depot .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	#depot .el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
	}

	#depot .el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 600px;

	}

	#depot .el-row {
		margin-bottom: 5px;
	}

	#depot .el-col {
		border-radius: 4px;
	}

	#depot .row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#depot .item {
		margin-top: 10px;
		margin-right: 10px;
	}

	/* #depot .el-table td,
	#depot .table th {
		padding: 0 2px;
		height: 10px;
		width: 20px;
	} */

	#depot .font-style {
		text-align: right;
		vertical-align: middle;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>

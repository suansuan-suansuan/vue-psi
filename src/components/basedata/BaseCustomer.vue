<template>
	<div id="customer">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="6">
						<el-input style="width: 250px; float: left" class="inline-input" placeholder="请输入客户编号或客户名称"
							v-model="searchInput" size="medium">
							<template #append>
								<el-button icon="el-icon-search" size="small" @click="search"></el-button>
							</template>
						</el-input>
					</el-col>
					<el-col :span="14"></el-col>
					<el-col :span="2">
						<el-button size="medium" type="danger" v-show="delbut" @click="Pldelete">批量删除
						</el-button>
					</el-col>
					<el-col :span="2">
						<el-button @click="openCustomer" style="float: right;" size="medium" type="primary">新增
						</el-button>
					</el-col>
					<el-dialog v-bind="$attrs" v-model="customer" @open="onOpen" @close="onClose" title="新增客户">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="客户编号：" prop="customerNumber">
										<el-input v-model="formData.customerNumber" :disabled='true' clearable
											:style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="客户名称：" prop="customerName">
										<el-input v-model="formData.customerName" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="负责人：" prop="uid">
										<el-select v-model="formData.uid" value-key="uid" clearable placeholder="请选择"
											@click="findUser()" :style="{width: '100%'}">
											<el-option v-for="item in user" :key="item.uid" :label="item.uname"
												:value="item.uid" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系电话：" prop="contactNumber">
										<el-input v-model="formData.contactNumber" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系人姓名：" prop="contact">
										<el-input v-model="formData.contact" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="20">
									<el-form-item label="联系地址：" prop="contactAddress">
										<el-input v-model="formData.contactAddress" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="20">
									<el-form-item label="备注：" prop="remarks">
										<el-input v-model="formData.remarks" type="textarea" placeholder="请输入备注："
											:autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
							</el-form>
						</el-row>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="customer = false">取 消</el-button>
								<el-button type="primary" @click="addCustomer();customer = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<el-dialog v-bind="$attrs" v-model="customer1" @open="onOpen" @close="onClose" title="修改用户">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData1" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="客户编号：" prop="customerNumber">
										<el-input v-model="formData1.customerNumber" :disabled='true' clearable
											:style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="客户名称：" prop="customerName">
										<el-input v-model="formData1.customerName" clearable :style="{width: '100%'}">
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
									<el-form-item label="联系电话：" prop="contactNumber">
										<el-input v-model="formData1.contactNumber" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="联系人姓名：" prop="contact">
										<el-input v-model="formData1.contact" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="20">
									<el-form-item label="联系地址：" prop="contactAddress">
										<el-input v-model="formData1.contactAddress" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="20">
									<el-form-item label="备注：" prop="remarks">
										<el-input v-model="formData1.remarks" type="textarea" placeholder="请输入备注："
											:autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
							</el-form>
						</el-row>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="customer1 = false">取 消</el-button>
								<el-button type="primary" @click="EditCustomer();customer1 =false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" :height="tableHeight" tooltip-effect="dark"
					style="width: 100%; height: 490px;" @selection-change="SelectFun">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="operate" label="操作" width="135" show-overflow-tooltip>
						<template #default="scope">
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
								<el-button size="mini" circle type="primary" icon="el-icon-edit-outline"
									@click="upCustomer(scope.$index,scope.row);customer1=true">
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top">
								<el-button size="mini" circle type="success" icon="el-icon-delete-solid"
									@click="delCustomer(scope.row.customerId)">
								</el-button>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="customerNumber" label="客户编号" width="165">
					</el-table-column>
					<el-table-column label="客户名称" width="130" prop="customerName">
					</el-table-column>
					<el-table-column prop="uid" label="客户负责人" width="130" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系人姓名" width="130" prop="contact" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系地址" width="130" prop="contactAddress" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="联系电话" width="130" prop="contactNumber" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="remarks" label="备注" width="185" show-overflow-tooltip>
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
		name: "customer",
		data() {
			return {
				// upCustomer: {},
				user: [],
				customer1: false,
				customer: false,
				formData1:{
					uname: '',
					customerNumber:'',
					customerName: '',
					uid: '',
					contactNumber:'',
					contact: '',
					contactAddress:'',
					remarks: '',
				},
				formData: {
					uname: '',
					customerNumber:'',
					customerName: '',
					uid: '',
					contactNumber:'',
					contact: '',
					contactAddress:'',
					remarks: '',
				},
				rules: {
					customerNumber: [{
						required: true,
						message: '请输入客户编号',
						trigger: 'blur'
					}],
					customerName: [{
						required: true,
						message: '请输入客户姓名',
						trigger: 'blur'
					}],
					uid: [{
						required: true,
						message: '请选择负责人',
						trigger: 'change'
					}],
					contactNumber: [{
						required: true,
						message: '请输入联系人电话',
						trigger: 'blur'
					}, {
						pattern: /^1(3|4|5|7|8|9)\d{9}$/,
						message: '手机号格式错误',
						trigger: 'blur'
					}],
					contact: [],
					contactAddress: [{
						required: true,
						message: '请输入联系人地址',
						trigger: 'blur'
					}],
					remarks: [],
				},
				docuNumSequence: '',
				queryForm: {
					pageNum: 1,
					pageSize: 10,
					total: '',
					//workPointId: 1,
					//currentPage,pagesize:对应后端的
				},
				queryType: '',
				searchInput: '',
				delbut: false,
				tableData: [{}]
			}
		},
		created() {
			this.show()
		},
		methods: {
			//分页查询
			show() {
				const _this = this
				this.axios.get("http://localhost:8089/cypsi/BaseCustomer/baseCustomer", {
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
				this.queryForm.customerNumber = this.searchInput
				this.queryForm.customerName = this.searchInput
				this.axios.get("http://localhost:8089/cypsi/BaseCustomer/baseCustomer/search", {
					params: this.queryForm
				}).then(function(res) {
					console.log(res.data)
					_this.queryForm.total = res.data.total
					_this.tableData = res.data.list
				}).catch(function(err) {
					console.log(err)
				})
			},
			//设置客户编号
			getDocuDate(prefix) {
				this.formData.customerNumber = prefix + "-"
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/BaseCustomer/baseCustomer/search',
					params: {
						'customerNumber': this.formData.customerNumber
					}
				}).then(res => {
					console.log(res)
					const docuNumSequence = (Array(5).join(0) + (res.data.list.length) + 1).slice(-5)
					this.formData.customerNumber = this.formData.customerNumber + docuNumSequence
				}).catch(err => {
					console.log(err)
				})
			},
			openCustomer() {
				this.customer = true
				this.getDocuDate("KH")
			},

			upCustomer(a, b) {
				this.formData1 = b;
				this.customer = false
			},

			//删除客户
			delCustomer(val) {
				const _this = this
				this.$confirm('确定要删除该客户，是否继续？', '提示', {
					confirmButtonTest: '确定',
					cancelButtonTest: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						url: "http://localhost:8089/cypsi/BaseCustomer/baseCustomer",
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
			findUser() {
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/BaseDepotController/user',
				}).then(res => {
					console.log(res.data)
					console.log(res)
					this.user = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			//新增数据
			addCustomer() {
				const _this = this
				this.axios.post("http://localhost:8089/cypsi/BaseCustomer/baseCustomer", this.formData)
					.then(res => {
						// this.customer = false
						this.$message({
							type: 'success',
							message: '客户信息新增成功！'
						})
						this.show()
						this.queryForm.total = rse.data.total
						this.tableData = res.data
					}).catch(err => {
						console.log(err)
					})
			},
			//修改数据
			EditCustomer() {
				this.axios({
					url: 'http://localhost:8089/cypsi/BaseCustomer/baseCustomer',
					method: 'put',
					data: this.formData1
				}).then(res => {
					console.log(res)
					this.show()
					this.$message({
						type: 'success',
						message: '商户修改成功！'
					})
					// this.customer1=false
					this.tableData = res.data
				})
			}
		}
	}
</script>

<style>
	#customer .el-container {
		height: 100%;
		width: 100%;
	}

	#customer .el-header,
	#customer .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	#customer .el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
	}

	#customer .el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 600px;

	}

	#customer .el-row {
		margin-bottom: 5px;
	}

	#customer .el-col {
		border-radius: 4px;
	}

	#customer .row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#customer .item {
		margin-top: 10px;
		margin-right: 10px;
	}

	/* #customer .el-table td,
	#customer .table th {
		padding: 0 2px;
		height: 10px;
		width: 20px;
	} */

	#customer .font-style {
		text-align: right;
		vertical-align: middle;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>

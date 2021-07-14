<template>
	<div id="product">
		<el-container>
			<el-main>
				<el-row>
					<el-col :span="6">
						<el-input style="width: 260px; float: left" class="inline-input" placeholder="请输入商品编号或商品名称"
							v-model="searchInput" size="medium">
							<template #append>
								<el-button icon="el-icon-search" size="small" @click="search"></el-button>
							</template>
						</el-input>
					</el-col>
					<el-col :span="14"></el-col>
					<el-col :span="2">
						<el-button size="medium" type="danger" v-show="delbut" @click="pelchProduct">批量删除
						</el-button>
					</el-col>

					<el-col :span="2">
						<el-button @click="SalProduct" style="float: right;" size="medium" type="primary">新增
						</el-button>
					</el-col>
					<el-dialog v-bind="$attrs" v-model="Product" v-on="$listeners" @open="onOpen" @close="onClose"
						title="新增产品">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="产品编号：" prop="productNumber">
										<el-input v-model="formData.productNumber" placeholder="" :disabled='true'
											clearable :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="商品名：" prop="productName">
										<el-input v-model="formData.productName" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="单位：" prop="unitId">
										<el-select v-model="formData.unitId" @click="findUnit()" clearable
											:style="{width: '100%'}">
											<el-option v-for="item in unit" :key="item.unitId" :label="item.unitName"
												:value="item.unitId" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="规格型号：" prop="productSpec">
										<el-input v-model="formData.productSpec" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="单价：" prop="purchaseMoney">
										<el-input-number v-model="formData.purchaseMoney" :step='1' :precision='2'
											controls-position=right>
										</el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="成本价：" prop="costPrice">
										<el-input-number v-model="formData.costPrice" :precision='2'
											controls-position=right>
										</el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="售价：" prop="purchaseUnitPrice">
										<el-input-number v-model="formData.purchaseUnitPrice" :step='1' :precision='2'
											controls-position=right></el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="过期时间：" prop="expiration">
										<el-date-picker type="datetime" placeholder="选择日期" v-model="formData.expiration"
											clearable style="width: 100%; float: left;"></el-date-picker>
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
								<el-button @click="Product=false">取 消</el-button>
								<el-button type="primary" @click="addDepot();Product = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<el-dialog v-bind="$attrs" v-model="Product1" v-on="$listeners" @open="onOpen" @close="onClose"
						title="修改产品">
						<el-row :gutter="55">
							<el-form ref="Form" :model="formData1" :rules="rules" size="medium" label-width="100px">
								<el-col :span="10">
									<el-form-item label="产品编号：" prop="productNumber">
										<el-input v-model="formData1.productNumber" placeholder="" :disabled='true'
											clearable :style="{width: '100%'}"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="商品名：" prop="productName">
										<el-input v-model="formData1.productName" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="单位：" prop="unitId">
										<el-select v-model="formData1.unitId" @click="findUnit()" clearable
											:style="{width: '100%'}">
											<el-option v-for="item in unit" :key="item.unitId" :label="item.unitName"
												:value="item.unitId" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="规格型号：" prop="productSpec">
										<el-input v-model="formData1.productSpec" clearable :style="{width: '100%'}">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="单价：" prop="purchaseMoney">
										<el-input-number v-model="formData1.purchaseMoney" :step='1' :precision='2'
											controls-position=right>
										</el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="成本价：" prop="costPrice">
										<el-input-number v-model="formData1.costPrice" :precision='2'
											controls-position=right>
										</el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="售价：" prop="purchaseUnitPrice">
										<el-input-number v-model="formData1.purchaseUnitPrice" :step='1' :precision='2'
											controls-position=right></el-input-number>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="过期时间：" prop="expiration">
										<el-date-picker v-model="formData1.expiration" type="date" clearable
											style="width: 100%; float: left;" placeholder="选择日期">
										</el-date-picker>
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
								<el-button @click="Product1=false">取 消</el-button>
								<el-button type="primary" @click="updateDepot();Product1=false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<el-table ref="multipleTable" :data="tableData" :height="tableHeight" tooltip-effect="dark"
						style="width: 100%; height: 490px; text-align: center;" @selection-change="SelectFun">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="operate" label="操作" width="120" show-overflow-tooltip>
							<template #default="scope">
								<el-tooltip class="item" effect="dark" content="编辑" placement="top">
									<el-button size="mini" circle type="primary" icon="el-icon-edit-outline"
										@click="editProduct(scope.$index,scope.row);Product1=true">
									</el-button>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" content="删除" placement="top">
									<el-button size="mini" circle type="success" icon="el-icon-delete-solid"
										content="删除" @click="delProduct(scope.row.productId)">
									</el-button>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column prop="productNumber" label="商品编号" width="130">
						</el-table-column>
						<el-table-column label="商品名称" width="110" prop="productName">
						</el-table-column>
						<el-table-column label="规格型号" width="100" prop="productSpec">
						</el-table-column>
						<el-table-column label="单位" width="100" prop="unitId">
						</el-table-column>
						<el-table-column prop="purchaseMoney" label="单价" width="100" show-overflow-tooltip>
						</el-table-column>
						<el-table-column label="成本价" width="90" prop="costPrice" show-overflow-tooltip>
						</el-table-column>
						<el-table-column label="售价" width="90" prop="purchaseUnitPrice" show-overflow-tooltip>
						</el-table-column>
						<el-table-column :formatter="dateFormat" label="创建时间" prop="expiration" width="150"
							show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="remarks" label="备注" width="160" show-overflow-tooltip>
						</el-table-column>
					</el-table>
					<el-pagination :current-page="queryForm.pageNum" :page-sizes="[10, 20, 40, 80]"
						:page-size="queryForm.pageSize" layout=" total, sizes, prev, pager, next, jumper"
						:total="queryForm.total" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" />
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		name: "product",
		data() {
			return {
				unit: [],
				formLabelWidth: '120px',
				Product: false,
				Product1: false,
				queryForm: {
					pageNum: 1,
					pageSize: 10,
					total: '',
					//workPointId: 1,
					//currentPage,pagesize:对应后端的
				},
				searchInput: '',
				delbut: false,
				tableData: [{}],
				state: true,
				docuNumSequence: '',
				formData1: {
					productNumber: undefined,
					productName: undefined,
					unitId: undefined,
					productSpec: undefined,
					purchaseMoney: 1,
					costPrice: 1,
					purchaseUnitPrice: 1,
					expiration: null,
					remarks: undefined
				},
				formData: {
					productNumber: undefined,
					productName: undefined,
					unitId: undefined,
					productSpec: undefined,
					purchaseMoney: 1,
					costPrice: 1,
					purchaseUnitPrice: 1,
					expiration: null,
					remarks: undefined,
				},
				rules: {
					productNumber: [{
						required: true,
						message: '请输入产品编号：',
						trigger: 'blur'
					}],
					productName: [{
						required: true,
						message: '请输入产品名称：',
						trigger: 'blur'
					}],
					unitId: [{
						required: true,
						message: '请选择单位',
						trigger: 'change'
					}],
					productSpec: [{
						required: true,
						message: '请输入规格型号',
						trigger: 'blur'
					}],
					purchaseMoney: [{
						required: true,
						message: '',
						trigger: 'blur'
					}],
					costPrice: [{
						required: true,
						message: '',
						trigger: 'blur'
					}],
					purchaseUnitPrice: [{
						required: true,
						message: '',
						trigger: 'blur'
					}],
					expiration: [{
						required: true,
						message: '',
						trigger: 'change'
					}],
					remarks: [],
				}
			}
		},
		created() {
			this.show()
		},
		methods: {
			//设置商品编号
			getDocuDate(prefix) {
				this.formData.productNumber = prefix + "-"
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/baseProduct/baseProduct/search',
					params: {
						'productNumber': this.formData.productNumber
					}
				}).then(res => {
					console.log(res)
					const docuNumSequence = (Array(5).join(0) + (res.data.list.length) + 1).slice(-5)
					this.formData.productNumber = this.formData.productNumber + docuNumSequence
				}).catch(err => {
					console.log(err)
				})
			},
			SalProduct() {
				this.Product = true
				this.getDocuDate("CP")
			},
			editProduct(a, b) {
				this.formData1 = b
				this.Product = false
			},
			show() {
				const _this = this
				this.axios.get("http://localhost:8089/cypsi/baseProduct/baseProduct", {
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
			dateFormat(row, column) {
				var date = row[column.property];
				if (date == undefined) {
					return ''
				}
				return moment(date).format("YYYY-MM-DD HH:mm")
			},
			findUnit() {
				this.axios({
					method: 'get',
					url: 'http://localhost:8089/cypsi/select',
				}).then(res => {
					console.log(res.data)
					console.log(res)
					this.unit = res.data
				}).catch(err => {
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
				this.queryForm.productNumber = this.searchInput
				this.queryForm.productName = this.searchInput
				this.axios.get("http://localhost:8089/cypsi/baseProduct/baseProduct/search", {
					params: this.queryForm
				}).then(function(res) {
					console.log(res.data)
					_this.queryForm.total = res.data.total
					_this.tableData = res.data.list
				}).catch(function(err) {
					console.log(err)
				})
			},
			//删除客户
			delProduct(val) {
				const _this = this
				this.$confirm('确定要删除该客户，是否继续？', '提示', {
					confirmButtonTest: '确定',
					cancelButtonTest: '取消',
					type: 'warning'
				}).then(() => {
					this.axios({
						url: "http://localhost:8089/cypsi/baseProduct/baseProduct",
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
			updateDepot() {
				this.axios({
					url: 'http://localhost:8089/cypsi/baseProduct/baseProduct',
					method: 'put',
					data: this.formData1
				}).then(res => {
					console.log(res)
					this.$message({
						type: 'success',
						message: '产品修改成功！'
					})
					this.show()
					// this.customer1=false
					this.tableData = res.data
				})
			},
			addDepot() {
				const _this = this
				this.axios.post("http://localhost:8089/cypsi/baseProduct/baseProduct", this.formData)
					.then(res => {
						// this.customer = false
						this.$message({
							type: 'success',
							message: '产品信息新增成功！'
						})
						this.show()
						// this.Product = false
						this.queryForm.total = res.data.total
						this.tableData = res.data
					}).catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style>
	#product .el-container {
		height: 100%;
		width: 100%;
	}

	#product .el-header,
	#product .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	#product .el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
	}

	#product .el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 600px;

	}

	#product .el-row {
		margin-bottom: 5px;
	}

	#product .el-col {
		border-radius: 4px;
	}

	#product .row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#product .item {
		margin-top: 10px;
		margin-right: 10px;
	}

	/* #product .el-table td,
	#product .table th {
		padding: 0 2px;
		height: 10px;
		width: 20px;
	} */

	#product .font-style {
		text-align: right;
		vertical-align: middle;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>

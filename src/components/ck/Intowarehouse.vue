<template>
	<div class="body">
		<el-row>
			<el-col :span="24">
				<div>
					<div>
						<span>
							入库编号：
							<el-input style="width: 100px;" clearable size="mini" v-model="pageInfo.goodsState"></el-input>
						</span>
						<span>
							入库状态：
							<el-select style="width: 100px;" size="mini" clearable  v-model="pageInfo.goodsZt">
								<el-option label="已入库" value="1"></el-option>
								<el-option label="未入库" value="0"></el-option>
							</el-select>
						</span>
						<span style="width: 300px;">
							入库日期：
							<el-date-picker type="date" size="mini" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100px;" v-model="pageInfo.Starttime">
							</el-date-picker>
						</span>
						<span style="width: 300px;">
							至
							<el-date-picker type="date" size="mini" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100px;" v-model="pageInfo.Endtime">
							</el-date-picker>
						</span>

						<span style="float: right;">
							<el-button size="mini" type="success" @click="highSelect()">查询</el-button>
							<el-button size="mini" type="info" @click="upd()">入库审核</el-button>
							<el-button size="mini" type="danger" @click="del()">删除</el-button>
						</span>
					</div>

				</div>
				<div class="table">
					<el-table :data="tableData" border @selection-change="handleSelectionChange">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column prop="puorderId" label="入库编号">
						</el-table-column>
						<el-table-column prop="puorderTimestamp" label="入库时间">
						</el-table-column>
						<el-table-column label="入库状态">
							<template #default="scope">
								<i class="el-icon-success" v-show="scope.row.goodsZt==1" style="color:#67c23A;margin-left: 20px;"></i>
								<i class="el-icon-warning" v-show="scope.row.goodsZt==0" style="margin-left: 20px;"></i>
							</template>
						</el-table-column>
						<el-table-column prop="explain" label="说明">
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
					currentPage: 1,
					pagesize: 3,
					total: 0,
					goodsState: '',
					Starttime: '',
					Endtime: '',
					goodsZt: '',
							},
				form: {
					goodsId: '',
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
				this.GoselectAll2();
				this.highSelect();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.GoselectAll2();
				this.highSelect();
			},
			// 分页查询所有
			GoselectAll2() {
				const this_ = this
				this.axios.get("http://localhost:8089/cypsi/test/GoselectAll2", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						// var row = this_.tableData
						// row.approval = this_.tableData.approval
						// row.goodsZt = this_.tableData.goodsZt
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 高级查询 
			highSelect() {
				if (this.pageInfo.Starttime == "" && this.pageInfo.Endtime == "" && this.pageInfo.goodsZt == "" && this.pageInfo.goodsState ==
					"") {
					this.GoselectAll2();
				} else {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8089/cypsi/test/selectBylikeGoods", {
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
			//逻辑删除		入库单
			del() {
				if (this.multipleSelection.length === 0) {
				} else {
					this.multipleSelection.forEach(item => {
						this.deleteupdate(item.goodsId, "1")
					});
				}
			},
			deleteupdate(goodsId, timeLiness) {
				const _this = this
				this.form.goodsId = goodsId
				this.form.timeLiness = timeLiness
				// console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/test/DelGoods", this.form)
					.then(function(response) {
						_this.GoselectAll2();
					}).catch(function(error) {
						console.log(error)
					})
			},
			//审核------入库单
			upd() {
				if (this.multipleSelection.length === 0) {} else {
					this.multipleSelection.forEach(item => {
						this.GoodsAudit("1", item.goodsId)
					});
				}
			},
			GoodsAudit(goodsZt, goodsId) {
				const _this = this
				this.form.goodsId = goodsId
				this.form.goodsZt = goodsZt
				console.log(this.form)
				this.axios.put("http://localhost:8089/cypsi/test/GoodsAudit", this.form)
					.then(function(response) {
						_this.GoselectAll2();
					}).catch(function(error) {
						console.log(error)
					})
			}
		},

		created() {
			this.GoselectAll2();
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

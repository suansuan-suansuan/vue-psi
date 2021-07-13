<template>
	<div>
		<el-input :label-width="formLabelWidth"></el-input>
		<el-button>查询</el-button>

	</div>
	<!-- 显示 -->
	<el-table border :header-cell-style="{background:'#ebebeb'}" ref="multipleTable" stripe :data="CairuData"
		tooltip-effect="dark" @selection-change="handleSelectionChange">
		<el-table-column prop="goodsId" label="ID" width="100">
		</el-table-column>
		<el-table-column prop="puorderTimestamp" label="采购订单时间" width="120">
		</el-table-column>
		<el-table-column prop="approval" align="center" label="审批状态">
			<template v-slot="Ca">
				<p v-if="Ca.row.approval==0">未审核</p>
				<p v-if="Ca.row.approval==1">已审核</p>
			</template>
		</el-table-column>
		<el-table-column prop="explain" label="说明" width="120">
		</el-table-column>
		<el-table-column fixed="right" label="操作" >
			<template #default="scope">
			<el-button type="text" size="small" @click="updatePuo(scope.row.puorderId)">审批</el-button>
			</template>
		</el-table-column>
	</el-table>
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
					currentPage: 1, //当前页数，由用户指定
					pagesize: 3, //每页显示的条数
					total: 0 //总记录条数，数据库查出来的
				},
				formLabelWidth: '100px',
				CairuData: []

			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/cypsi/test/GoselectAll", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.CairuData = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(response.data)
				}).catch(function(error) {
					console.log(error)
				})
		},
		methods: {
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/cypsi/test/GoselectAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.CairuData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/cypsi/test/GoselectAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.CairuData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped>
	.el-input {
		width: 300px;
	}
</style>

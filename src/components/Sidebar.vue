<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
			text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template #title>
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template #title>{{ subItem.title }}</template>
								<el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
									{{ threeItem.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	// import bus from "../common/bus";
	export default {
		data() {
			return {
				items: [{
						icon: "el-icon-lx-home",
						index: "dashboard",
						title: "系统首页"
					},
					{
						icon: "el-icon-lx-cascades",
						index: "5",
						title: "采购管理",
						subs: [{
							index: "caistet",
							title: "采购订单"
						},
						{
							index: "cairu",
							title: "采购入库"
						}
						]},
					{
						icon: "el-icon-lx-emoji",
						index: "icon",
						title: "销售订单",
						subs: [{
							index: "SaleOrder",
							title: "销售订单"
						}, {
							index: "sales",
							title: "出库单"
						}, {
							index: "warehouse",
							title: "收款单"
						}, ]
					},
					{
						icon: "el-icon-lx-calendar",
						index: "3",
						title: "仓库管理",
						subs: [{
								index: "form",
								title: "基本表单"
							},
							{
								index: "upload",
								title: "文件上传"
							}
						]
					},
					{
						icon: "el-icon-lx-emoji",
						index: "icon",
						title: "统计分析",
						subs: [{
							index: "purchasing",
							title: "采购分析"
						}, {
							index: "sales",
							title: "销售分析"
						}, {
							index: "warehouse",
							title: "仓库分析"
						}, {
							index: "financial",
							title: "财务分析"
						}]
					},
					{
						icon: "el-icon-pie-chart",
						index: "charts",
						title: "基础资料"
					},
					// {
					//     icon: "el-icon-rank",
					//     index: "6",
					//     title: "拖拽组件",
					//     subs: [
					//         {
					//             index: "drag",
					//             title: "拖拽列表"
					//         },
					//         {
					//             index: "dialog",
					//             title: "拖拽弹框"
					//         }
					//     ]
					// },
					{
						icon: "el-icon-lx-global",
						index: "",
						title: "系统设置",
						subs: [{
							index: "sysUser",
							title: "用户设置"
						}, {
							index: "setting",
							title: "权限设置"
						}, {
							index: "baseDept",
							title: "部门架构"
						}, {
							index: "syslog",
							title: "系统日志"
						}]
					},

				]
			};
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace("/", "");
			},
			collapse() {
				return this.$store.state.collapse
			}
		}
	};
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.sidebar>ul {
		height: 100%;
	}
</style>

import {
	createRouter,
	createWebHistory
} from "vue-router";
import Home from "../views/Home.vue";
import Financial from "@/components/statistical/Financial.vue";
import Purchasing from "@/components/statistical/Purchasing";
import Warehouse from "@/components/statistical/Warehouse";
import Sales from "@/components/statistical/Sales";
import Depot from "../components/basedata/BaseDepot.vue"
import Customer from "../components/basedata/BaseCustomer.vue"
import Prosuct from "../components/basedata/BaseProduct.vue"
import Vendor from "../components/basedata/BaseVendor.vue"
import Allotwarehouse from "@/components/ck/Allotwarehouse";
import Changewarehouse from "@/components/ck/Changewarehouse";
import Intowarehouse from "@/components/ck/Intowarehouse";
import Outwarehouse from "@/components/ck/Outwarehouse";

const routes = [{
	path: '/',
	redirect: '/dashboard'
}, {
	path: "/",
	name: "Home",
	component: Home,
	children: [{
			path: "/dashboard",
			name: "dashboard",
			meta: {
				title: '系统首页'
			},
			component: () => import(
				/* webpackChunkName: "dashboard" */
				"../views/Dashboard.vue")
		},
		
		
		{
					path: "/Allotwarehouse",
					name: "Allotwarehouse",
					meta: {
						title: '仓库调拨'
					},
					component: Allotwarehouse
				},
				{
					path: "/Changewarehouse",
					name: "Changewarehouse",
					meta: {
						title: '库存变动'
					},
					component: Changewarehouse
				},
				{
					path: "/Intowarehouse",
					name: "Intowarehouse",
					meta: {
						title: '入库单查询'
					},
					component: Intowarehouse
				},
				{
					path: "/Outwarehouse",
					name: "Outwarehouse",
					meta: {
						title: '出库单查询'
					},
					component: Outwarehouse
				},
		

		{
			path: "/table",
			name: "basetable",
			meta: {
				title: '表格'
			},
			component: () => import(
				/* webpackChunkName: "table" */
				"../views/BaseTable.vue")
		},
		{
			path: "/financial",
			name: "financial",
			meta: {
				title: '财务'
			},
			component: Financial
		},
		{
			path: "/purchasing",
			name: "purchasing",
			meta: {
				title: '采购'
			},
			component: Purchasing
		},
		{
			path: "/warehouse",
			name: "Warehouse",
			meta: {
				title: '仓库'
			},
			component: Warehouse
		},
		{
			path: "/sales",
			name: "sales",
			meta: {
				title: '销售'
			},
			component: Sales
		},
		{
			path: "/Depot",
			name: "Depot",
			meta: {
				title: '仓库管理'
			},
			component: Depot
		},
		{
			path: "/Customer",
			name: "Customer",
			meta: {
				title: '客户管理'
			},
			component: Customer
		},
		{
			path: "/Prosuct",
			name: "Prosuct",
			meta: {
				title: '产品管理'
			},
			component: Prosuct
		},
		{
			path: "/Vendor",
			name: "Vendor",
			meta: {
				title: '供应商管理'
			},
			component: Vendor
		},
		{
			path: "/charts",
			name: "basecharts",
			meta: {
				title: '图表'
			},
			component: () => import(
				/* webpackChunkName: "charts" */
				"../views/BaseCharts.vue")
		},
		{
			path: "/form",
			name: "baseform",
			meta: {
				title: '表单'
			},
			component: () => import(
				/* webpackChunkName: "form" */
				"../views/BaseForm.vue")
		},
		{
			path: "/tabs",
			name: "tabs",
			meta: {
				title: 'tab标签'
			},
			component: () => import(
				/* webpackChunkName: "tabs" */
				"../views/Tabs.vue")
		}, {
			path: "/donate",
			name: "donate",
			meta: {
				title: '鼓励作者'
			},
			component: () => import(
				/* webpackChunkName: "donate" */
				"../views/Donate.vue")
		}, {
			path: "/permission",
			name: "permission",
			meta: {
				title: '权限管理',
				permission: true
			},
			component: () => import(
				/* webpackChunkName: "permission" */
				"../views/Permission.vue")
		}, {
			path: "/i18n",
			name: "i18n",
			meta: {
				title: '国际化语言'
			},
			component: () => import(
				/* webpackChunkName: "i18n" */
				"../views/I18n.vue")
		}, {
			path: "/upload",
			name: "upload",
			meta: {
				title: '上传插件'
			},
			component: () => import(
				/* webpackChunkName: "upload" */
				"../views/Upload.vue")
		}, {
			path: "/icon",
			name: "icon",
			meta: {
				title: '自定义图标'
			},
			component: () => import(
				/* webpackChunkName: "icon" */
				"../views/Icon.vue")
		}, {
			path: '/404',
			name: '404',
			meta: {
				title: '找不到页面'
			},
			component: () => import( /* webpackChunkName: "404" */
				'../views/404.vue')
		}, {
			path: '/403',
			name: '403',
			meta: {
				title: '没有权限'
			},
			component: () => import( /* webpackChunkName: "403" */
				'../views/403.vue')
		}
	]
}, {
	path: "/login",
	name: "Login",
	meta: {
		title: '登录'
	},
	component: () => import(
		/* webpackChunkName: "login" */
		"../views/Login.vue")
}];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | vue-manage-system`;
	const role = localStorage.getItem('ms_username');
	if (!role && to.path !== '/login') {
		next('/login');
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		role === 'admin' ?
			next() :
			next('/403');
	} else {
		next();
	}
});

export default router;

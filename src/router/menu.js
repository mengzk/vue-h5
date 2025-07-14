/**
 * Author: Meng
 * Date: 2025-06-16
 * Modify: 2025-06-16
 * Desc: 菜单配置
 */
import Container from "@/components/Container.vue";

// 创建菜单路由
const menuRouter = [
  {
    path: "/home",
    name: "Home",
    meta: { transition: "slide-left", title: "首页" },
    component: Container,
    children: [
      {
        path: "",
        name: "Workbench",
        meta: { transition: "slide-left", title: "工作台" },
        component: () => import("../pages/workbench/Index.vue"),
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    meta: { transition: "slide-left", title: "产品" },
    component: Container,
    children: [
      {
        path: "",
        name: "ProductList",
        meta: { transition: "slide-left", title: "产品列表" },
        component: () => import("../pages/product/List.vue"),
      },
      {
        path: "detail",
        name: "ProductDetail",
        meta: { transition: "slide-left", title: "产品详情" },
        component: () => import("../pages/product/Detail.vue"),
      },
    ],
  },
  {
    path: "/member",
    name: "Member",
    meta: { transition: "slide-left", title: "会员" },
    component: Container,
    children: [
      {
        path: "",
        name: "MemberList",
        meta: { transition: "slide-left", title: "会员列表" },
        component: () => import("../pages/member/List.vue"),
      },
      {
        path: "detail",
        name: "MemberDetail",
        meta: { transition: "slide-left", title: "会员详情" },
        component: () => import("../pages/member/Detail.vue"),
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    meta: { transition: "slide-left", title: "订单" },
    component: Container,
    children: [
      {
        path: "",
        name: "OrderList",
        meta: { transition: "slide-left", title: "订单列表" },
        component: () => import("../pages/order/List.vue"),
      },
    ],
  },
  {
    path: "/category",
    name: "Category",
    meta: { transition: "slide-left", title: "品类" },
    component: Container,
    children: [
      {
        path: "",
        name: "CategoryList",
        meta: { transition: "slide-left", title: "品类列表" },
        component: () => import("../pages/category/List.vue"),
      },
      {
        path: "detail",
        name: "CategoryDetail",
        meta: { transition: "slide-left", title: "品类详情" },
        component: () => import("../pages/category/Detail.vue"),
      },
    ],
  },
  {
    path: "/salary",
    name: "Salary",
    meta: { transition: "slide-left", title: "薪资" },
    component: Container,
    children: [
      {
        path: "",
        name: "SalaryList",
        meta: { transition: "slide-left", title: "薪资列表" },
        component: () => import("../pages/salary/List.vue"),
      },
      {
        path: "detail",
        name: "SalaryDetail",
        meta: { transition: "slide-left", title: "薪资详情" },
        component: () => import("../pages/salary/Detail.vue"),
      },
    ],
  },
  {
    path: "/repository",
    name: "Repository",
    meta: { transition: "slide-left", title: "知识库" },
    component: Container,
    children: [
      {
        path: "",
        name: "RepositoryIndex",
        meta: { transition: "slide-left", title: "知识库列表" },
        component: () => import("../pages/repository/Index.vue"),
        children: [
          {
            path: "",
            component: () => import("@/pages/repository/BaseInfo.vue"),
          },
          {
            path: "category",
            component: () => import("@/pages/repository/Category.vue"),
          },
          {
            path: "content",
            component: () => import("@/pages/repository/Content.vue"),
          },
        ],
      },
    ],
  },
];

export default menuRouter;

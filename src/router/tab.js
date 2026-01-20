/**
 * Author: Meng
 * Date: 2025-06-16
 * Modify: 2025-06-16
 * Desc: 顶部tab配置 
 */

// 创建菜单路由
const tabRouter = [
  {
    path: "/home",
    name: "Home",
    meta: { transition: "slide-left", title: "首页3" },
    component: 'FrameLayout',
    children: [
      {
        path: "",
        name: "Workbench",
        meta: { transition: "slide-left", title: "工作台" },
        component: '../pages/website/Home.vue',
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    meta: { transition: "slide-left", title: "产品3" },
    component: 'FrameLayout',
    children: [
      {
        path: "",
        name: "ProductList",
        meta: { transition: "slide-left", title: "产品列表" },
        component: '../pages/product/List.vue',
      },
      {
        path: "detail",
        name: "ProductDetail",
        meta: { transition: "slide-left", title: "产品详情" },
        component: '../pages/product/Detail.vue',
      },
    ],
  },

];

export default tabRouter;

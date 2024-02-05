
export default [
  {
    path: "/",
    name: '基础配置',
    component: () => import('@src/pages/Index'),
    children: [
      {
        path: '/',
        name: '主页',
        component: () => import('@src/pages/Home'),
      },
      {
        path: "module",
        component: () => import('@src/pages/Home/ModuleList'),
      },
    ]
  },
  {
    path: "login",
    component: () => import('@src/pages/Login'),
  },
  {
    path: "register",
    component: () => import('@src/pages/Login/Register'),
  },
]
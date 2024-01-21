
export default [
  {
    path: "/admin",
    key: "admin",
    name: '基础配置',
    component: () => import('@src/pages/Admin'),
    children: [
      {
        path: 'classify',
        name: '分类管理',
        component: () => import('@src/pages/Admin/module/ClassifyConfig'),
      },
      {
        path: 'module',
        name: '模块管理',
        component: () => import('@src/pages/Admin/module/ModuleConfig'),
      }
    ]
  }
]
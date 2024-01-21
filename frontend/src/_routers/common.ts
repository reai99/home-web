
export default [
  {
    path: "/",
    component: () => import('@src/pages/Home'),
  },
  {
    path: "/module",
    component: () => import('@src/pages/Home/ModuleList'),
  },
  {
    path: "/login",
    component: () => import('@src/pages/Login'),
  },
  {
    path: "/register",
    component: () => import('@src/pages/Login/Register'),
  },
]
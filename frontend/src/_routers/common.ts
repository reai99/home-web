
export default [
  {
    path: "/",
    component: () => import('@src/pages/Home'),
  },
  {
    path: "/login",
    component: () => import('@src/pages/Login'),
  },
  {
    path: "/register",
    component: () => import('@src/pages/Login/Register'),
  },
  {
    path: "/module",
    component: () => import('@src/pages/Home/ModuleList'),
  },
  {
    path: "/exercises",
    component: () => import('@src/pages/Home/Exercises'),
  }
]
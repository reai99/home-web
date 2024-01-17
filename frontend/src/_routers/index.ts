
export default [
  {
    path: "/",
    component: () => import('@src/pages/Home'),
  },
  {
    path: "/login",
    element: () => import('@src/pages/Login'),
  },
  {
    path: "/register",
    element: () => import('@src/pages/Login/Register'),
  }
]


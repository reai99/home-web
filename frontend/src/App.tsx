import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import _routers from './_routers';
import ErrorPage from './pages/ErrorPage';
import LoadingComponent from '@src/_components/LoadingComponent';
import './App.css';

// 路由转换
const transformRouters = (routers) => {
  routers.map((v) => {
    const { component } = v;
    const Ele = lazy(component);
    v.element = <Ele />;
    v.errorElement = <ErrorPage />;
    if(routers.children instanceof Array) transformRouters(routers.children);
  })
  return routers
}

// 转换路由
const routers = transformRouters(_routers);
// 创建路由
const router = createBrowserRouter(routers);

function App() {

  return (
    <Suspense fallback={<LoadingComponent/>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;

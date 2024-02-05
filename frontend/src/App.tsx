import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import _routers from './_routers';
import ErrorPage from './pages/ErrorPage';
import LoadingComponent from '@src/_components/LoadingComponent';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.css';

// 路由转换
const transformRouters = (routers) => {
  routers.map((v) => {
    const { component } = v;
    const Ele = lazy(component);
    v.element = <Ele />;
    v.errorElement = <ErrorPage />;
    if(v.children instanceof Array) transformRouters(v.children);
  })
  return routers
}

// 转换路由
const routers = transformRouters(_routers);
// 创建路由
const router = createBrowserRouter(routers);

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<LoadingComponent/>}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  )
}

export default App;

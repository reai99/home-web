import React from 'react';
import { registerMicroApps, start } from 'qiankun';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import stores from './_stores/index.ts';
import App from './App.tsx'

import './index.css';

//配置两个子应用 
registerMicroApps([
  {
    // 子应用名字
    name: 'chatgpt',
    // 子应用容器id 需要在父应用中创建相关元素
    container: '#root',
    // 子应用进入地址
    entry: 'http://localhost:3000/',
    // 激活子应用的路由
    activeRule: '/chatgpt',
  }
]);

//启动 qiankun
start({
  sandbox: {
    // 样式隔离特性
    // experimentalStyleIsolation: true,
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider {...stores}>
    <App />
  </Provider>,
)
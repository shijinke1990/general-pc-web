import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import './assets/reset.css';
import './assets/App.scss';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={routerConfig}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;

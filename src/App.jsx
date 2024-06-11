import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import './assets/reset.css';
import './assets/App.scss';

function App() {
  // 获取浏览器指纹

  return (
    <div className='App'>
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}

export default App;

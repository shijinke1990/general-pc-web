import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Start from '../pages/Start/index';
import Login from '../pages/login';
import Music from '../pages/music';
import Wallpaper from '@pages/wallpaper';
import Card from '@pages/card';
import Resume from '@pages/resume';
import Article from '@pages/article';
import ArticleDetail from '@pages/article/ArticleDetail';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <div>Home</div>,
  },
  {
    path: '/about',
    element: <div>About</div>,
  },
  {
    path: '/contact',
    element: <div>Contact</div>,
  },
  {
    path: '/profile',
    element: <div>Profile</div>,
  },
  {
    path: '/settings',
    element: <div>Settings</div>,
  },
  {
    path: '/music',
    element: <Music />,
  },
  {
    path: '/wallpaper',
    element: <Wallpaper />,
  },
  {
    path: '/card',
    element: <Card />,
  },
  {
    path: '/resume',
    element: <Login />,
  },
  {
    path: '/resume/:id',
    element: <Resume />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
  {
    path: '/article',
    element: <ArticleDetail />,
  },
  {
    path: '/404',
    element: <div>404</div>,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export default router;

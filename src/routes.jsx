import React from 'react';
import { Home, Profile, SignIn, SignUp } from "@/pages"; // Обновление импорта

const routes = [
  {
    name: 'Главная',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Профиль',
    path: '/profile',
    element: <Profile />,
  },
  {
    name: 'Вход',
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    name: 'Регистрация',
    path: '/sign-up',
    element: <SignUp />,
  },
];


export default routes;

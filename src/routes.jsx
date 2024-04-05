import React from 'react';
import { Home, Profile, SignIn, SignUp } from "@/pages"; // Обновление импорта
import Events from "@/pages/events";
import News from "@/pages/news";
import SportFacilities from "@/pages/sportFacilities";


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
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/sport-objects",
    element: <SportFacilities />,
  },
];


export default routes;

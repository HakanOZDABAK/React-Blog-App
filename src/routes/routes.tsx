import React from 'react';

const SignIn = React.lazy(
    ()=>import('../pages/SignIn')
)
const SignUp = React.lazy(
    ()=>import('../pages/SignUp')
)
const  HomePage =   React.lazy(
     ()=>import('../pages/MainPage')
)

  export type IRoute = {
    name: string;
    path: string;
    component: React.ComponentType;
    pathname?: string;

  };
  
  export const routes: IRoute[] = [
    {
      name: 'Kayıt Ekranı',
      path: '/signIn',
      pathname: '/signIn',
      component: SignIn,
    },
    {
        name: 'Giriş Ekranı',
        path: '/signUp',
        pathname: '/signUp',
        component: SignUp,
      },
      {
        name: 'Anasayfa',
        path: '/home',
        pathname: '/home',
        component: HomePage,
      },

  ]
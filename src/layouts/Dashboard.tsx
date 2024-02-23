import React, { Suspense } from "react";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUp";
import { Navigate, Route, Routes } from "react-router";
import { IRoute, routes } from "../routes/routes";
import { useUserStore } from "../store/useUserStore";
import SignIn from "../pages/SignIn";

export default function Dashboard() {
  const isLoggedIn = useUserStore((state) => state.login);



  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        {routes.map((route: IRoute) => (
          <Route
            key={route.path}
            path={route.path}
          Component={route.component}/>
        ))}
        <Route path="/signIn" element={<SignIn/>} />
      </Routes>
    </Suspense>
  );
}
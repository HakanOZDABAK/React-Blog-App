import React, { Suspense } from "react";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUp";
import { Navigate, Route, Routes } from "react-router";
import { IRoute, routes } from "../routes/routes";
import { useUserStore } from "../store/useUserStore";
import SignIn from "../pages/SignIn";

export default function Dashboard() {
  const storedLoginState = localStorage.getItem('isLoggedIn');
  const initialLoginState = storedLoginState ? JSON.parse(storedLoginState) : false;

  const isLoggedIn = useUserStore((state) => state.login, initialLoginState);

  if (isLoggedIn) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          {routes.map((route: IRoute) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Suspense>
    );
  } else {
    return (
      <Routes>
        <Route path="/*" element={<Navigate to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    );
  }
}

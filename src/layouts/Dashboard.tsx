import React from 'react'
import MainPage from '../pages/MainPage'
import SignUp from '../pages/SignUp'
import { Route, Routes } from 'react-router'
import { IRoute, routes } from '../routes/routes'

export default function Dashboard() {
  return (
    <Routes>
        {routes.map((route: IRoute) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
    </Routes>
  )
      }

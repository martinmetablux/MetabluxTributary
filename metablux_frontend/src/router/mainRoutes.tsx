import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom"

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { dashboardRoutes } from "./dashboardRoutes";
import { authRoutes } from "./authRoutes";
import { utilityRoutes } from "./utilityRoutes"


export const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      ...dashboardRoutes,
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "*", element: <Navigate to="dashboard" replace /> },
    ],
  },
];


export const allRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  ...authRoutes,
  ...utilityRoutes,
  ...mainRoutes,
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

export default function AppRouter() {
  return useRoutes(allRoutes);
}
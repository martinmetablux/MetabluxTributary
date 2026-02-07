import type { RouteObject } from "react-router-dom";
import Login from "../module/auth/Login";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
];

import type { RouteObject } from "react-router-dom";
import LoginPages from "../module/auth/Login/LandingPage"

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPages />,
  },
  
];

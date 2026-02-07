import type { RouteObject } from "react-router-dom";
import Dashboard from "../module/Dashboard/pages/Home";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
];

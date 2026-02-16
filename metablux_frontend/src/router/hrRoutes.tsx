import type { RouteObject } from "react-router-dom";
import HRMainLayout from "../module/HR/HR_MainLayout"
import HR_Home from "../module/HR/HR_Home" 
import HR_User from "../module/HR/pages/HR_UserList/HR_User";
import HR_Leave from "../module/HR/pages/HR_Leave/HR_Leave";
import HR_Attendance from "../module/HR/pages/HR_Attendance/HR_Attendance";
import HR_Calander from "../module/HR/pages/HR_Calander/HR_Calander";

export const hrRoutes: RouteObject[] = [
  {
    path: '/hr',
    element: <HRMainLayout />,
    children: [
      {
        path: 'home',
        element: <HR_Home />
      },
      {
        path:"users",
        element:<HR_User />
      },
      {
        path:"leave",
        element:<HR_Leave />
      },
      {
        path:"attendance",
        element:<HR_Attendance />
      },
      {
        path:"calendar",
        element:<HR_Calander />
      }
    ]
  }
];
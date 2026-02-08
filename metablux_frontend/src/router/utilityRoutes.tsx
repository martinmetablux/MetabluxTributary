import type { RouteObject } from "react-router-dom";
import {Style_Guide} from "../utility/style_guide"

export const utilityRoutes: RouteObject[] = [
  {
    path: "/style",
    element: <Style_Guide />,
  },
];

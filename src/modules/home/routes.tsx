import { RouteObject } from "react-router-dom";

import HomeScreen from ".";
import PageNotFound from "./screens/pageNotFound";

export enum HomeRoutesEnum {
  HOME = "/",
}

export const homeRoutes: RouteObject[] = [
  {
    path: HomeRoutesEnum.HOME,
    element: <HomeScreen />,
    errorElement: <PageNotFound />,
  },
];

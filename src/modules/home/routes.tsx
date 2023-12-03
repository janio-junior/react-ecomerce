import { RouteObject } from "react-router-dom";

import HomeScreen from ".";

export enum HomeRoutesEnum {
  HOME = "/",
}

export const homeRoutes: RouteObject[] = [
  {
    path: HomeRoutesEnum.HOME,
    element: <HomeScreen />,
    errorElement: <>Página não encontrada!</>,
  },
];

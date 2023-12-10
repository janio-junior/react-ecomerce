import type { Router as RemixRouter } from "@remix-run/router";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { homeRoutes } from "./modules/home/routes";
import { loginRoutes } from "./modules/login/routes";
import { productRoute } from "./modules/products/routes";
import { URL_USER } from "./shared/constants/urls";
import { MethodsEnum } from "./shared/enums/methods.enum";
import { verifyLoggedIn } from "./shared/functions/connection/auth";
import { useGlobalContext } from "./shared/hooks/useGlobalContext";
import { useNotification } from "./shared/hooks/useNotification";
import { useRequests } from "./shared/hooks/useRequest";

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [...homeRoutes, ...productRoute].map(
  (route) => ({
    ...route,
    loader: verifyLoggedIn,
  }),
);

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request } = useRequests();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, null, setUser);
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

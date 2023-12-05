import type { Router as RemixRouter } from "@remix-run/router";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { homeRoutes } from "./modules/home/routes";
import { loginRoutes } from "./modules/login/routes";
import { productRoute } from "./modules/products/routes";
import { verifyLoggedIn } from "./shared/functions/connection/auth";
import { useGlobalContext } from "./shared/hooks/useGlobalContext";
import { useNotification } from "./shared/hooks/useNotification";

function App() {
  const { contextHolder } = useNotification();
  const { user, setUser } = useGlobalContext();

  const routes: RouteObject[] = [...loginRoutes];
  const routesLoggedIn: RouteObject[] = [...homeRoutes, ...productRoute].map(
    (route) => ({
      ...route,
      loader: () => verifyLoggedIn(setUser, user),
    }),
  );

  const router: RemixRouter = createBrowserRouter([
    ...routes,
    ...routesLoggedIn,
  ]);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

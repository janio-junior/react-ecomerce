import type { Router as RemixRouter } from "@remix-run/router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { homeRoutes } from "./modules/home/routes";
import { loginRoutes } from "./modules/login/routes";
import { productRoute } from "./modules/products/routes";
import { useNotification } from "./shared/hooks/useNotification";

const router: RemixRouter = createBrowserRouter([
  ...homeRoutes,
  ...loginRoutes,
  ...productRoute,
]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

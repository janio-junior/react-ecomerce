import { RouteObject } from "react-router-dom";

import ProductScreen from "./screens/productScreen";

export enum ProductRoutesEnum {
  PRODUCT = "/product",
}

export const productRoute: RouteObject[] = [
  {
    path: ProductRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
];

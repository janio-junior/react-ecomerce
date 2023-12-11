import { RouteObject } from "react-router-dom";

import ProductInsert from "./screens/productInsert";
import ProductScreen from "./screens/productScreen";

export enum ProductRoutesEnum {
  PRODUCT = "/product",
  PRODUCT_INSERT = "/product/insert",
}

export const productRoute: RouteObject[] = [
  {
    path: ProductRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
  {
    path: ProductRoutesEnum.PRODUCT_INSERT,
    element: <ProductInsert />,
  },
];

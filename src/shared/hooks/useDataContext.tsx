import { createContext, useContext, useState } from "react";

import { ProductType } from "../../modules/products/types/ProductType";

export type NotificationType = "success" | "info" | "warning" | "error";

interface DataContext {
  products?: ProductType[];
}

interface DataContextProps {
  data: DataContext;
  setData: (dataData: DataContext) => void;
}

const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setProducts = (products: ProductType[]) => {
    setData({
      ...data,
      products,
    });
  };

  return {
    products: data?.products || [],
    setProducts,
  };
};

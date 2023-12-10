import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";

import Table from "../../../shared/components/table/table";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductType } from "../../../shared/types/ProductType";
import CategoryColumn from "../components/CategoryColumns";
import TooltipImage from "../components/TooltipImage";

const columns: ColumnsType<ProductType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Categoria",
    dataIndex: "category",
    key: "category",
    render: (_, product) => <CategoryColumn category={product.category} />,
  },
  {
    title: "Preço",
    dataIndex: "price",
    key: "price",
    render: (text) => <a>{text}</a>,
  },
];

const ProductScreen = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, null, setProducts);
  }, []);

  return <Table columns={columns} dataSource={products} rowKey="id" />;
};

export default ProductScreen;

import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/button";
import Screen from "../../../shared/components/screens/screen";
import Table from "../../../shared/components/tables/table";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { formatNumber } from "../../../shared/functions/format/number";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductType } from "../../../shared/types/ProductType";
import CategoryColumn from "../components/CategoryColumns";
import TooltipImage from "../components/TooltipImage";
import { ProductRoutesEnum } from "../routes";

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
    render: (text) => (
      <a
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "15px",
        }}
      >
        <span>R$</span>
        <span>{formatNumber(text)}</span>
      </a>
    ),
  },
];

const ProductScreen = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, null, setProducts);
  }, []);

  const handleClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  return (
    <Screen listBreadcrumb={[{ name: "Home" }, { name: "Produtos" }]}>
      {/* <Breadcrumb /> */}
      <Button onClick={handleClickInsert}>Inserir</Button>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </Screen>
  );
};

export default ProductScreen;

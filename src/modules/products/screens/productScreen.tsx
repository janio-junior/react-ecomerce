import { Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
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
import { BoxButtons, W120, W240 } from "../styles/product.style";

const { Search } = Input;

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
    sorter: (a, b) => a.name.localeCompare(b.name),
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

interface filterProps {
  products?: ProductType[];
}

const ProductScreen = () => {
  const { products, setProducts } = useDataContext();
  const [filter, setFilter] = useState<filterProps>({});
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setFilter({
      ...filter,
      products,
    });
  }, [products]);

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, null, setProducts);
  }, []);

  const handleClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const listBreadcrumb = [{ name: "Home" }, { name: "Produtos" }];

  const onSearch = (value: string) => {
    if (!value) {
      setFilter({
        ...filter,
        products,
      });
      return false;
    }
    const filteredProducts = products?.filter((product) =>
      product.name.includes(value),
    );
    setFilter({
      ...filter,
      products: filteredProducts,
    });
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <BoxButtons>
        <W240>
          <Search
            placeholder="Pesquisar na tabela"
            onSearch={onSearch}
            enterButton
          />
        </W240>
        <W120>
          <Button type={"primary"} onClick={handleClickInsert}>
            Inserir
          </Button>
        </W120>
      </BoxButtons>
      <Table columns={columns} dataSource={filter.products ?? []} rowKey="id" />
    </Screen>
  );
};

export default ProductScreen;

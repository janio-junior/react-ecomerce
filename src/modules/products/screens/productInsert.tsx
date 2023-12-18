import { Select } from "antd";
import { useEffect } from "react";

import Button from "../../../shared/components/buttons/button/button";
import Input from "../../../shared/components/inputs/input/input";
import Screen from "../../../shared/components/screens/screen";
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductRoutesEnum } from "../routes";
import { Container } from "../styles/productInsert.style";

const ProductInsert = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  const listBreadcrumb = [
    { name: "Home" },
    { name: "Produtos", navigateTo: ProductRoutesEnum.PRODUCT },
    { name: "Cadastrar Produtos" },
  ];

  useEffect(() => {
    if (!categories?.length) {
      request(URL_CATEGORY, MethodsEnum.GET, undefined, setCategories);
    }
  }, []);

  const handleOnChange = (value: string) => {
    console.log("value: ", value);
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <Container>
        <Input margin="0 0 16px 0" title="Nome" placeholder="Nome" />
        <Input
          margin="0 0 16px 0"
          title="URL Imagem"
          placeholder="URL Imagem"
        />
        <Input margin="0 0 16px 0" title="Preço" placeholder="Preço" />
        <Select
          defaultValue="Categorias..."
          style={{ width: "100%", marginBottom: 16 }}
          onChange={handleOnChange}
          options={categories.map((category) => ({
            value: `${category.id}`,
            label: category.name,
          }))}
        />
        <Button type="primary">Inserir Produto</Button>
      </Container>
    </Screen>
  );
};

export default ProductInsert;

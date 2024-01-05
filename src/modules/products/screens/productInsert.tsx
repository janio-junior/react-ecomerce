import { useEffect, useState } from "react";

import Button from "../../../shared/components/buttons/button/button";
import Input from "../../../shared/components/inputs/input/input";
import Select from "../../../shared/components/inputs/select/select";
import Screen from "../../../shared/components/screens/screen";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ConnectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductRoutesEnum } from "../routes";
import { Container } from "../styles/productInsert.style";

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: "",
    price: 0,
    image: "",
  });
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  const listBreadcrumb = [
    { name: "Home" },
    { name: "Produtos", navigateTo: ProductRoutesEnum.PRODUCT },
    { name: "Cadastrar Produtos" },
  ];

  console.log("product: ", product);

  useEffect(() => {
    if (!categories?.length) {
      request(URL_CATEGORY, MethodsEnum.GET, undefined, setCategories);
    }
  }, []);

  const handleInsertProduct = () => {
    ConnectionAPIPost(URL_PRODUCT, product);
  };

  const onChange = (value: string | number, nameObject: string) => {
    setProduct({
      ...product,
      [nameObject]: value,
    });
  };

  const handleOnChange = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
    console.log("value: ", value);
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <Container>
        <Input
          onChange={(event) => onChange(event.target.value, "name")}
          value={product.name}
          margin="0 0 16px 0"
          title="Nome"
          placeholder="Nome"
        />
        <Input
          onChange={(event) => onChange(event.target.value, "image")}
          value={product.image}
          margin="0 0 16px 0"
          title="URL Imagem"
          placeholder="URL Imagem"
        />
        <Input
          onChange={(event) => onChange(Number(event.target.value), "price")}
          value={product.price}
          margin="0 0 16px 0"
          title="Preço"
          placeholder="Preço"
        />
        <Select
          title="Categoria"
          margin="0 0 32px 0"
          defaultValue="Selecione..."
          onChange={handleOnChange}
          options={categories.map((category) => ({
            value: `${category.id}`,
            label: category.name,
          }))}
        />
        <Button onClick={handleInsertProduct} type="primary">
          Inserir Produto
        </Button>
      </Container>
    </Screen>
  );
};

export default ProductInsert;

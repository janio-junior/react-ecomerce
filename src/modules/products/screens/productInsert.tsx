import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/button";
import Input from "../../../shared/components/inputs/input/input";
import Select from "../../../shared/components/inputs/select/select";
import Screen from "../../../shared/components/screens/screen";
import { DisplayFlexRight } from "../../../shared/components/styles/display.styled";
import { Container } from "../../../shared/components/styles/limited.styled";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ConnectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductRoutesEnum } from "../routes";
import { ProductInsertContainer } from "../styles/productInsert.style";

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: "",
    price: 0,
    image: "",
  });
  const { categories, setCategories } = useDataContext();
  const { setNotification } = useGlobalContext();
  const { request } = useRequests();
  const navigate = useNavigate();

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

  const handleInsertProduct = async () => {
    await ConnectionAPIPost(URL_PRODUCT, product)
      .then(() => {
        setNotification("success", "Produto inserido com sucesso!");
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error: Error) => {
        setNotification("error", "Oops!", error?.message);
      });
  };

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
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
      <ProductInsertContainer>
        <Container width={400}>
          <Input
            onChange={(event) => onChange(event, "name")}
            value={product.name}
            margin="0 0 16px 0"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChange(event, "image")}
            value={product.image}
            margin="0 0 16px 0"
            title="URL Imagem"
            placeholder="URL Imagem"
          />
          <Input
            onChange={(event) => onChange(event, "price", true)}
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
          <DisplayFlexRight>
            <Container width={120} margin="0 8px">
              <Button onClick={handleOnClickCancel} danger>
                Cancelar
              </Button>
            </Container>
            <Container width={120}>
              <Button onClick={handleInsertProduct} type="primary">
                Inserir Produto
              </Button>
            </Container>
          </DisplayFlexRight>
        </Container>
      </ProductInsertContainer>
    </Screen>
  );
};

export default ProductInsert;

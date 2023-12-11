import Screen from "../../../shared/components/screens/screen";
import { ProductRoutesEnum } from "../routes";

const ProductInsert = () => {
  return (
    <Screen
      listBreadcrumb={[
        { name: "Home" },
        { name: "Produtos", navigateTo: ProductRoutesEnum.PRODUCT },
        { name: "Cadastrar Produtos" },
      ]}
    >
      Inserir Produto
    </Screen>
  );
};

export default ProductInsert;

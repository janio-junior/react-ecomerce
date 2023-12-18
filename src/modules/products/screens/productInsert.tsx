import Screen from "../../../shared/components/screens/screen";
import { ProductRoutesEnum } from "../routes";

const ProductInsert = () => {
  const listBreadcrumb = [
    { name: "Home" },
    { name: "Produtos", navigateTo: ProductRoutesEnum.PRODUCT },
    { name: "Cadastrar Produtos" },
  ];

  return <Screen listBreadcrumb={listBreadcrumb}>Inserir Produto</Screen>;
};

export default ProductInsert;

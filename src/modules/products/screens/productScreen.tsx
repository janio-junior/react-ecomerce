import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";

const ProductScreen = () => {
  const { user } = useGlobalContext();

  return <>{`Produtos => ${user?.name}`}</>;
};

export default ProductScreen;

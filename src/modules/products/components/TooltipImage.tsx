import Tooltip from "../../../shared/components/tooltips/tooltip";
import { ProductType } from "../../../shared/types/ProductType";

interface TooltipImageProps {
  product: ProductType;
}

const TooltipImage = ({ product }: TooltipImageProps) => {
  return (
    <Tooltip tooltip={<img src={product.image} />}>
      <span>{product.id}</span>
    </Tooltip>
  );
};

export default TooltipImage;

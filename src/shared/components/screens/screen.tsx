import Breadcrumb, { listBreadcrumb } from "../breadcrumb/breadcrumb";
import { ScreenContainer } from "./screen.style";

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: listBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <ScreenContainer>
      {listBreadcrumb && <Breadcrumb listBreadcrumb={listBreadcrumb} />}
      {children}
    </ScreenContainer>
  );
};

export default Screen;

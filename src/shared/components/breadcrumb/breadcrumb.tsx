import { Breadcrumb as BreadcrumbAntd } from "antd";
import { useNavigate } from "react-router-dom";

export interface listBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: listBreadcrumb[];
}

const Breadcrumb = ({ listBreadcrumb }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const handleClickBreadcrumbItem = (navigateTo: string) =>
    navigate(navigateTo);

  return (
    <BreadcrumbAntd
      items={listBreadcrumb?.map((el) => ({
        title: el.navigateTo ? (
          <a onClick={() => handleClickBreadcrumbItem(el.navigateTo ?? "")}>
            {el.name}
          </a>
        ) : (
          el.name
        ),
      }))}
    />
  );
};

export default Breadcrumb;

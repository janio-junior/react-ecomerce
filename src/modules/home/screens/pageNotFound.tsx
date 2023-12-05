import { Result } from "antd";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/button";
import { LoginRoutesEnum } from "../../login/routes";
import { ContainerPageNotFound } from "../styles/pageNotFound.style";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };
  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Oops, a página solicitada não existe!"
        extra={
          <Button type="primary" onClick={handleOnClickButton}>
            Retornar ao login
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;

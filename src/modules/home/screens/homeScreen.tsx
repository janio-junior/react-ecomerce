import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { ProductRoutesEnum } from "../../products/routes";

const HomeScreen = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate(ProductRoutesEnum.PRODUCT);
    }
  }, [user]);
  return <Spin />;
};

export default HomeScreen;

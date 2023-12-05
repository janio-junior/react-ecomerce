import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthType } from "../../modules/login/types/AuthType";
import { ProductRoutesEnum } from "../../modules/products/routes";
import { ERROR_INVALID_PASSWORD } from "../constants/errorStatus";
import { URL_AUTH } from "../constants/urls";
import { setAuthorizationToken } from "../functions/connection/auth";
import { ConnectionAPIPost } from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const getRequest = async <T>(url: string): Promise<T> => {
    setLoading(true);
    return await axios({
      method: "get",
      url: url,
    })
      .then((result) => result.data)
      .catch(() => {
        alert(
          `Não foi possível concluir a solicitação no momento, tente novamente mais tarde!`,
        );
      });
  };

  const postRequest = async <T>(
    url: string,
    body: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);
    const result = await ConnectionAPIPost<T>(url, body)
      .then((result) => {
        setNotification(
          "success",
          "Login efetuado com sucesso!",
          "Você será redirecionado para página principal em alguns segundos.",
        );
        return result;
      })
      .catch((error: Error) => {
        setNotification("error", error.message);
        return undefined;
      });

    setLoading(false);
    return result;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await ConnectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setNotification(
          "success",
          "Login efetuado com sucesso!",
          "Você será redirecionado para página principal em alguns segundos.",
        );
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch(() => {
        setNotification("error", ERROR_INVALID_PASSWORD);
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    getRequest,
    postRequest,
  };
};

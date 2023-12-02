import axios from "axios";
import { useState } from "react";

import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();

  const getRequest = async (url: string) => {
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

  // body recebia "any", mas não é uma boa pratica, então troquei para "unknown", se der bo, voltar pra "any"
  const postRequest = async (url: string, body: unknown) => {
    setLoading(true);
    const result = await axios({
      method: "post",
      url: url,
      data: body,
    })
      .then((result) => {
        setNotification(
          "success",
          "Login efetuado com sucesso!",
          "Você será redirecionado para página principal em alguns segundos.",
        );
        return result.data;
      })
      .catch(() => {
        setNotification(
          "error",
          "Não foi possível efetuar o login! Verifique seu usuário e senha e tente novamente.",
        );
      });

    setLoading(false);
    return result;
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};

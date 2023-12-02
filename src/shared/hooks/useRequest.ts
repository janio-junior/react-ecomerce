import axios from "axios";
import { useState } from "react";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

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
      .then((result) => result.data)
      .catch(() => {
        alert(
          `Não foi possível concluir a solicitação no momento, tente novamente mais tarde!`,
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

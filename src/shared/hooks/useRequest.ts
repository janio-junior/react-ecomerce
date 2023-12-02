import axios from "axios";
import { useState } from "react";

import { ConnectionAPIPost } from "../functions/connection/connectionAPI";
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

  const postRequest = async (url: string, body: unknown) => {
    setLoading(true);
    const result = await ConnectionAPIPost(url, body)
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

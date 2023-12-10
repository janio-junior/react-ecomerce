import { useState } from "react";

import { AuthType } from "../../modules/login/types/AuthType";
import { ERROR_INVALID_PASSWORD } from "../constants/errorStatus";
import { URL_AUTH } from "../constants/urls";
import { MethodsEnum } from "../enums/methods.enum";
import { setAuthorizationToken } from "../functions/connection/auth";
import ConnectionAPI, {
  ConnectionAPIPost,
} from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodsEnum,
    body?: unknown,
    callback?: (data: T) => void,
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<
      T | undefined
    >(url, method, body)
      .then((result) => {
        if (callback && result) {
          callback(result);
        }

        return result;
      })
      .catch((error: Error) => {
        setNotification("error", error.message);
        return undefined;
      });

    setLoading(false);
    return returnObject;
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
      })
      .catch(() => {
        setNotification("error", ERROR_INVALID_PASSWORD);
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};

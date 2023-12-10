import { UserType } from "../../../modules/login/types/UserTypes";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { URL_USER } from "../../constants/urls";
import { ConnectionAPIGet } from "./connectionAPI";
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from "./storageProxy";

export const unsetAuthorizationToken = () =>
  removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    unsetAuthorizationToken();
    location.href = "/login";
    return null;
  }

  await ConnectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
    location.href = "/login";
  });

  return null;
};

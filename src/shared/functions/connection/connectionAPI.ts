import axios, { AxiosRequestConfig } from "axios";

import {
  ERROR_ACCESS_DENIED,
  ERROR_CONNECTION,
  ERROR_DEFAULT,
} from "../../constants/errorStatus";
import { MethodsEnum } from "../../enums/methods.enum";
import { getAuthorizationToken } from "./auth";

export default class ConnectionAPI {
  static async fetch<T>(
    url: string,
    method: MethodsEnum,
    body?: unknown,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorizationToken(),
        "Content-Type": "application/json",
      },
    };

    switch (method) {
      case MethodsEnum.POST:
      case MethodsEnum.PUT:
      case MethodsEnum.PATCH:
        return (await axios[method]<T>(url, body, config)).data;
      case MethodsEnum.GET:
      case MethodsEnum.DELETE:
      default:
        return (await axios[method]<T>(url, config)).data;
    }
  }

  static async connect<T>(
    url: string,
    method: MethodsEnum,
    body?: unknown,
  ): Promise<T> {
    return ConnectionAPI.fetch<T>(url, method, body).catch((error) => {
      if (error.response) {
        const codeStatus: keyof codeMessage = error.response.status;

        interface codeMessage {
          0: string;
          401: string;
          403: string;
        }

        const codeMessage = {
          0: ERROR_CONNECTION,
          401: ERROR_ACCESS_DENIED,
          403: ERROR_ACCESS_DENIED,
        };

        if (codeMessage[codeStatus]) {
          throw new Error(codeMessage[codeStatus]);
        }
      }

      throw new Error(ERROR_DEFAULT);
    });
  }
}

export const fetchAPI = async <T>(
  method: MethodsEnum,
  url: string,
  body?: unknown,
): Promise<T> => ConnectionAPI.connect<T>(url, method, body);

export const ConnectionAPIGet = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, MethodsEnum.GET);

export const ConnectionAPIPost = async <T>(
  url: string,
  body: unknown,
): Promise<T> => ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);

export const ConnectionAPIDelete = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);

export const ConnectionAPIPutch = async <T>(
  url: string,
  body: unknown,
): Promise<T> => ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);

export const ConnectionAPIPut = async <T>(
  url: string,
  body: unknown,
): Promise<T> => ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);

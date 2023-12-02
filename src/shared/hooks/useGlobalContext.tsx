import type { NotificationPlacement } from "antd/es/notification/interface";
import { createContext, useContext, useEffect, useState } from "react";

import {
  getAuthorizationToken,
  setAuthorizationToken,
} from "../functions/connection/auth";
type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  placement: NotificationPlacement;
}
interface GlobalData {
  accessToken?: string;
  notification?: NotificationProps;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const setAccessToken = (accessToken: string) => {
    setAuthorizationToken(accessToken);
    setGlobalData({
      ...globalData,
      accessToken,
    });
  };

  const setNotification = (
    type: NotificationType,
    message: string,
    description?: string,
    placement?: NotificationPlacement,
  ) => {
    setGlobalData({
      ...globalData,
      notification: {
        type,
        message,
        description,
        placement: placement ?? "bottomRight",
      },
    });
  };

  return {
    notification: globalData?.notification,
    setNotification,
    accessToken: globalData?.accessToken,
    setAccessToken,
  };
};

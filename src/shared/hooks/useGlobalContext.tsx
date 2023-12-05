import type { NotificationPlacement } from "antd/es/notification/interface";
import { createContext, useContext, useState } from "react";

import { UserType } from "../../modules/login/types/UserTypes";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  placement: NotificationPlacement;
}
interface GlobalData {
  notification?: NotificationProps;
  user?: UserType;
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

  const setUser = (user: UserType) => {
    setGlobalData({
      ...globalData,
      user,
    });
  };

  return {
    notification: globalData?.notification,
    setNotification,
    user: globalData?.user,
    setUser,
  };
};

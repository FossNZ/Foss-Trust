import { notification } from "antd";

export const openNotification = (message: string) => {
    notification.open({
      message,
      description:''
    });
  };
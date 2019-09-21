import { notification } from "antd";

export const openNotification = () => {
    notification.open({
      message: 'Set Beneficiaries Success',
      description:''
    });
  };
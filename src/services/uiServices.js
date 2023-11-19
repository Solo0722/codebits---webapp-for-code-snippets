import { Alert, message } from "antd";

export const showMessage = ({ messageType, content }) => {
  switch (messageType) {
    case "success":
      message.success(content);
      break;
    case "error":
      message.error(content);
      break;
    case "info":
      message.info(content);
      break;
    case "warning":
      message.warning(content);
      break;
    default:
      message.info(content);
      break;
  }
};

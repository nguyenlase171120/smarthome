import { message } from "antd";

export const onHandleErrorAPIResponse = (errorResponse: any) => {
  if (errorResponse.response!.status >= 500) {
    message.error(
      "Something happened in the our system. Please try again, thanks you. "
    );
  }

  errorResponse.response && message.error(errorResponse.response.data.message);
};

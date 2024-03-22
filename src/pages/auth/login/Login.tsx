import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { Button, Form, Input, Row, Typography, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import Heading from "../../../components/heading/Heading";
import "./Login.css";
import { LoginAccountTypes } from "../../../api/Authentication/type";
import { useMutation } from "@tanstack/react-query";
import AuthenticationAPI from "../../../api/Authentication";
import { onHandleErrorAPIResponse } from "../../../utils/helper";
import { END_POINTS } from "../../../utils/constant";

const Login: React.FC = () => {
  const history = useHistory();

  const { mutate: mutateLoginAccount, isPending: isLoadingLoginAccount } =
    useMutation({
      mutationFn: AuthenticationAPI.LoginAccount,
      onSuccess: () => {
        message.success("Đăng nhập tài khoản thành công");
        history.replace(END_POINTS.CUSTOMER_ROLE.HOME);
      },
      onError: (errorResponse) => {
        onHandleErrorAPIResponse(errorResponse);
      },
    });

  const onFinish = (values: LoginAccountTypes): void => {
    mutateLoginAccount(values);
  };

  return (
    <IonPage className="layout-auth">
      <IonContent className="main">
        <div className="header">
          <Heading
            title="Welcome Back"
            helper="Enter your details to login"
            level={3}
            titleSize={20}
          />
        </div>

        <Form onFinish={onFinish} requiredMark={false} layout="vertical">
          <Row gutter={[20, 20]}>
            <div className="image-auth">
              <img src="/img/smarthome.png" alt="logo" />
            </div>
          </Row>

          <Form.Item
            label="Phone Number "
            name="phoneNumber"
            rules={[
              { required: true, message: "Phone number is required" },
              {
                min: 10,
                max: 10,
                message: "Phone number format should be 10 characters",
              },
            ]}
          >
            <Input placeholder="(xxx) xxx-xxxx" name="phoneNumber" />
          </Form.Item>
          <div>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must at least 8 characters, one letter and one number",
                },
              ]}
            >
              <Input.Password autoComplete="password" placeholder="123456aA!" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "40px" }}
              loading={isLoadingLoginAccount}
            >
              Login Account
            </Button>
          </Form.Item>
        </Form>
      </IonContent>
      <IonFooter className="footer">
        <Typography> Don't have an account ?</Typography>
        <Link to={END_POINTS.AUTHENTICATION.SIGN_UP}>Sign Up</Link>
      </IonFooter>
    </IonPage>
  );
};

export default Login;

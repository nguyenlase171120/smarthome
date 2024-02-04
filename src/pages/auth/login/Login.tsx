import {
  IonContent,
  IonFooter,
  IonIcon,
  IonModal,
  IonPage,
} from "@ionic/react";
import { Button, Form, Input, Typography, message } from "antd";
import { logoFacebook, logoTwitter } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Heading from "../../../components/heading/Heading";
import ForgotPassword from "../forgot-password/ForgotPassword";
import "./Login.css";

const Login: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("values", values);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("You logged in successfully");
      history.push("/home");
    } catch (error) {
      console.log("error", error);
      message.error("You failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="layout-auth">
      <IonContent className="main">
        <div className="header">
          <Heading
            title="Welcome"
            helper="Enter your details to login"
            level={3}
            titleSize={20}
          />
        </div>

        <Form onFinish={onFinish}>
          <div className="image-auth">
            <img src="/img/smarthome.png" alt="logo" />
          </div>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                min: 6,
                message: "You must enter at least 6 characters",
              },
            ]}
          >
            <Input
              placeholder="Username"
              style={{ height: "40px" }}
              autoComplete="username"
            />
          </Form.Item>
          <div>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                autoComplete="password"
                placeholder="Password"
                style={{ height: "40px" }}
              />
            </Form.Item>
            <Typography
              style={{ marginBottom: "20px", textAlign: "right" }}
              id="open-modal"
            >
              Forgot Password?
            </Typography>
            <IonModal
              ref={modal}
              trigger="open-modal"
              initialBreakpoint={0.75}
              breakpoints={[0, 0.75]}
            >
              <IonContent className="ion-padding">
                <ForgotPassword />
              </IonContent>
            </IonModal>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "40px" }}
              loading={loading}
            >
              {!loading ? "Login" : ""}
            </Button>
          </Form.Item>
          <div className="login-with">
            <span>Or login with</span>
            <div className="login-with-icon">
              <IonIcon icon={logoFacebook} size="large" color="primary" />
              <IonIcon icon={logoTwitter} size="large" color="primary" />
            </div>
          </div>
        </Form>
      </IonContent>

      <IonFooter className="footer">
        <Typography> Don't have an account ?</Typography>
        <Link to={"/register"}>Sign Up</Link>
      </IonFooter>
    </IonPage>
  );
};

export default Login;

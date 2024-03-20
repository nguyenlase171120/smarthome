import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { Button, Form, Input, Typography, message } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Heading from "../../../components/heading/Heading";
import "../login/Login.css";
import { END_POINTS } from "../../../utils/constant";

const Register: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (value: any) => {};

  return (
    <IonPage className="layout-auth">
      <IonContent className="main" scrollY={false}>
        <div className="header">
          <Heading
            title="Create Account"
            helper="Signup to get started"
            level={3}
            titleSize={20}
          />
        </div>

        <Form onFinish={onFinish} form={form}>
          <div className="image-auth">
            <img src="/img/smarthome.png" alt="logo" />
          </div>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your fullname!" },
              {
                min: 6,
                message: "You must enter at least 6 characters",
              },
            ]}
          >
            <Input placeholder="Full Name" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "Please input your mobile!" },
              {
                pattern: /^0\d{9}$/,
                message:
                  "Please enter a valid 10-digit mobile number starting with 0!",
              },
            ]}
          >
            <Input placeholder="Mobile Phone" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email Address" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              style={{ height: "40px" }}
              autoComplete="password"
            />
          </Form.Item>
          <Form.Item
            name="confim-password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please input your confim password!" },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confim Password"
              style={{ height: "40px" }}
              autoComplete="confim-password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: "100%", height: "40px" }}
              htmlType="submit"
              loading={loading}
            >
              {!loading ? "Sign Up" : ""}
            </Button>
          </Form.Item>
        </Form>
      </IonContent>

      <IonFooter className="footer">
        <Typography> Don't have an account ?</Typography>
        <Link to={END_POINTS.AUTHENTICATION.LOGIN}>Sign In</Link>
      </IonFooter>
    </IonPage>
  );
};

export default Register;

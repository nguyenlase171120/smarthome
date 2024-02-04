import { Button, Form, Input } from "antd";
import React from "react";
import Heading from "../../../components/heading/Heading";
import "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  const onFinish = (value: any) => {
    console.log("value", value);
  };
  return (
    <div className="forgot-password">
      <img
        src="/img/smarthome.png"
        alt="logo"
        className="forgot-password-img"
      />
      <Form onFinish={onFinish} style={{ width: "100%" }}>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Heading
            title="Forgot Password"
            helper="Enter Email Address to get OTP"
            level={3}
            titleSize={20}
            textAlign="center"
          />
        </div>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
          style={{ height: "40px" }}
        >
          <Input placeholder="Enter Email Address" style={{ height: "40px" }} />
        </Form.Item>
        <Form.Item style={{ height: "40px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", height: "40px" }}
          >
            Get OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;

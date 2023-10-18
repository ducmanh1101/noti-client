import { Button, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDeviceToken } from "../push";

export const Subscribers = () => {
  const navigate = useNavigate();
  const [subscriberId, setSubscriberId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const urlServer = process.env.REACT_APP_URL_BACKEND;

  useEffect(() => {
    (async () => {
      const deviceTokens: any = await getDeviceToken();
      console.log(deviceTokens);
      setDeviceToken(deviceTokens);
    })();
  }, []);

  const handleRegister = async () => {
    try {
      await axios.post(`${urlServer}/subscribers`, {
        subscriberId: subscriberId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      });

      await axios.put(`${urlServer}/subscribers/fcm/${subscriberId}`, {
        deviceTokens: [deviceToken],
      });
      sessionStorage.setItem("Subscriber_ID", subscriberId);
      console.log(deviceToken);
      if (subscriberId) return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row align="middle" justify="center">
      <Col>
        <Typography.Title style={{ textAlign: "center" }} level={3}>
          Register Subscriber
        </Typography.Title>
      </Col>
      <Col
        span={24}
        style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 650 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={(e) => setSubscriberId(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <Input onChange={(e) => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleRegister}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

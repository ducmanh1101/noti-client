import { useSDK } from "@metamask/sdk-react";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getDeviceToken } from "../push";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MetaMask = () => {
  const { sdk } = useSDK();
  const [deviceToken, setDeviceToken] = useState("");
  const navigate = useNavigate();
  const urlServer = process.env.REACT_APP_URL_BACKEND;

  useEffect(() => {
    (async () => {
      const deviceTokens: any = await getDeviceToken();
      setDeviceToken(deviceTokens);
    })();
  }, []);

  const connect = async () => {
    try {
      const accounts: any = await sdk?.connect();

      await axios.post(`${urlServer}/subscribers`, {
        subscriberId: `${accounts?.[0]}`,
      });

      await axios.put(`${urlServer}/subscribers/fcm/${accounts?.[0]}`, {
        deviceTokens: [deviceToken],
      });
      sessionStorage.setItem("Subscriber_ID", accounts?.[0]);
      return navigate("/home");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col>
        <Button onClick={connect}>Connect metamask wallet</Button>
      </Col>
    </Row>
  );
};

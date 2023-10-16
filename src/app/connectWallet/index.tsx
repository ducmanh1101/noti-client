import { useSDK } from "@metamask/sdk-react";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getDeviceToken } from "../push";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MetaMask = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, chainId } = useSDK();
  const [deviceToken, setDeviceToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const deviceTokens: any = await getDeviceToken();
      setDeviceToken(deviceTokens);
    })();
  }, []);

  const connect = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts?.[0]);

      await axios.post(`http://localhost:3001/subscribers`, {
        subscriberId: `${accounts?.[0]}`,
      });

      await axios.put(
        `http://localhost:3001/subscribers/fcm/${accounts?.[0]}`,
        {
          deviceTokens: [deviceToken],
        }
      );
      sessionStorage.setItem("Subscriber_ID", accounts?.[0]);
      return navigate("/");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col>
        <Button onClick={connect}>Connect metamask wallet</Button>
      </Col>
      {/* {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )} */}
    </Row>
  );
};

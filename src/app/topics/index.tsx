import { Button, Card, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";

import { ShowTopics } from "./showTopics";

export const Topics = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<any>("");
  const AppId: any = process.env.REACT_APP_APPLICATION_ID;

  const handleDisconnect = () => {
    sessionStorage.clear();
    return navigate("/register");
  };

  useEffect(() => {
    const nameSession = sessionStorage.getItem("Subscriber_ID");
    setName(nameSession);
  }, [name]);

  return (
    <Row gutter={[8, 8]} justify="center" align="middle">
      <Col span={24} style={{ textAlign: "center" }}>
        <Typography.Text>Connected to: {name}</Typography.Text>
      </Col>
      <Col>
        <Space size="large">
          <NovuProvider
            subscriberId={name}
            applicationIdentifier={AppId}
            initialFetchingStrategy={{
              fetchNotifications: true,
              fetchUserPreferences: true,
            }}
          >
            <PopoverNotificationCenter colorScheme={"light"}>
              {({ unseenCount }) => (
                <NotificationBell unseenCount={unseenCount} />
              )}
            </PopoverNotificationCenter>
          </NovuProvider>
          <Button onClick={handleDisconnect}>Disconnect wallet </Button>
        </Space>
      </Col>

      <Col span={24}>
        <Card
          style={{ textAlign: "center", backgroundColor: "#d4f0fc" }}
          bodyStyle={{ width: "auto" }}
        >
          <ShowTopics />
        </Card>
      </Col>
    </Row>
  );
};

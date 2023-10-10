import { useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import Column from "antd/es/table/Column";
import { UseNotifications } from "./customLayoutInApp";

export interface subsType {
  channels: [
    {
      _integrationId: string;
      credentials: {
        channel: string;
        deviceTokens: [string];
        webhookUrl: string;
      };
      integrationIdentifier: string;
      providerId: string;
    }
  ];
  createdAt: string;
  deleted: boolean;
  email: string;
  firstName: string;
  id: string;
  isOnline: boolean;
  lastName: string;
  lastOnlineAt: string;
  phone: string;
  subscriberId: string;
  updatedAt: string;
  __v: number;
  _environmentId: number;
  _id: string;
  _organizationId: string;
}

const ShowAllSubscribers = () => {
  const [dataSubs, setDataSubs] = useState<subsType[]>([]);
  const [dataSub, setDataSub] = useState<subsType[]>([]);

  const handleShow = async (subscriberId: string) => {
    try {
      const response = await axios.get<subsType[]>(
        `https://api.novu.co/v1/subscribers/${subscriberId}`,
        {
          headers: {
            Authorization: "ApiKey 0b35f0a6034708d564663cfe8d35b08f",
          },
        }
      );
      setDataSub(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (subscriberId: string) => {
    try {
      await axios.delete(`http://localhost:3001/subscribers/${subscriberId}`, {
        data: {
          subscriberId,
        },
      });
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.novu.co/v1/subscribers`, {
        headers: {
          Authorization: "ApiKey 0b35f0a6034708d564663cfe8d35b08f",
        },
      });
      const datas = response.data;
      setDataSubs(datas.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataSubs]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={2}>Subscribers</Typography.Title>
          <Table dataSource={dataSubs}>
            <Column
              title="Subscriber"
              key="subscriberId"
              dataIndex="subscriberId"
            />
            <Column
              title="Action"
              render={(_: any, record: subsType) => (
                <Space key={record._id}>
                  <Button
                    type="primary"
                    onClick={() => handleShow(record.subscriberId)}
                  >
                    Show
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleDelete(record.subscriberId);
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Space>
      </Col>
      {dataSub && (
        <Col span={12}>
          <Typography.Title level={2}>Subscriber</Typography.Title>
          {Object.values(dataSub).map((data) => (
            <Space.Compact key={data._id} direction="vertical">
              <NovuProvider
                subscriberId={data.subscriberId}
                applicationIdentifier={"j4EdzFA6NpYc"}
                //   styles={styles}
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
              <Typography.Text>
                Subscriber ID: {data.subscriberId}
              </Typography.Text>
              <Typography.Text>First Name: {data.firstName}</Typography.Text>
              <Typography.Text>Last Name: {data.lastName}</Typography.Text>
              <Typography.Text>Email: {data.email}</Typography.Text>
              <Typography.Text>Phone: {data.phone}</Typography.Text>
              <NovuProvider
                subscriberId={data.subscriberId}
                applicationIdentifier={"j4EdzFA6NpYc"}
                initialFetchingStrategy={{
                  fetchNotifications: true,
                  fetchOrganization: true,
                  fetchUnseenCount: true,
                  fetchUserPreferences: true,
                }}
              >
                <UseNotifications />
              </NovuProvider>
            </Space.Compact>
          ))}
        </Col>
      )}
    </Row>
  );
};

export default ShowAllSubscribers;

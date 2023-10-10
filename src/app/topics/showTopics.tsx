import { Button, Col, Row, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddSubscriber } from "./addSubscriber";
import { API_KEY } from "../../constants";
import { RemoveSubscriber } from "./removeSubscriber";

export interface TopicType {
  key: string;
  name: string;
  subscribers: [];
}

export const ShowTopics = () => {
  const [dataTopic, setDataTopic] = useState<TopicType[]>([]);

  const handleDeleteTopic = async (topicKey: string) => {
    try {
      await axios.delete(`https://api.novu.co/v1/topics/${topicKey}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
    } catch (error) {
      alert("Can't be deleted as it still has subscribers assigned");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.novu.co/v1/topics`, {
          headers: {
            Authorization: API_KEY,
          },
        });
        const datas = response.data;
        setDataTopic(datas.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataTopic]);

  return (
    <Row>
      <Col>
        <Table dataSource={dataTopic}>
          <Column title="Topic name" dataIndex="name" key="name" />
          <Column
            title="Subscribers"
            dataIndex="subscribers"
            key="subscribers"
            render={(subscribers: string[]) => (
              <Space>
                {subscribers.map((sub) => (
                  <Tag key={sub}>{sub}</Tag>
                ))}
              </Space>
            )}
          />
          <Column
            title="Action"
            key="key"
            dataIndex="key"
            render={(key: string) => (
              <Space key={key} size="middle">
                <AddSubscriber topicKey={key} />

                <RemoveSubscriber topicKey={key} />

                <Button
                  onClick={() => handleDeleteTopic(key)}
                  type="primary"
                  danger
                >
                  {" "}
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      </Col>
    </Row>
  );
};

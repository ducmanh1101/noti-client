import { Card, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddSubscriber } from "./addSubscriber";
import { DetailTopic } from "./detailTopic";

export interface TopicType {
  key: string;
  name: string;
  subscribers: [];
}

export const ShowTopics = () => {
  const [dataTopic, setDataTopic] = useState<TopicType[]>([]);
  const urlServer = process.env.REACT_APP_URL_BACKEND;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlServer}/topics`);
        setDataTopic(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataTopic, urlServer]);

  return (
    <Space size="large" wrap>
      {dataTopic &&
        Object.values(dataTopic).map((data) => (
          <Card
            key={data.key}
            style={{ width: 320, cursor: "pointer" }}
            cover={
              <img
                style={{}}
                alt="example"
                src="https://miro.medium.com/v2/resize:fit:1024/format:webp/1*z4yZG8-fyV20VItjpNHyLw.jpeg"
              />
            }
            actions={[
              <AddSubscriber key="follow" topicKey={data.key} />,
              <DetailTopic key="detail" />,
            ]}
          >
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {data.name}
            </Typography.Text>
            <Space style={{ display: "flex", marginTop: 10 }} wrap>
              <Tag style={{ borderRadius: 10 }}>Blog</Tag>
              <Tag style={{ borderRadius: 10 }}>Topic</Tag>
              <Tag style={{ borderRadius: 10 }}>Crypto</Tag>
            </Space>
          </Card>
        ))}
    </Space>
  );
};

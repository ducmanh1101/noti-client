import { Button, Col, Modal, Row, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../constants";
import { TopicType } from "./showTopics";

type RemoveSubToTopicProps = {
  topicKey: string;
};

export const RemoveSubscriber = ({ topicKey }: RemoveSubToTopicProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTopic, setDataTopic] = useState<TopicType[]>([]);

  const handleRemoveSubscriber = async (subscribers: []) => {
    try {
      const options = {
        method: "POST",
        url: `https://api.novu.co/v1/topics/${topicKey}/subscribers`,
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        data: {
          subscribers: subscribers,
        },
      };

      await axios(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.novu.co/v1/topics/${topicKey}`;
        const headers = {
          Authorization: API_KEY,
        };

        const response = await axios.get(url, { headers });
        const data = response.data;
        setDataTopic(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [topicKey]);

  //   useEffect(() => {
  //     const addSubscriber = async () => {
  //       const url = `https://api.novu.co/v1/topics/${topicKey}/subscribers/removal`;
  //       const authorizationToken = API_KEY;
  //       const headers = {
  //         Authorization: authorizationToken,
  //         'Content-Type': 'application/json',
  //       };
  //       const data = {
  //         subscribers: [],
  //       };

  //       try {
  //         const response = await axios.get(url, data, { headers });
  //         await axios.post(url, data, { headers });
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     addSubscriber();
  //   }, []);

  return (
    <>
      <Button danger onClick={() => setIsModalOpen(true)}>
        Remove Subscriber
      </Button>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space direction="vertical">
          {Object.values(dataTopic).map((data, index) => (
            <Row key={index} gutter={[8, 8]}>
              <Col span={22}>
                <Typography.Text>{data.subscribers}</Typography.Text>
              </Col>
              <Col span={2}>
                <Button
                  onClick={() => handleRemoveSubscriber(data.subscribers)}
                  type="primary"
                  danger
                >
                  Remove to topic
                </Button>
              </Col>
            </Row>
          ))}
        </Space>
      </Modal>
    </>
  );
};

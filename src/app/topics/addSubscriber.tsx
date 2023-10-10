import { Button, Col, Row, Space, Typography } from "antd";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { subsType } from "../subscribers/getSubs";
import { API_KEY } from "../../constants";

type AddSubToTopicProps = {
  topicKey: string;
};

export const AddSubscriber = ({ topicKey }: AddSubToTopicProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listSubscriber, setListSubscriber] = useState<subsType[]>([]);

  const fetchDataSub = async () => {
    try {
      const response = await axios.get(`https://api.novu.co/v1/subscribers`, {
        headers: {
          Authorization: "ApiKey 0b35f0a6034708d564663cfe8d35b08f",
        },
      });
      const datas = response.data;
      setListSubscriber(datas.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddSubscriber = async (subscriberId: string) => {
    try {
      const options = {
        method: "POST",
        url: `https://api.novu.co/v1/topics/${topicKey}/subscribers`,
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        data: {
          subscribers: [subscriberId],
        },
      };

      await axios(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataSub();
  }, []);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add subscriber
      </Button>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space direction="vertical">
          {Object.values(listSubscriber).map((data) => (
            <Row key={data._id} gutter={[8, 8]}>
              <Col span={22}>
                <Typography.Text>{data.subscriberId}</Typography.Text>
              </Col>
              <Col span={2}>
                <Button
                  onClick={() => handleAddSubscriber(data.subscriberId)}
                  type="primary"
                >
                  Add to topic
                </Button>
              </Col>
            </Row>
          ))}
        </Space>
      </Modal>
    </>
  );
};

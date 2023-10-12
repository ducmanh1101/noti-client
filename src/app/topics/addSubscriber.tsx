import { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";

import { TopicType } from "./showTopics";

type AddSubToTopicProps = {
  topicKey: string;
};

export const AddSubscriber = ({ topicKey }: AddSubToTopicProps) => {
  const [isFollow, setIsFollow] = useState(false);
  const currentSubscriberId = sessionStorage.getItem("Subscriber_ID");

  const handle = useCallback(async () => {
    try {
      const response = await axios.get<TopicType>(
        `http://localhost:3001/topics/${topicKey}`
      );
      const topic: TopicType = response.data;
      const subs: [] = topic.subscribers;
      for (const elm of subs) {
        if (currentSubscriberId === elm) setIsFollow(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentSubscriberId, topicKey]);

  async function handleAddSubscriber() {
    try {
      const options = {
        method: "POST",
        url: `http://localhost:3001/topics/add/${topicKey}`,
        data: {
          subscribers: currentSubscriberId,
        },
      };
      setIsFollow(true);
      await axios(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    handle();
  }, [handle]);

  return (
    <>
      <Button
        style={{ width: 120, backgroundColor: "#d4f0fc", border: "none" }}
        onClick={handleAddSubscriber}
      >
        {isFollow ? "FOLLOWING" : "FOLLOW"}
      </Button>

      {/* <Modal
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
      </Modal> */}
    </>
  );
};

import {
  Button,
  Col,
  Input,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { subsType } from "./showAllSubs";
import { TopicType } from "../topics/showTopics";
import axios from "axios";
import { API_KEY } from "../../constants";

export const Trigger = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [topicKey, setTopicKey] = useState("");
  const [optionSub, setOptionSub] = useState<SelectProps["options"]>([]);
  const [optionTopic, setOptionTopic] = useState<SelectProps["options"]>([]);

  const fetchDataSub = async () => {
    try {
      const response = await axios.get(`https://api.novu.co/v1/subscribers`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = response.data;

      const subs: subsType[] = data.data;
      const listSubs: SelectProps["options"] = [];

      for (const elm of subs) {
        listSubs.push({
          label: elm.subscriberId,
          value: elm.subscriberId,
        });
      }
      setOptionSub(listSubs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTopic = async () => {
    try {
      const response = await axios.get(`https://api.novu.co/v1/topics`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = response.data;
      const topics: TopicType[] = data.data;
      const listTopics: SelectProps["options"] = [];
      for (const elm of topics) {
        listTopics.push({
          label: elm.name,
          value: elm.key,
        });
      }
      setOptionTopic(listTopics);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendToSubscriber = async () => {
    try {
      await axios.post("http://localhost:3001/event", {
        subscriberId: subscriberId,
        title: title,
        description: description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToTopic = async (topicKey: string) => {
    await axios.post(`http://localhost:3001/event/topics/${topicKey}`, {
      key: topicKey,
      title: title,
      description: description,
    });
  };

  useEffect(() => {
    fetchDataSub();
    fetchDataTopic();
  }, []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <Typography.Title level={2}>Send notification</Typography.Title>
        <Space.Compact direction="vertical">
          <Typography.Text>Enter title notification</Typography.Text>

          <Input
            placeholder="Enter title notification"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography.Text>Enter title notification</Typography.Text>
          <Input
            placeholder="Enter description notification"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Space.Compact>
      </Col>
      <Col>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Space.Compact direction="vertical">
                  <Typography.Text>Chose subscriber</Typography.Text>
                  <Select
                    defaultValue={"optionSub"}
                    style={{ width: 120 }}
                    onChange={setSubscriberId}
                    options={optionSub}
                  ></Select>
                </Space.Compact>
              </Col>
              <Col span={12}>
                <Button
                  style={{ height: "100%" }}
                  type="primary"
                  onClick={handleSendToSubscriber}
                >
                  Send to Subscriber
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Space.Compact direction="vertical">
                  <Typography.Text>Chose topic</Typography.Text>
                  <Select
                    defaultValue=""
                    style={{ width: 120 }}
                    onChange={setTopicKey}
                    options={optionTopic}
                  ></Select>
                </Space.Compact>
              </Col>
              <Col span={12}>
                <Button
                  style={{ height: "100%" }}
                  type="primary"
                  onClick={() => handleSendToTopic(topicKey)}
                >
                  Send to Topic
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

import { Button, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { API_KEY } from "../../constants";
import { useState } from "react";

export const CreateTopics = () => {
  const [topicKey, setTopicKey] = useState("");
  const [topicName, setTopicName] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleCreateTopic = async () => {
    try {
      const options = {
        method: "POST",
        url: "https://api.novu.co/v1/topics",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        data: {
          key: topicKey,
          name: topicName,
        },
      };
      await axios(options);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row gutter={[8, 8]}>
      <Col>
        <Typography.Title>Create Topic:</Typography.Title>
      </Col>
      <Col>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Topic Key"
            name="TopicKey"
            rules={[
              { required: true, message: "Please input your topic key!" },
            ]}
          >
            <Input onChange={(e) => setTopicKey(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Topic name"
            name="TopicName"
            rules={[
              { required: true, message: "Please input your topic name!" },
            ]}
          >
            <Input onChange={(e) => setTopicName(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleCreateTopic}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

import { Col, Row } from "antd";
import React from "react";
import { CreateTopics } from "./createTopics";
import { ShowTopics } from "./showTopics";

export const Topics = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <CreateTopics />
      </Col>
      <Col span={16}>
        <ShowTopics />
      </Col>
      {/* <Col span={8}>dasd</Col> */}
    </Row>
  );
};

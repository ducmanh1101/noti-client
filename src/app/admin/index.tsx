import React from "react";
import ShowAllSubscribers from "./showAllSubs";
import { Col, Row } from "antd";
import { Trigger } from "./trigger";

export const Admin = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <ShowAllSubscribers />
      </Col>
      <Col>
        <Trigger />
      </Col>
    </Row>
  );
};

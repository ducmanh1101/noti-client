import { Col, Row } from "antd";
import React from "react";
import { Topics } from "./topics";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./admin";

export const App = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="" element={<Topics />} />
        </Routes>
      </Col>
    </Row>
  );
};

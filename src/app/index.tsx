import { Col, Row } from "antd";
import React from "react";
import { Topics } from "./topics";
import { Route, Routes } from "react-router-dom";
import { MetaMask } from "./connectWallet";

export const App = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Routes>
          <Route path="" element={<Topics />} />
          <Route path="/register" element={<MetaMask />} />
        </Routes>
      </Col>
    </Row>
  );
};

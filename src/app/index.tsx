import { Col, Row } from "antd";
import { Route, Routes } from "react-router-dom";

import { Topics } from "./topics";
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

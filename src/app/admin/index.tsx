import React, { useState } from "react";
import ShowAllSubscribers from "./showAllSubs";
import { Card } from "antd";
import { Trigger } from "./trigger";

const tabList = [
  {
    key: "tab1",
    tab: "Send notifications",
  },
  {
    key: "tab2",
    tab: "Manage Subscribers",
  },
];
const contentList: Record<string, React.ReactNode> = {
  tab1: <Trigger />,
  tab2: <ShowAllSubscribers />,
};

export const Admin = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        title="ADMIN"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

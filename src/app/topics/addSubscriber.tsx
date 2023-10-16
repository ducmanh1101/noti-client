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
  const urlServer = process.env.REACT_APP_URL_BACKEND;

  const handle = useCallback(async () => {
    try {
      const response = await axios.get<TopicType>(
        `${urlServer}/topics/${topicKey}`
      );
      const topic: TopicType = response.data;
      const subs: [] = topic.subscribers;
      for (const elm of subs) {
        if (currentSubscriberId === elm) setIsFollow(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentSubscriberId, topicKey, urlServer]);

  async function handleAddSubscriber() {
    try {
      const options = {
        method: "POST",
        url: `${urlServer}/topics/add/${topicKey}`,
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
    </>
  );
};

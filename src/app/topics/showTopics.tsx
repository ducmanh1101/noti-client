import { Card, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddSubscriber } from "./addSubscriber";
import { DetailTopic } from "./detailTopic";

export interface TopicType {
  key: string;
  name: string;
  subscribers: [];
}

export const ShowTopics = () => {
  const [dataTopic, setDataTopic] = useState<TopicType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/topics`);
        setDataTopic(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataTopic]);

  return (
    <Space size="large" wrap>
      {dataTopic &&
        Object.values(dataTopic).map((data) => (
          <Card
            key={data.key}
            style={{ width: 320, cursor: "pointer" }}
            cover={
              <img
                style={{}}
                alt="example"
                src="https://firstsiteguide.com/wp-content/uploads/2021/10/best-crypto-blogs.png"
              />
            }
            actions={[
              <AddSubscriber key="follow" topicKey={data.key} />,
              <DetailTopic key="detail" />,
            ]}
          >
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {data.name}
            </Typography.Text>
            <Space style={{ display: "flex", marginTop: 10 }} wrap>
              <Tag style={{ borderRadius: 10 }}>Blog</Tag>
              <Tag style={{ borderRadius: 10 }}>Topic</Tag>
              <Tag style={{ borderRadius: 10 }}>Crypto</Tag>
            </Space>
          </Card>
        ))}
    </Space>
    // <Row>
    //   <Col>
    //     <Table dataSource={dataTopic}>
    //       <Column title="Topic name" dataIndex="name" key="name" />
    //       <Column
    //         title="Subscribers"
    //         dataIndex="subscribers"
    //         key="subscribers"
    //         render={(subscribers: string[]) => (
    //           <Space>
    //             {subscribers.map((sub) => (
    //               <Tag key={sub}>{sub}</Tag>
    //             ))}
    //           </Space>
    //         )}
    //       />
    //       <Column
    //         title="Action"
    //         key="key"
    //         dataIndex="key"
    //         render={(key: string) => (
    //           <Space key={key} size="middle">
    //             <AddSubscriber topicKey={key} />

    //             <RemoveSubscriber topicKey={key} />

    //             <Button
    //               onClick={() => handleDeleteTopic(key)}
    //               type="primary"
    //               danger
    //             >
    //               Delete
    //             </Button>
    //           </Space>
    //         )}
    //       />
    //     </Table>
    //   </Col>
    // </Row>
  );
};

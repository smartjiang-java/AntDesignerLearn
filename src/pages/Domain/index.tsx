import React, { Component } from "react";
import { Button, Card,Table } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    key: 'name',
    width: '10%',
  },
  {
    title: '数据类型',
    dataIndex: 'type',
    key: 'type',
    width: '10%',
  },
  {
    title: '属性描述',
    dataIndex: 'description',
    key: 'description',
    width: '10%',
  },
  
  {
    title: '必填',
    key: 'necessaryStr',
    dataIndex: 'necessaryStr',
    width: '5%',
  },
  {
    title: '最大长度',
    dataIndex: 'length',
    key: 'length',
    width: '10%',
  },
  {
    title: '隔离级别',
    dataIndex: 'isolation',
    key: 'isolation',
    width: '10%',
  },
  {
    dataIndex: 'oper',
    key: 'oper',
    width: '15%',
  }
];

const data: { name: React.ReactNode; }[] | undefined = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   age: 32,
  //   address: 'New York No. 1 Lake Park',
  //   tags: ['nice', 'developer'],
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  //   tags: ['loser'],
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sidney No. 1 Lake Park',
  //   tags: ['cool', 'teacher'],
  // },
];


class Index extends Component {
  render() {
    return (
      <PageContainer>
        <Card>
          <Button type="primary">
            创建域
      </Button>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageContainer>
    )
  }
}

export default Index;

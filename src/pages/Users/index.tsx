import React from "react";
import {PageContainer} from '@ant-design/pro-layout';
import {Table, Tag, Space} from 'antd';
import { connect } from "umi";

//使用函数组件
//把users作为参数传过来,分属于不同的函数
const index = ({ users }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: React.ReactNode; }) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="list-table">
        <Table columns={columns} dataSource={users}/>
      </div>
    </PageContainer>
  )
};

//参数是一个对象state,里面有一个users,router,loading以及其他属性 state={users,router,loading}
// 里面的users对应model层的namespace
const mapStateToProps = ({users}) => {
  return {
    users,
  };
};

//reduces连接方法
export default connect(mapStateToProps)(index);

import React from "react";
import {PageContainer} from '@ant-design/pro-layout';
import {Table, Space} from 'antd';
import { connect } from "umi";

//使用函数组件
//把users作为参数传过来,分属于不同的函数
const index = ({ users }:any) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
   {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: React.ReactNode; }) => (
        <Space size="middle">
          <a>edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="list-table">
        {/*<Table columns={columns} dataSource={users}/>*/}
        <Table columns={columns} dataSource={users.data}/>
      </div>
    </PageContainer>
  )
};

//参数是一个对象state,里面有一个users,router,loading以及其他属性 state={users,router,loading}
// 里面的users对应model层的namespace
const mapStateToProps = ({users}:any) => {
  return {
    users,
  };
};

//reduces连接方法
export default connect(mapStateToProps)(index);

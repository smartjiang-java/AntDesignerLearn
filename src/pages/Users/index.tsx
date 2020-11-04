import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';

//使用函数组件
//把users作为参数传过来,分属于不同的函数
const index = ({ users }: any) => {
  //返回的是一个数组,const [变量名称,修改变量的方法]=useState(初始值);
  // const []=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState({});

  /**
   * 显示对话框,并且将数据传过去
   */
  const editHandle = (record: React.SetStateAction<{}>) => {
    setModalVisible(true);
    setRecord(record);
  };

  /**
   * 关闭对话框
   */
  const closeHandle = () => {
    setModalVisible(false);
  };

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
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandle(record);
            }}
          >
            edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="list-table">
        {/*<Table columns={columns} dataSource={users}/>*/}
        <Table columns={columns} dataSource={users.data} rowKey="id" />
        <UserModal visible={modalVisible} closeHandle={closeHandle} record={record} />
      </div>
    </PageContainer>
  );
};

//参数是一个对象state,里面有一个users,router,loading以及其他属性 state={users,router,loading}
// 里面的users对应model层的namespace
const mapStateToProps = ({ users }: any) => {
  return {
    users,
  };
};

//reduces连接方法
export default connect(mapStateToProps)(index);

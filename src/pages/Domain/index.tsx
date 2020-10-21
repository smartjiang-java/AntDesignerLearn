import React, {FC, useRef, useState, useEffect} from 'react';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {
  Button,
  Card,
  Dropdown,
  List,
  Menu,
  Modal, Table,
} from 'antd';

import {findDOMNode} from 'react-dom';
import {PageContainer} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import OperationModal from './components/OperationModal';
import {StateType} from './model';
import {BasicListItemDataType} from './data.d';
import styles from './style.less';

interface DomainProps {
  Domain: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

export const Domain: FC<DomainProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    Domain: {list},
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'Domain/fetch',
      payload: {
        count: 5,
      },
    });
  }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  //进行编辑
  const showEditModal = (item: BasicListItemDataType) => {
    //console.log(item.isolation);
    setVisible(true);
    setCurrent(item);

  };

  //进行删除
  const deleteItem = (id: string) => {
    dispatch({
      type: 'Domain/submit',
      payload: {id},
    });
  };

  const editAndDelete = (key: string | number, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({item}) => (
    <Dropdown
      overlay={
        <Menu onClick={({key}) => editAndDelete(key, item)}>
         {/* <Menu.Item key="edit">编辑</Menu.Item>*/}
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined/>
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      //.log(addBtnDom)

      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  //点击取消
  const handleCancel = (item: BasicListItemDataType) => {
    setAddBtnblur();
    setVisible(false);

  };

  //创建后提交
  const handleSubmit = (values: BasicListItemDataType) => {
    //console.log(values.isolation);

    const ids = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'Domain/submit',
      payload: {ids, ...values},
    });
  };

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
      title: '操作',
      key: 'operate',
      width: '10%',
      render: (item: BasicListItemDataType) => {
        return (
          <List.Item
            actions={[
              <a
                key="edit"
                onClick={(e) => {
                  e.preventDefault();
                  showEditModal(item);
                }}
              >
                编辑
              </a>,
              <MoreBtn key="more" item={item}/>,
            ]}
          >
          </List.Item>
        );
      }
    },

  ]
  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card>
            <Button
              type="primary"
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined/>
              创建域
            </Button>
            <Table
              size="large"
              rowKey="id"
              columns={columns}
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
            />
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
     Domain,
     loading,
   }: {
    Domain: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    Domain,
    loading: loading.models.Domain,
  }),
)(Domain
);

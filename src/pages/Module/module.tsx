import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ModuleListItem } from '@/pages/Module/data';
import CreateModuleForm from '@/pages/Module/components/CreateModuleForm';
import { addModule, queryModule } from '@/pages/Module/service';


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: ModuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addModule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const ModuleList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const columns: ProColumns<ModuleListItem>[] = [
    {
      title: '模块名称',
      dataIndex: 'moduleName',
      tip: '模块和接口直接关联',
      width: '10',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '模块名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: '10',
      render: (dom, entity) => {
        return <a> {dom}</a>;
      },
    },
    {
      title: '功能描述',
      dataIndex: 'desc',
      width: '50',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10',
      render: (_, record) => (
        <>
          <Button type="primary">编辑</Button>
          <span> </span>
          <Button type="primary">关联到项目</Button>
          <span> </span>
          <Button danger>删除</Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ModuleListItem>
        headerTitle="模块清单"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建模块
          </Button>,
        ]}
        request={(params, sorter, filter) => queryModule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          // onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <CreateModuleForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<ModuleListItem, ModuleListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateModuleForm>
    </PageContainer>

    );

};

export default ModuleList;

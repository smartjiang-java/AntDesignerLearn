import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryTestUnit, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      testUnitName: fields.testUnitName,
      testUnitDesc: fields.testUnitDesc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TestUnitTableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();

  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '测试单元名称',
      dataIndex: 'testUnitName',
/*      tip: '规则名称是唯一的 key', */
   /*   formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      }, */
      render: (dom) => {
        return <a
        /*  onClick={() => setRow(entity)} */

        >{dom}</a>;
      },
    },
    {
      title: '测试单元描述',
      dataIndex: 'testUnitDesc',
      /*      tip: '规则名称是唯一的 key', */
      /*   formItemProps: {
           rules: [
             {
               required: true,
               message: '规则名称为必填项',
             },
           ],
         }, */
      render: (dom) => {
        return <a
          /*  onClick={() => setRow(entity)} */

        >{dom}</a>;
      },
    },


    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">查看测试单元</a>


          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];
  const CreatFormcolumns: ProColumns<TableListItem>[] = [
    {
      title: '请输入试单元名称',
      dataIndex: 'testUnitName',
      /*      tip: '规则名称是唯一的 key', */
      /*   formItemProps: {
           rules: [
             {
               required: true,
               message: '规则名称为必填项',
             },
           ],
         }, */
      render: (dom) => {
        return <a
          /*  onClick={() => setRow(entity)} */

        >{dom}</a>;
      },
    },
    {
      title: '测试单元描述',
      dataIndex: 'testUnitDesc',
      /*      tip: '规则名称是唯一的 key', */
      /*   formItemProps: {
           rules: [
             {
               required: true,
               message: '规则名称为必填项',
             },
           ],
         }, */
      render: (dom) => {
        return <a
          /*  onClick={() => setRow(entity)} */

        >{dom}</a>;
      },
    },


    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">查看测试单元</a>


          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="测试单元"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)} >
            <PlusOutlined /> 新建测试单元
          </Button>,
        ]}
        request={(params, sorter, filter) => queryTestUnit({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;

            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>

        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>

      <ProTable<TableListItem, TableListItem>
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
        columns={CreatFormcolumns}
      />


    </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.testUnitName && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.testUnitName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.testUnitName,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TestUnitTableList;

import {Button, Input, Popconfirm, Table, message, Select, Checkbox, Tooltip} from 'antd';
import React, {FC, useState} from 'react';
import styles from '../style.less';
import {SelectValue} from "antd/es/select";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface TableFormDateType {
  key: string;
  name?: string;
  worktype?: string;
  department?: string;
  isRequired?: boolean;
  remarks?: string;
  isNew?: true;
  editable?: boolean;
}

interface TableFormProps {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

const {Option} = Select;

const TableForm: FC<TableFormProps> = ({value, onChange}) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  //编辑
  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({...item}));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = {...target};
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };

//清空
  const clean = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
   /* e.preventDefault();*/
    const newData = data?.map((item) => ({...item}));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = {...target};
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };


  const newMember = () => {
    const newData = data?.map((item) => ({...item})) || [];
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      name: '',
      worktype: 'String',
      department: '',
      isRequired: true,
      remarks: '',
      editable: true,

    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const handleFieldChange2 = (
    e: SelectValue,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      setData(newData);
    }
  };

  const handleFieldChange3 = (
    e: CheckboxChangeEvent,
    fieldName: string,
    key: string) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.checked;
      setData(newData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  //点击确认保存数据
  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.worktype || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  //取消
/*  const cancel = (e: React.MouseEvent, key: string) => {
      setClickedCancel(true);
      e.preventDefault();
    const newData = [...(data as TableFormDateType[])];
      // 编辑前的原始数据
      let cacheData: any[];
      cacheData = newData.map((item) => {
        if (item.key === key) {
          if (cacheOriginData[key]) {
            const originItem = {
              ...item,
              ...cacheOriginData[key],
              editable: false,
            };
            delete cacheOriginData[key];
            setCacheOriginData(cacheOriginData);
            return originItem;
          }
        }
        return item;
      });
      setData(cacheData);
      setClickedCancel(false);
    };*/


  const columns = [
    {
      title: '参数代码',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              placeholder={'参数代码'}
              bordered={false}
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              /* placeholder="成员姓名"*/
            />
          );
        }
        return text;
      },
    },
    {
      title: '参数类型',
      dataIndex: 'worktype',
      key: 'worktype',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Select
              bordered={false}
              defaultValue="String"
              onChange={(e) => handleFieldChange2(e, 'worktype', record.key)}>
              <Option value="String">String</Option>
              <Option value="long">long</Option>
              <Option value="list">list</Option>
              <Option value="map">map</Option>
              <Option value="boolean">boolean</Option>
              <Option value="int">int</Option>
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: '属性描述',
      dataIndex: 'department',
      key: 'department',
      /*width: '40%',*/
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Tooltip placement="topLeft" title="最多显示20个字符，超出部分...显示">
              <Input
                placeholder={'属性描述'}
                bordered={false}
                value={text}
                onChange={(e) => handleFieldChange(e, 'department', record.key)}
                onKeyPress={(e) => handleKeyPress(e, record.key)}
              />
            </Tooltip>
          );
        }
        return text;
      },
    },
    {
      title: () => <div className={styles.params_title}>是否必填</div>,
      dataIndex: 'isRequired',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Checkbox
              defaultChecked={false}
              onChange={(e) => {
                handleFieldChange3(e, 'isRequired', record.key);
              }}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return text;
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      /*width: '40%',*/
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Tooltip placement="topLeft" title="最多显示20个字符，超出部分...显示">
              <Input
                placeholder={'备注'}
                bordered={false}
                value={text}
                onChange={(e) => handleFieldChange(e, 'remarks', record.key)}
                onKeyPress={(e) => handleKeyPress(e, record.key)}
              />
            </Tooltip>
          );
        }
        return text;
      },
    },
    {
      className: 'column_domain',
      title: () => (
        <Button
          type="primary"
          style={{width: '100%'}}
          onClick={newMember}
        >
          新增参数
        </Button>
      ),
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        /*       if (!!record.editable && loading) {
                 return null;
               }
               if (record.editable) {
                 if (record.isNew) {
                   return (
                     <span>
                       <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                       <Divider type="vertical"/>
                       <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                         <a>删除</a>
                       </Popconfirm>
                     </span>
                   );
                 }
       /!*          return (
                   <span>
                     <a onClick={(e) => saveRow(e, record.key)}>保存</a>
                     <Divider type="vertical"/>
                     <a onClick={(e) => cancel(e, record.key)}>取消</a>
                   </span>
                 );*!/
               }*/

        return (
          <span>
            {/*<a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>*/}
            <Select
              bordered={false}
              placeholder={"导入域"}
              size={"small"}
              id={"select"}
              style={{width: '60%'}}
              onClick={(e) => clean(e, record.key)}>
              <Option value="String" >清空</Option>
              <Option value="long">long</Option>
            </Select>
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                      <Button type="primary">删除</Button>
            </Popconfirm>
          </span>
        );

      },

    },
    /*    {
          title: '操作',
          key: 'action',
          render: (text: string, record: TableFormDateType) => {
            if (!!record.editable && loading) {
              return null;
            }
            if (record.editable) {
              if (record.isNew) {
                return (
                  <span>
                    <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                    <Divider type="vertical"/>
                    <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                      <a>删除</a>
                    </Popconfirm>
                  </span>
                );
              }
              return (
                <span>
                  <a onClick={(e) => saveRow(e, record.key)}>保存</a>
                  <Divider type="vertical"/>
                  <a onClick={(e) => cancel(e, record.key)}>取消</a>
                </span>
              );
            }
            return (
              <span>
                <a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>
                <Divider type="vertical"/>
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          },
        },*/
  ];

  return (
    <>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      {/*  <Button
        style={{width: '100%', marginTop: 16, marginBottom: 8}}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined/>
        新增成员
      </Button>*/}
    </>
  );
};

export default TableForm;

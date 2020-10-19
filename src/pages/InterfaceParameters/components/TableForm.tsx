import {Button, Input, Popconfirm, Table, message, Select, Checkbox, Tooltip, AutoComplete} from 'antd';
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

//定义数据类型
let options = [
  {value: 'String'},
  {value: 'boolean'},
  {value: 'double',},
  {value: 'float',},
  {value: 'byte',},
  {value: 'long',},
  {value: 'short',},
  {value: 'int',},
];

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
  const clean = (e: SelectValue, key: string) => {
    const newData = data?.map((item) => ({...item}));
    /* newData[0].*/
    const target = getRowByKey(key, newData);
    console.log(target);
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


  //新增参数行
  const newMember = () => {
    const newData = data?.map((item) => ({...item})) || [];
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      name: '',
      worktype: 'String',
      department: '',
      isRequired: false,
      remarks: '',
      editable: true,
    });
    setIndex(index + 1);
    setData(newData);
  };

  //列表选择框
  const rowSelection = {
    onSelect: (record: any, selected: boolean, selectedRows: any) => {
      console.log("onSelect", selectedRows);//所有选中的数据
      //console.log(selectedRows[0].name + selectedRows[0].worktype +selectedRows[0].department);
    },
    onSelectAll: (selected: any, selectedRows: any) => {
      console.log("onSelectAll", selectedRows);  //选中项数据
      //console.log(selectedRows[0].name + selectedRows[0].worktype +selectedRows[0].department);
    },
  };

  //删除参数行
  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  //属性描述和备注输入时判断
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      if (e.target.value.length <= 20) {
        target[fieldName] = e.target.value;
      } else {
        target[fieldName] = e.target.value.substring(0, 17) + "...";
      }
      setData(newData);
    }
  };

  //参数类型输入时进行修改
  const handleFieldChange2 = (
    e: SelectValue,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      console.log(e);
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
      width: '12%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              placeholder={'请输入参数名称'}
              bordered={false}
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
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
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            /*            <Select bordered={false} /!*placeholder={'请选择或者输入参数类型'}  mode={"tags"}*!/ style={{width:'40%'}}
                                onChange={(e) => handleFieldChange2(e, 'worktype', record.key)}
                        >
                          {
                            options.map(item =>
                              <Select.Option value={item}>{}</Select.Option>)
                          }
                          .
                        </Select>*/
            <AutoComplete
              style={{width: 100}}
              placeholder="参数类型"
              bordered={false}
              options={options}
              onChange={(e) => handleFieldChange2(e, 'worktype', record.key)}
              filterOption={(inputValue, option) => {
                // @ts-ignore
                const {value: value1} = option;
                return value1.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
              }}
            />
          );
        }
        return text;
      },
    },
    {
      title: '属性描述',
      dataIndex: 'department',
      key: 'department',
      width: '25%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Tooltip placement="topLeft" title="最多显示20个字符，超出部分...显示">
              <Input
                placeholder={'请输入属性描述'}
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
      width: '8%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Checkbox
              defaultChecked={false}
              onChange={(e) => {
                handleFieldChange3(e, 'isRequired', record.key);}}
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
      width: '25%',
      /*width: '40%',*/
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Tooltip placement="topLeft" title="最多显示20个字符，超出部分...显示">
              <Input
                placeholder={'如有必要，请输入备注'}
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
      width: '20%',
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
            <Select bordered={false} placeholder={"导入域"} size={"small"} id={"select"} style={{width: '60%'}}
              /*  onChange={(e) => clean(e, record.key)}*/>
              <Option value="String" onClick={(e: SelectValue) => clean(e, record.key)}>清空</Option>
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

  // @ts-ignore
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}  //列表选择框
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

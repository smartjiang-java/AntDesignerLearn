import React, {FC, useEffect} from 'react';
import moment from 'moment';
import {Modal, Result, Button, Form, Input, Select, Radio} from 'antd';
import {BasicListItemDataType} from '../data.d';
import styles from '../style.less';


interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const {Option} = Select;
const FormItem = Form.Item;
const {TextArea} = Input;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

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

//定义项目组
let options2 = [
  { value: '消息平台' },
  { value: '新送修系统' },
  { value: '消息平台项目组' },
  { value: '项目管理系统' },
  { value: '接口平台' },
  { value: '理赔服务资源管理系统' },
  { value: '客户信息项目组' },
  { value: '客户信息分析' }
  ];




const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();

  const {done, visible, current, onDone, onCancel, onSubmit} = props;
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const [showProject, setShowProject] = React.useState(false);
  const [showIsolationProject, setShowIsolationProject] = React.useState(false);
  const [showModule, setShowModule] = React.useState(false);
  const [showPackage, setShowPackage] = React.useState(false);

  /*根据隔离级别来选择显示项目还是项目组*/
  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const {isolation} = changedValues;
    if (isolation) {
      setShowPublicUsers(isolation == '项目组')
      setShowProject(isolation == '项目');
      setShowIsolationProject(isolation == '项目');
    }
  };

  /*根据项目隔离级别来选择显示模块还是包*/
  const changeAll = (e: string) => {
    setShowModule(e == '模块');
    setShowPackage(e == '包');
  }

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

 /* 保存函数*/
  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };


  const modalFooter = done
    ? {footer: null, onCancel: onDone}
    : {okText: '保存', onOk: handleSubmit, onCancel};

  /*表格组成的具体列*/
  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    return (
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
        initialValues={{public: '1'}}
        onValuesChange={onValuesChange}>
        <FormItem
          label="域名称"
          name="name"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Input placeholder="域名城"/>
        </FormItem>

        <FormItem
          label="编码"
          rules={[{required: true}]}
          name="code"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Input placeholder="编码"></Input>
        </FormItem>

        <FormItem
          label="长度"
          name="length"
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <Input placeholder="长度"></Input>
        </FormItem>

        <FormItem
          label="基础类型"
          name="type"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Select style={{width: '100%'}} options={options}>
          </Select>
        </FormItem>

        <FormItem
          label="是否必填"
          name="necessaryStr"
          rules={[{required: true}]}
          initialValue={0}
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <Select style={{width: '100%'}}>
            <Option value={0}>是</Option>
            <Option value={1}>否</Option>
          </Select>
        </FormItem>

        <FormItem
          label="属性描述"
          name="description"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <TextArea autoSize={{minRows: 6, maxRows: 12}} placeholder="属性描述"></TextArea>
        </FormItem>

        <FormItem
          label="隔离级别"
          name="isolation"
          initialValue="全局"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          rules={[{required: true}]}
        >
          <Radio.Group>
            <Radio value="全局">
              全局
            </Radio>
            <Radio value="项目组">
              项目组
            </Radio>
            <Radio value="项目">
              项目
            </Radio>
          </Radio.Group>
        </FormItem>

        <FormItem
          name="publicUsers"
          label="项目组"
          style={{display: showPublicUsers ? '' : 'none'}}
          rules={[{required: showPublicUsers}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Select options={options2}/>
        </FormItem>

        <FormItem
          name="Project"
          label="项目"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          style={{display: showProject ? '' : 'none'}}
          rules={[{required: showProject}]}
        >
          <Select>
            <Option value="全局">全局</Option>
            <Option value="项目组">项目组</Option>
            <Option value="项目">项目</Option>
          </Select>
        </FormItem>

        <FormItem
          label="项目隔离级别"
          name="IsolationProject"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          style={{display: showIsolationProject ? '' : 'none'}}
          rules={[{required: showIsolationProject}]}
        >
          <Select onChange={changeAll}>
            <Option value="全局">全局</Option>
            <Option value="模块">模块</Option>
            <Option value="包">包</Option>
          </Select>
        </FormItem>

        <FormItem
          label="模块"
          name="Module"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          style={{display: showModule ? '' : 'none'}}
          rules={[{required: showModule}]}
        >
          <Input></Input>
        </FormItem>

        <FormItem
          label="包"
          name="Package"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          style={{display: showPackage ? '' : 'none'}}
          rules={[{required: showPackage}]}
        >
          <Input></Input>
        </FormItem>

      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `创建${current ? '域' : '域'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? {padding: '72px 0'} : {padding: '28px 0 0'}}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;

import React, {FC, useEffect} from 'react';
import moment from 'moment';
import {Modal, Result, Button, Form, Input, Select} from 'antd';
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


const {Option} = Select;

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const {done, visible, current, onDone, onCancel, onSubmit} = props;


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

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };


  function changelog() {
    const text=`${form.getFieldValue('isolation') == 1
      ? '项目组'
      : (`${form.getFieldValue('isolation') == 2 ? '项目' : ''}`)
    }`;
   const flag= `${form.getFieldValue('isolation') == 0 ? 'none' : 'block'}`;
   console.log(text);
   console.log(flag);
  };


  const modalFooter = done
    ? {footer: null, onCancel: onDone}
    : {okText: '保存', onOk: handleSubmit, onCancel};

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
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          label="域名称"
          name="name"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Input placeholder="域名城"/>
        </Form.Item>

        <Form.Item
          label="编码"
          rules={[{required: true}]}
          name="code"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Input placeholder="编码"></Input>
        </Form.Item>

        <Form.Item
          label="长度"
          name="length"
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <Input placeholder="长度"></Input>
        </Form.Item>

        <Form.Item
          label="基础类型"
          name="type"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
        >
          <Select style={{width: '100%'}} options={options}>
          </Select>
        </Form.Item>

        <Form.Item
          label="是否必填"
          name="necessaryStr"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <Select style={{width: '100%'}}>
            <Option value="0">是</Option>
            <Option value="1">否</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="属性描述"
          name="description"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}>
          <TextArea autoSize={{minRows: 6, maxRows: 12}} placeholder="属性描述"></TextArea>
        </Form.Item>

        <Form.Item
          label="隔离级别"
          name="isolation"
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          rules={[{required: true}]}
          initialValue={0}
        >
          <Select style={{width: '100%'}} onChange={changelog}>
            <Option value={0}>全局</Option>
            <Option value={1}>项目组</Option>
            <Option value={2}>项目</Option>
          </Select>
        </Form.Item>

        <Form.Item
         label={`${form.getFieldValue('isolation') == 1
            ? "项目组"
            : (`${form.getFieldValue('isolation') == 2 ? '项目' : ''}`)}`}
          rules={[{required: true}]}
          labelCol={{span: 5}}  wrapperCol={{span: 15}}
          style={{display: `${form.getFieldValue('isolation') == 0 ? 'none' : 'block'}`}}
        >
          <Select
            showSearch={true}
            optionFilterProp="children"
          >
            <Option value={0}>全局</Option>
            <Option value={1}>项目组</Option>
            <Option value={2}>项目</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="项目隔离级别"
          name="isolationProject"
          rules={[{required: true}]}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          style={{display: `${form.getFieldValue('isolation') == 2 ? 'block' : 'none'}`}}
        >
          <Select >
            <Option value={0}>全局</Option>
            <Option value={1}>模块</Option>
            <Option value={2}>包</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={`${form.getFieldValue('isolation') == 2 && form.getFieldValue('isolationProject') == 1
            ? '模块'
            : `${form.getFieldValue('isolation') == 2 &&
            form.getFieldValue('isolationProject') == 2
              ? '包'
              : ''
            }`
          }`}
          labelCol={{span: 5}} wrapperCol={{span: 15}}
          rules={[{required: true}]}
          style={{
            display: `${form.getFieldValue('isolationProject') == 0 || form.getFieldValue('isolation') != 2
              ? 'none' : 'block'
            }`,
          }}
        >
          <Input></Input>)
        </Form.Item>

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

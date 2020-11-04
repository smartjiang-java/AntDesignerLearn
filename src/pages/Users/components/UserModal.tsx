import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

//props在子组件是不可改变的
const UserModal = (props: any) => {
  const [form] = Form.useForm();
  const { visible, record, closeHandle } = props;

  /*
解决控制台props和state的冲突问题
  useEffect(参数一:是一个函数,参数二:函数触发执行的条件,是一个数组,执行第一个函数);
*/
  useEffect(
    //给表单动态赋值
    () => {
      form.setFieldsValue(record);
    },
    [visible],
  );

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={closeHandle}
        onCancel={closeHandle}
        forceRender
      >
        {/*对象不能直接显示,必须要JSON.stringfy()转化为json字符串才行*/}
        {/*{JSON.stringify(props.record)}*/}
        <Form name="basic" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Create_Time"
            name="create_time"
            rules={[{ required: true, message: 'Please input your create_time!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input your create_time!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default UserModal;

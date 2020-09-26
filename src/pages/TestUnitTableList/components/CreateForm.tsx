import React from 'react';
import { Modal ,Button,Descriptions,Select ,Form, Input} from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


    const [form] = Form.useForm();

  function onChange(value:any) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val:any) {
    console.log('search:', val);
  }


  const onFinish = (values:any) => {
      console.log(values);
    };

    const onReset = () => {
      form.resetFields();
    };




  // @ts-ignore
  // @ts-ignore
  return (
    <Modal
      destroyOnClose
      title="新建测试单元"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >

  <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
    <Form.Item name="name" label="请输入测试单元名称" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="test" label="选择接口" rules={[{ required: false }]}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a interface"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input:any, option:any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="接口一">接口一</Option>
        <Option value="接口二">接口二</Option>
        <Option value="接口三">接口三</Option>
      </Select>


    </Form.Item>

    <br/>
    <Descriptions title="接口信息：" column={1}  size='default'>
      <Descriptions.Item label=" 接口名称">这里需导入接口名称</Descriptions.Item>
      <br/>

      <Descriptions.Item label=" 接口类型">这里需导入接口类型</Descriptions.Item>
      <br/>
      <Descriptions.Item label="接口地址">这里需导入接口地址</Descriptions.Item>
      <br/>
      <Descriptions.Item label="功能描述">这里需导入功能描述</Descriptions.Item>

    </Descriptions>




    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        保存
      </Button>
      <Button htmlType="button" onClick={onReset}>
        重新输入
      </Button>
    </Form.Item>
  </Form>


    </Modal>
  );
};

export default CreateForm;

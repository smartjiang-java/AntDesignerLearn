import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal   //对话框
      destroyOnClose    //关闭时销毁 Modal 里的子元素
      title="创建测试用例"
      visible={modalVisible}     //对话框是否可见
      onCancel={() => onCancel()} //点击遮罩层或右上角叉或取消按钮的回调
      footer={null} //底部内容，当不需要默认底部按钮时，可以设为
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

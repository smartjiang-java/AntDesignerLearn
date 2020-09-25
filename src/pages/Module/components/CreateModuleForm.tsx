import React from 'react';
import { Modal } from 'antd';

interface CreateModuleProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateModuleForm: React.FC<CreateModuleProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="创建模块"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >


      {props.children}
    </Modal>
  );
};

export default CreateModuleForm;

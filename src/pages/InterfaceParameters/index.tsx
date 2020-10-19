import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Form, Input, Popover, Row, Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';

type InternalNamePath = (string | number)[];

/*const { Option } = Select;*/
const { TabPane } = Tabs;
/*const { RangePicker } = DatePicker;*/

let fieldLabels = {
  name: '测试接口',
  type: 'HTTP',
  method: 'POST',
  url: '/rest/demoService/v1/hello',
  describe: '用于作为接口示例'
};


function callback(key: any) {
  console.log(key);
}

const tableData: never[] = [
  /*  {
      key: '',
      workId: '',
      name: ' ',
      department: '',
    },*/
  /*  {
      key: '2',
      workId: '00002',
      name: 'Jim Green',
      department: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      workId: '00003',
      name: 'Joe Black',
      department: 'Sidney No. 1 Lake Park',
    },*/
];

interface InterfaceParameters {
  dispatch: Dispatch;
  submitting: boolean;
}


interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const InterfaceParameters: FC<InterfaceParameters> = ({
  submitting,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>

      );
    });

    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    dispatch({
      type: 'InterfaceParameters/submitAdvancedForm',
      payload: values,
    });
    console.log({ members: tableData });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  // @ts-ignore
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer>
        <Card className={styles.card} bordered={false}>
          <Row gutter={24}>
            <Col span={6}>
              <label htmlFor="name">接口名称 </label><Input id="name" placeholder="接口名称" style={{ width: '55%', border: "none" }} value={fieldLabels.name} />
            </Col>
            <Col span={6}>
              <label htmlFor="type">接口类型: </label><Input id="type" placeholder="接口类型" style={{ width: '55%', border: "none" }} value={fieldLabels.type} />
            </Col>
            <Col span={6}>
              <label htmlFor="method"> 请求方式: </label><Input id="method" placeholder="请求方式" style={{ width: '55%', border: "none" }} value={fieldLabels.method} />
            </Col>
            <Col span={6}>
              <label htmlFor="address">接口地址: </label><Input id="address" placeholder="请求方式" style={{ width: '80%', border: "none" }} value={fieldLabels.url} />
            </Col>
            <br />
            <br />
            <Col span={24}>
              <label htmlFor="describe"> 接口描述: </label><Input id="describe" placeholder="接口描述" style={{ width: '90%', border: "none" }} value={fieldLabels.describe} />
            </Col>
          </Row>
          <br />
          <Card bordered={false}>
            <Tabs defaultActiveKey="1" onChange={callback} >
              <TabPane tab="QUERY" key="1">
                <Form.Item name="QUERY" >
                  <TableForm />
                </Form.Item>
              </TabPane>
              <TabPane tab="PATH" key="2">
                <Form.Item name="PATH">
                  <TableForm />
                </Form.Item>
              </TabPane>
              <TabPane tab="HEADER" key="3">
                <Form.Item name="HEADER">
                  <TableForm />
                </Form.Item>
              </TabPane>
              <TabPane tab="BODY" key="4">

              </TabPane>
              <TabPane tab="RESPONSE" key="5">

              </TabPane>
            </Tabs>
          </Card>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        {/* <Button type="primary"  onClick={() => form?.submit()} loading={submitting}>提交</Button>*/}
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['InterfaceParameters/submitAdvancedForm'],
}))(InterfaceParameters);

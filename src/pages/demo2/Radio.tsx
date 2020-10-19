import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {Radio} from "antd";

class Index extends Component {
  render() {
    return (
      <GridContent>
        {/*将两个单选框设为一组，并默认选定一个*/}
        <Radio.Group defaultValue={0}>
        <Radio value={0}>男</Radio>
        <Radio value={1}>女</Radio>
        </Radio.Group>

        {/*将两个单选框设为一组，为卡片样式，并默认选定一个*/}
        <Radio.Group defaultValue={0}>
          <Radio.Button value={0}>男</Radio.Button>
          <Radio.Button value={1}>女</Radio.Button>
        </Radio.Group>
      </GridContent>
    )
  }
}

export default Index;

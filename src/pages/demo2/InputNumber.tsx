import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {InputNumber} from "antd";

class Index extends Component {
  render() {
    return (
      <GridContent>
        {/*InputNumber输入框，0表示没有小数点，1表示有1位小数，输入会被自动清除,每次增2,并且设置最大值和最小值*/}
        <InputNumber precision={0} step={2} max={100} min={0}/>
        {/*InputNumber输入框，修改输入框宽度*/}
      <InputNumber style={{width:'100%'}}/>
      </GridContent>
    )
  }
}

export default Index;

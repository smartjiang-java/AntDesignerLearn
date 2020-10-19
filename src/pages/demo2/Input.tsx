import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {Input} from "antd";

class Index extends Component {
  render() {
    return (
      <GridContent >
        输入内容：
        <Input style={{width:'30%'}}/>
        <hr/>
        {/*输入搜索框*/}
        <Input.Search onSearch={value => console.log(value)} />
        {/*输入文本域,自动调整大小，最小1行，最大两行，可放大*/}
        <hr/>
        <Input.TextArea autoSize={{minRows:1,maxRows:2}}/>
        {/*输入文本域,自动调整大小，最小1行，最大两行，不可放大*/}
        <hr/>
        <Input.TextArea autoSize={{minRows:1,maxRows:2}} style={ {resize: 'none'}}/>
        {/*输入密码框,显示可以切换*/}
        <hr/>
        <Input.Password/>
        {/*输入密码框,显示不可以切换*/}
        <hr/>
        <Input.Password visibilityToggle={false}/>
      </GridContent>

    )
  }
}

export default Index;

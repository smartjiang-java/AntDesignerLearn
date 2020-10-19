import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import { Select} from "antd";

let options =[
  '采耳',
  '按摩',
  '针灸',
  '洗浴',
  '亮眼'
];

options.push('江湖');


class Index extends Component {

  //定义一个数组
  state ={
    selectedKeys:[],
  };

  onChange =(selectedKeys: any) =>{
   this.setState({
     selectedKeys,
   })
  }

  onSearch =(value: any)=>{
    console.log(value);
  }

  render() {

    const {selectedKeys} =this.state;
    // @ts-ignore
    const newOptions=options.filter(item=>!selectedKeys.includes(item));


    return (
      <GridContent>
        {/*1：Select选择框，这里使用支持多选的，搜索的功能*/}
        <Select
          style={{width:'15%'}}
          allowClear                //有一键清除功能
          showSearch={true}         //使用搜索功能,二者配合使用
          filterOption={(inputValue, option) => {
            // @ts-ignore
            return option.props.children.indexOf(inputValue)>-1;
          }}
          mode={"multiple"}         //表示支持多选
          defaultValue={[0,1]}>    //默认选中0和1,此时可修改，若为value，则不可修改
          <Select.Option value={0}>采耳</Select.Option>
          <Select.Option value={1}>按摩</Select.Option>
          <Select.Option value={2}>洗浴</Select.Option>
        </Select>

         <hr/>
        {/*2：Select选择框，根据输入的内容通过分隔符分来*/}
        <Select
          style={{width:'50%'}}
          mode={"tags"}     //模式选择，可以自己输入
          tokenSeparators={[',','，']}>   //分隔符
          <Select.Option value={0}>采耳</Select.Option>
          <Select.Option value={1}>按摩</Select.Option>
          <Select.Option value={2}>洗浴</Select.Option>
        </Select>

        <hr/>
        {/*3:Select选择框，这里使用支持多选的，选中一个减少一个*/}
        <Select
          style={{width:'50%'}} mode={"multiple"} onChange={this.onChange}>
          {
            newOptions.map(item=> <Select.Option value={item}>{item}</Select.Option>)
          }
        </Select>

        <hr/>
        {/*4:Select选择框，这里使用支持多选的，远程搜索*/}
        <Select style={{width:'50%'}} showSearch={true} onSearch={this.onSearch}>

        </Select>


      </GridContent>
    )
  }
}

export default Index;

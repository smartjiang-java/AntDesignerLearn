import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {Card, Table} from "antd";

//定义表格的列
const columns = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    key:'id',         //key的值不可重复
    width:60,
    //单元格的渲染方法,注意是顿号
    render:(text: string, record: any, index: number)=>`${index+1}`,
  },
  {
    title: '姓名',
    align: 'center',   //使居中
    dataIndex: 'name',
    render:(text:string)=><a href={'formadvancedform'}>{text}</a>,   //点击名称有超链接
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender',
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
  },
];

//定义表格的数据
const datasource = [
  {
    id: 1,
    name: '黄老邪',
    gender: '男',
    age: 52
  },
  {
    id: 2,
    name: '神雕大侠',
    gender: '男',
    age: 32
  },
  {
    id: 3,
    name: '郭靖',
    gender: '男',
    age: 48
  },
  {
    id: 4,
    name: '小龙女',
    gender: '女',
    age: 48
  },
];

class Index extends Component {


  render() {

    //自定义分页
    const pagination ={
      pageSize:4,    //每页有多少数据
      hideOnSinglePage:true,   //只有一页时不显示
    };

    //表格数据的选择框
    const rowSelection ={
      /*fixed:true, */     //是否把选择框固定到左侧
      /*type:"radio", */       //单选还是多选  radio/checkbox(默认)
      onChange: (selectedRowKeys:[],selectedRows:[])=>{  //两个参数均为数组，可不带
        console.log("onChange",selectedRowKeys);  //选中项的主键的值
        console.log("onChange",selectedRows);   //选中项的值
      },
      onSelect: (record: any, selected: boolean, selectedRows:any, nativeEvent: any)=>{
        console.log("onSelect",record);    //当前操作选中的数据
        console.log("onSelect",selected);   //是否选中true
        console.log("onSelect",selectedRows);//所有选中的数据
        console.log("onSelect",nativeEvent);//操纵的时间
      },
      onSelectAll: (selected: any, selectedRows: any, changeRows: any)=>{
        console.log("onSelectAll",selected);  //是否全部选中true/false
        console.log("onSelectAll",selectedRows);  //选中项数据
        console.log("onSelectAll",changeRows);    //变化项数据
      },
    };


    // @ts-ignore
    return (
      <GridContent>
        <Card bordered={false}>
          {/*1：表格*/}
          <Table
            bordered
            columns={columns}
            dataSource={datasource}
            /*pagination={false}  */  //不显示分页
            pagination={pagination}   //使用自定义分页
            rowSelection={rowSelection}  //列表选择框
            rowKey={"id"}   //指定唯一标识
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {}, // 点击行
                onDoubleClick: event => {}, // 双击行
                onContextMenu: event => {}, // 右键单机行
                onMouseEnter: event => {}, // 鼠标移入行
                onMouseLeave: event => {}, // 鼠标移出行
              };
            }}
          />


        </Card>
      </GridContent>
    )
  }
}

export default Index;

import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {Pagination} from "antd";

class Index extends Component {

  itemrender =(page: any, type: string)=>{

    if(type === "prev"){
      return '上一页';
    }
    if(type === "next"){
      return '下一页';
    }
    if(type === "page"){
      return page;
    }
}

  render() {

    return (
      <GridContent>
        {/*1:分页,常规使用*/}
        <Pagination
          defaultCurrent={1}    //当前页是第一页
          total={100}           //表示一共有多少条数据
          defaultPageSize={10}  //表示共有多少页
          size={"default"}        //默认尺寸
          showSizeChanger={true}  //可以选择多少数据每页
          showQuickJumper={true}  //可以快速跳转页码
         />

        <br/>
        {/*2:：分页：重写方法，将符号用汉字代替，自定义页码*/}
        <Pagination
          defaultCurrent={1}    //当前页是第一页
          total={100}           //表示一共有多少条数据
          defaultPageSize={10}  //表示共有多少页
          size={"small"}        //小尺寸
          itemRender={this.itemrender}  //自定义函数
          showSizeChanger={true}
        />

        <br/>
        {/*3:：分页：可以自定义多少数据每页*/}
        <Pagination
          defaultCurrent={1}    //当前页是第一页
          total={100}           //表示一共有多少条数据
          defaultPageSize={10}  //表示共有多少页
          size={"small"}        //小尺寸
          itemRender={this.itemrender}  //自定义函数
          showSizeChanger pageSizeOptions={['15','25','35','45','100']}
        />

      </GridContent>
    )
  }
}

export default Index;

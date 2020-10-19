import React, {Component} from "react";
import {GridContent} from "@ant-design/pro-layout";
import {Checkbox,} from "antd";


const plainOptions = [0, 1, 2];
const defaultCheckedList: never[] = [];


class Index extends Component {

  state = {
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: false,
  };

 /* onChange = (checkedList) => {*/
  onChange = (checkedList: string | any[]) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

/*  onCheckAllChange = (e) => {*/
    onCheckAllChange = (e: { target: { checked: any; }; }) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {

    return (
      <GridContent>
        {/*CheckBox可以多选，默认是一个数组*/}
        <Checkbox.Group defaultValue={[0]}>
          <Checkbox value={0}> 采耳</Checkbox>
          <Checkbox value={1}> 按摩</Checkbox>
          <Checkbox value={2}> 洗浴</Checkbox>
        </Checkbox.Group>

        <hr/>
        {/*CheckBox可以多选，默认是一个数组,全选的效果,加上h3有自动换行的作用,indeterminate表示半选的状态*/}
        <h3>
          <Checkbox indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}>
            全选
          </Checkbox>
        </h3>
        <Checkbox.Group value={this.state.checkedList} onChange={this.onChange}>
          <Checkbox value={0}> 采耳</Checkbox>
          <Checkbox value={1}> 按摩</Checkbox>
          <Checkbox value={2}> 洗浴</Checkbox>
        </Checkbox.Group>

      </GridContent>
    )
  }
}

export default Index;

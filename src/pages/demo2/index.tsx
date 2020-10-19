import React, {Component} from "react";
import {Card, Tabs} from "antd";
import {GridContent} from "@ant-design/pro-layout";
// @ts-ignore
import Input from './Input';
import InputNumber from './InputNumber';
import Iadio from './Radio';
import CheckBox from './CheckBox';
import Select from './Select';
import Pagination from './Pagination ';
import Table from './Table';

class Index extends Component {
  render() {
    return (
      <GridContent>
        <Card bordered={false}>
          <Tabs>
            <Tabs.TabPane tab={"input"} key={1}>
             <Input/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"inputNumber"} key={2}>
             <InputNumber/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"radio"} key={3}>
              <Iadio/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"checkBox"} key={4}>
              <CheckBox/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"select"} key={5}>
              <Select/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"pagination"} key={6}>
              <Pagination/>
            </Tabs.TabPane>

            <Tabs.TabPane tab={"table"} key={7}>
              <Table/>
            </Tabs.TabPane>

          </Tabs>
        </Card>
      </GridContent>

    )
  }
}

export default Index;

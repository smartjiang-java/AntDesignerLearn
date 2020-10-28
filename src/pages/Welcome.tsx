import React, {Component} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
//import Simple from './components/Four/AAA/Simple';
//import Complex from "@/pages/components/Four/BBB/Complex";
import Tough from '@/pages/components/Four/CCC/Tough';


export default class Index extends Component {
  render() {
    return (
      <PageContainer>

        {/*  <Simple/>*/}
        {/*<Complex />*/}
        <Tough/>

      </PageContainer>
    );
  }
}

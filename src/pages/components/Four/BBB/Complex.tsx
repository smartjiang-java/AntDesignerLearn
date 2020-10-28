import React, { Component } from 'react';
import {Button, Card} from 'antd';
import {connect} from 'dva';

const namespace="puzzlecards";

const mapStateToProps=(state: { [x: string]: any; })=>{
  const cardList =state[namespace].data;
  return {
    //dva 期待 mapStateToProps 函数返回一个 对象，这个对象会被 dva 并入到 props 中
    //我们取到数据后，把它改名为 cardList 并返回（ 注意返回的不是 cardList 本身，而是一个包含了 cardList 的对象！
    //cardList 就可以在子组件中通过 props 被访问到了,
    cardList,
  };
}

const mapDispatchToProps=(dispatch: any)=>{
  return {
    onClickAdd :(newCard: any)=>{
      const action={
        type:`${namespace}/addNewCard`,
        payload:newCard,
      };
      dispatch(action);
    },
  };
};


/**
 * connect 让组件获取到两样东西：1. model 中的数据；2. 驱动 model 改变的方法。
 * connect 既然是函数，就可以接受入参
 * 第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫做 mapStateToProps
 * 顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。
 * mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合。
 * 通过实现这个函数，我们就能实现把 dva model 的 state 注入给组件。
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class Complex extends Component {
  render() {
    let cardList=Array.from(this.props["cardList"]);
    return (
        <div>
          {
            cardList.map((card: any) => {
              return (
                <Card key={card.id}>
                  <div>Q: {card.setup}</div>
                  <div>
                    <strong>A: {card.punchline}</strong>
                  </div>
                </Card>
              );
            })
          }
          <div>
            <Button onClick={() => this.props["onClickAdd"]({
              setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              punchline: 'here we use dva',
            })}> 添加卡片 </Button>
          </div>
        </div>
    );
  }
}

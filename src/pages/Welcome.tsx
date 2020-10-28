import React, { Component } from 'react';
import {Button, Card} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {connect} from 'dva';


/*export default class PuzzleCardsPage extends Component {
  /!**
   *构造函数
   * @param props
   *!/
  constructor(props: Readonly<{}>) {
    super(props);
    this["counter"]=100;
    this.state = {
      cardList: [
        {
          id: 1,
          setup: 'Did you hear about the two silk worms in a race?',
          punchline: 'It ended in a tie',
        },
        {
          id: 2,
          setup: 'What happens to a frog\'s car when it breaks down?',
          punchline: 'It gets toad away',
        },
      ],
    }
  }

  /!**
   * 按钮点击事件：在回调函数中向 cardList 中添加一个新卡片数据
   *!/
  addNewCard =()=>{
    this.setState(prevState=>{
      const prevCardList= prevState["cardList"];
      this["counter"] +=1;
      const card={
        id:this["counter"],
        setup :'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        punchline:'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      };
      return {
        cardList :prevCardList.concat(card),
      }
    })


  }

  render() {

    return (
      <PageContainer>
      <div>
        {
          this.state["cardList"].map((card:any) => {
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
      </div>
        <Button onClick={this.addNewCard}>添加卡片</Button>
      </PageContainer>
    );
  }
}*/


//修改版本
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
export default class PuzzleCardsPage extends Component {
  render() {
    let cardList=Array.from(this.props["cardList"]);

    return (
      <PageContainer>
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
      </PageContainer>
    );
  }
}

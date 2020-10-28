import React, { Component } from 'react';
import {Button, Card} from 'antd';

export default class PuzzleCardsPage extends Component {
  /**
   *构造函数
   * @param props
   */
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

  /**
   * 按钮点击事件：在回调函数中向 cardList 中添加一个新卡片数据
   */
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
      <div>
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
      </div>
    );
  }
}



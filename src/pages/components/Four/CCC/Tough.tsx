import React, {Component} from 'react';
import {Card /* ,Button */} from 'antd';
import {connect} from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state: { [x: string]: { data: any; }; }) => {
  const cardList = state[namespace].data;
  return {
    cardList,
  };
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => void) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      });
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  componentDidMount() {
    this.props["onDidMount"]();
  }

  render() {
    let cardList = Array.from(this.props["cardList"]);
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
      </div>
    );
  }
}

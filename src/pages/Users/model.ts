import {Effect, ImmerReducer, Reducer, Subscription} from 'umi';

const UserModel = {
  namespace: 'users',
  //仓库状态数据
  state: {
    name: '',
  },

  effects: {
    * query({payload}, {call, put}) {
    },
  },

  reducers: {
    save(state, action) {
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
/*      return {
        ...state,
        ...action.payload,
      };*/
      //将数据返回,其实就是返回给namespace
      return data;
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  //进入到/Users路径开始触发这个,
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/Users') {
          //去调用同步或者异步
          dispatch({
            type: 'save',
          })
        }
      });
    }
  }
};
export default UserModel;

import {Reducer, Effect, Subscription} from "umi";
import {getRemoteList} from './service';

/**
 *监听--->Effort---->service--->传给Reducer,Reducer再传数据到index页面   异步
 */
interface UserModelTypes {
  namespace: "users";
  state: {},
  reducers: {
    getList: Reducer;
  },
  effects: {
    getRemote: Effect;
  },
  subscriptions: {
    setup: Subscription;
  },
}


//model就是一个对象,有一个类型定义
const UserModel: UserModelTypes = {
  namespace: 'users',
  //model是一个仓库,state里面写的是仓库的初始值
  state: {},

  //下面的三个都是函数,f里面的函数省略掉function
  /**
   * action是一个对象,type:传递的函数的名字,payload:其他的参数
   * action ={type,payload}
   */
  reducers: {
    //action中的type经常用不上,常省略
    /*    getList(state, action) {
          return action.payload;
        }*/
    getList(state, {payload}) {
      return payload;
    }
  },

  //effects里面的函数要加*号,用 yield put找reducers,里面没有返回值
  //effects={put,call}
  effects: {
    * getRemote(action, {put, call}) {
      const data = yield call(getRemoteList);
      yield put({
        type: 'getList',
        payload: data,
/*        payload :{
          data
        }*/
      });
    },
  },

  //监听
  subscriptions: {
    setup({dispatch, history}, done) {
      return history.listen((location, action) => {
        if (location.pathname === '/Users') {
          dispatch({
              type: 'getRemote',
              //payload没有,进行省略
            }
          );
        }
      });
    },

  },

};

export default UserModel;


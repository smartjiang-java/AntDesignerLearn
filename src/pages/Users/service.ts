//service里面一般都是异步函数,两种方法
//async  function  function_name(){}

/* export const  getRemoteList=async ()=>{
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
  return data;
}*/


//接收真实的后端数据
import {request} from 'umi';

export const getRemoteList = async (params: any) => {

  //注意:这里的两个return都要写
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
    /* params: { id: 1 },*/      //参数,这里没有参数
  })
    .then(function (response) {
      //console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  //注意:返回的对象格式类似于下面这样
  /*
    {
      "data": [
      {
        "id": 41,
        "name": "zhang2",
        "email": "zhang2@yahoo.com",
        "create_time": "2020-04-13T14:17:47Z",
        "update_time": "2020-04-13T14:17:47Z",
        "status": 1
      },
      {
        "id": 38,
        "name": "zhang1",
        "email": "zhang1@test.com",
        "create_time": "2020-04-13T13:58:08Z",
        "update_time": "2020-04-13T13:58:08Z",
        "status": 1
      }
    ],
      "meta": {
      "total": 2,
        "per_page": 10,
        "page": 1
    }
    }
    */

}

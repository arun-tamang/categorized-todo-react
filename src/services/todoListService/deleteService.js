import myAxios from '../../myAxios.js';
// import { getTodoIndex } from './todoService';

export function deleteTodo (userId, id) {
  console.log('USERID', userId);
  let myUrl = '/users/' + userId + '/todo/' + id;
  return myAxios.delete(myUrl)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

import myAxios from '../../myAxios';

export function setTodoCompleted(isCompleted, id, userId) {
  let myUrl = '/users/' + userId + '/todo/' + id;

  return myAxios.put(myUrl, { isCompleted }).then(response => {
    return response;
  });
}

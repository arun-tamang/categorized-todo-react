import myAxios from '../../myAxios';

export function addTodo(userId, todoToAdd) {
  let myUrl = '/users/' + userId + '/todo';
  // let tagIds = tags.replace(' ', '').split(',');

  return myAxios
    .post(myUrl, {
      categoryId: todoToAdd.categoryId,
      name: todoToAdd.title,
      tagIds: todoToAdd.tagIds,
      expiresAt: todoToAdd.expiresAt,
      completed: todoToAdd.completed
    })
    .then((response) => {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

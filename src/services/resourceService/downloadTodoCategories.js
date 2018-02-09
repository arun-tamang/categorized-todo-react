import myAxios from '../../myAxios.js';

export function downloadTodoCategories(userId) {
  let myUrl = '/users/' + userId + '/todoCategories';

  return myAxios
    .get(myUrl)
    .then(function(response) {
      return response.data.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

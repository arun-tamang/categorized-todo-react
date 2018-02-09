import myAxios from '../../myAxios';

export function addCategory(userId, name) {
  let myUrl = '/users/' + userId + '/todoCategories';
  // let tagIds = tags.replace(' ', '').split(',');

  return myAxios
    .put(myUrl, { name })
    .then((response) => {
      return response.data.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

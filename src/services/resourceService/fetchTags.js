import myAxios from '../../myAxios.js';

export function fetchTags(userId) {
  let myUrl = '/tags/' + userId;

  return myAxios
    .get(myUrl)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

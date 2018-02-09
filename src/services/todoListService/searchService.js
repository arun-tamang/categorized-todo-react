import myAxios from '../../myAxios';

export function searchTodo(searchInput, userId) {
  let myUrl = '/users/' + userId + '/todo/search';

  return myAxios
    .get(myUrl, {
      params: {
        keywords: searchInput.keywords,
        tags: searchInput.tags
      }
    })
    .then((response) => {
      console.log('from search', response.data);
      return response;
    })
    .catch((err) => console.log(err));
}

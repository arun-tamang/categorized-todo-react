import myAxios from '../../myAxios';

export function refreshAcsToken() {
  let refreshToken = JSON.parse(localStorage.currentUser).refreshToken;
  // console.log('refreshToken', refreshToken);
  myAxios.defaults.headers = {
    Authorization: refreshToken,
  };
  let myUrl = '/admin/refresh';
  return myAxios.post(myUrl)
    .then((response) => {
      return response;
    });
}

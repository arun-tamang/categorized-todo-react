import myAxios from '../../myAxios.js';

export async function logout() {
  let { refreshToken } = JSON.parse(localStorage.currentUser);
  myAxios.defaults.headers = {
    Authorization: refreshToken,
  };

  return myAxios.delete('/admin/logout')
    .then((response) => {
      // console.log('logout response', response.data);
      return { response };
    })
    .catch(function (error) {
      console.log(error);
    });
}
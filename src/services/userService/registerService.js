import myAxios from '../../myAxios.js';

export async function register (newUserInfo) {
  return myAxios.post('/admin/register', newUserInfo)
  .then((response) => {
    // console.log(response);
    return {data: response.data, success: true};
  })
  .catch(function (error) {
    console.log(error);
  });
}

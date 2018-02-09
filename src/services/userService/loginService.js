import myAxios from '../../myAxios.js';

export const login = (userInfo) =>
  myAxios
    .post('/admin/login', userInfo)
    .then((response) => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });

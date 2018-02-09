import myAxios from '../myAxios.js';

export function setTokenInHeader(token) {
  myAxios.defaults.headers = {
    Authorization: token
  };

  return;
}

import myAxios from '../myAxios.js';
import { refreshAcsToken } from './resourceService/refreshAcsToken';

export function setTokenInHeader(token) {
  myAxios.defaults.headers = {
    Authorization: token
  };

  return;
}

export function refreshAndRepeat(lastConfig, handleLogOut) {
  return refreshAcsToken()
    .then((response) => {
      setTokenInHeader(response.data.accessToken);
      lastConfig.headers.Authorization = response.data.accessToken;

      return myAxios(lastConfig);
    })
    .catch((error) => {
      if (error.response.status === 403) {
        handleLogOut();
      }
    });
}

export function addInterceptor(logoutHandler) {
  myAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // access token has to be refreshed.
        let lastConfig = error.response.config;

        return refreshAndRepeat(lastConfig);
      }

      return Promise.reject(error);
    }
  );
}

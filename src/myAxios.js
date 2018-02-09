import * as axios from 'axios';

let myAxios = axios.create({
  baseURL: 'http://localhost:8848/api'
});

export default myAxios;

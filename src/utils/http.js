import axios from 'axios';
import { encode } from 'js-base64';


const instance = axios.create({
  baseURL: H5_ONLINE_HOST,
});

instance.interceptors.request.use(
  function(config) {
    let userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      console.log(JSON.parse(userInfo).token);
      config.headers["AUTHORIZATION"] = 'basic ' + encode(JSON.parse(userInfo).token);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;

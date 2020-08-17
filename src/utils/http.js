import axios from 'axios';
import { encode } from 'js-base64';

export default axios.create({
  baseURL: H5_ONLINE_HOST,
  headers: {'AUTHORIZATION': "basic " + encode(JSON.parse(sessionStorage.getItem('userInfo')).token)}
});

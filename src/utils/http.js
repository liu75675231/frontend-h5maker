import axios from 'axios';
export default axios.create({
  baseURL: H5_ONLINE_HOST,
  transformRequest: [function (data, header) {
    console.log(data);
    console.log(header);
    return data;
  }],
});

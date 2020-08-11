import axios from '../utils/http';

export function login (username, password) {
  axios.request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

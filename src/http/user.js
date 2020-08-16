import axios from '../utils/http';

export function login (username, password) {
  return axios.request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function register (username, password) {
  return axios.request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

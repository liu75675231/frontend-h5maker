import axios from '../utils/http';

export function httpGetH5Data (id) {
  return axios.request({
    url: '/h5/get-h5-data',
    method: 'get',
    params: {
      id,
    },
  })
}

export function httpRemoveH5 (id) {
  return axios.request({
    url: '/h5/remove',
    method: 'post',
    data: {
      id,
    }
  })
}

export function httpCloneH5 (id) {
  return axios.request({
    url: '/h5/clone',
    method: 'post',
    data: {
      id,
    },
  });
}

export function httpGetH5Templates () {
  return axios.request({
    url: '/h5/get-template',
    method: 'get',
  });
}

export function httpGetMyH5 () {
  return axios.request({
    url: '/h5/get-my-h5',
    method: 'get',
  });
}

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


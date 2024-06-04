import request from '../utils/request';

export const load = async data => {
  return request({
    method: 'get',
    url: '/musics',
    data,
  });
};

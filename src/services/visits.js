import request from '../utils/request';

export const add = async data => {
  return request({
    method: 'post',
    url: '/visits',
    data,
  });
};

import request from '../utils/request';
const url = new URL(import.meta.url);
const filename = url.pathname.split('/').pop();
const path = filename.split('.')[0];

export const add = params =>
  request({
    method: 'post',
    url: `${path}`,
    data: params,
  });

export const load = () =>
  request({
    method: 'get',
    url: `${path}`,
  });

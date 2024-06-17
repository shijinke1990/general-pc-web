import request from '../utils/request';

export const load = async data => {
  return request({
    method: 'get',
    url: '/articles',
    data,
  });
};

export const remove = async data => {
  return request({
    method: 'delete',
    url: `/articles/${data._id}`,
  });
};

export const update = async data => {
  return request({
    method: 'put',
    url: `/articles/${data._id}`,
    data,
  });
};

export const updateMany = async data => {
  return request({
    method: 'put',
    url: '/articles',
    data,
  });
};

export const add = async data => {
  return request({
    method: 'post',
    url: '/articles',
    data,
  });
};

export const getDetail = async data => {
  return request({
    method: 'get',
    url: `/articles/${data._id}`,
  });
};

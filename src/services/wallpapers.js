import request from '../utils/request';

export const load = async data => {
  return request({
    method: 'get',
    url: '/wallpapers',
    data,
  });
};

export const remove = async data => {
  return request({
    method: 'delete',
    url: `/wallpapers/${data._id}`,
  });
};

export const update = async data => {
  return request({
    method: 'put',
    url: `/wallpapers/${data._id}`,
    data,
  });
};

export const updateMany = async data => {
  return request({
    method: 'put',
    url: '/wallpapers',
    data,
  });
};

export const add = async data => {
  return request({
    method: 'post',
    url: '/wallpapers',
    data,
  });
};

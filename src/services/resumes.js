import request from '../utils/request';

export const find = async data => {
  return request({
    method: 'get',
    url: '/resumes',
    data,
  });
};

export const loadDetail = async data => {
  return request({
    method: 'get',
    url: `/resumes/${data._id}/detail`,
  });
};

export const remove = async data => {
  return request({
    method: 'delete',
    url: `/resumes/${data._id}`,
  });
};

export const update = async data => {
  return request({
    method: 'put',
    url: `/resumes/${data._id}`,
    data,
  });
};

export const updateMany = async data => {
  return request({
    method: 'put',
    url: '/resumes',
    data,
  });
};

export const add = async data => {
  return request({
    method: 'post',
    url: '/resumes',
    data,
  });
};

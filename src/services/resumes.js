import request from '../utils/request';

export const load = async data => {
  return request({
    method: 'get',
    url: '/resumes',
    data,
  });
};

export const loadOne = async data => {
  return request({
    method: 'get',
    url: `/resumes/${data._id}`,
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

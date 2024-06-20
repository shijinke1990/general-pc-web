import request from '../utils/request';

export const load = async data => {
  return request({
    method: 'get',
    url: '/users',
    data,
  });
};

export const generatePhoneCode = async data => {
  return request({
    method: 'get',
    url: `/users/${data.phone}/phoneCode`,
    data,
  });
};

export const generateEmailCode = async data => {
  console.log('data', data);
  return request({
    method: 'get',
    url: `/users/${data.email}/emailCode`,
    data,
  });
};

export const loginViaPhone = async data => {
  return request({
    method: 'post',
    url: '/users/@/loginViaPhone',
    data,
  });
};

export const loginViaEmail = async data => {
  return request({
    method: 'post',
    url: '/users/@/loginViaEmail',
    data,
  });
};

export const getUserInfo = async data => {
  return request({
    method: 'get',
    url: `/users/@/userInfo`,
  });
};

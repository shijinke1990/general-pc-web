import request from '../utils/request';

// router.patch('/:id', accountAuth, checkUserExist, update);
// router.get('/:phone/code', generatePhoneCode);
// router.get('/:email/code', generateEmailCode);
// router.post('/@/loginViaPhone', checkPhoneValidity, checkPhoneCode, login);
// router.post('/@/loginViaEmail', checkEmailValidity, checkEmailCode, login);
// router.get('/:userId', userAuth, getUserInfo);

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

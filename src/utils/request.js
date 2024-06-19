/**
 * axios封装
 */
import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://api.lianlianbushe.com/api',
  timeout: 8000,
});

service.interceptors.request.use(config => {
  const { headers } = config;
  if (!headers.Authorization) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

service.interceptors.response.use(
  res => {
    const { data } = res;
    return data;
  },
  res => {
    message.destroy();
    message.error(res.response.data.message || '请求错误');
    console.log('res', res);
    if (res.response.status === 401 || res.response.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login?redirect=' + window.location.href;
    }
    // if (res.response.status === 500) {
    //   window.location.href = '/500';
    // }

    return Promise.reject(res);
  }
);

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
async function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  try {
    return await service(options);
  } catch (err) {
    console.log('err', err);
  }
}

export default request;

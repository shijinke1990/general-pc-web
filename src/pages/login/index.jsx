import React, { useState } from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import { Button, Form, Input } from 'antd';
import { generatePhoneCode, generateEmailCode, loginViaPhone, loginViaEmail } from '@services/users';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [form] = Form.useForm();
  const navigateTo = useNavigate();
  const switchForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleGenerateCode = async () => {
    const values = form.getFieldsValue();
    if (values.email) {
      await generateEmailCode({ email: values.email });
    }
    if (values.phone) {
      await generatePhoneCode({ phone: values.phone });
    }

    setSeconds(60);
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 0) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleLogin = async e => {
    const values = form.getFieldsValue();
    if (values.phone && values.verificationCode) {
      const res = await loginViaPhone(values);
      console.log('res', res);
      const { token } = res;
      localStorage.setItem('token', token);
      navigateTo('/');
    }
    if (values.email && values.verificationCode) {
      const res = await loginViaEmail(values);
      console.log('res', res);
      const { token } = res;
      localStorage.setItem('token', token);
      navigateTo('/');
    }
  };

  return (
    <div className={styles.box}>
      <div
        className={classnames([
          styles.container,
          styles['a-container'],
          {
            [styles['is-txl']]: !isSignIn,
            [styles['ml']]: isSignIn,
          },
        ])}
        id='a-container'
      >
        <Form form={form} className={styles.form}>
          <h2 className={classnames(styles.form_title, styles.title)}>{isSignIn ? '手机号登录' : '邮箱登录'}</h2>
          {isSignIn ? (
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: '手机号不能为空',
                },
              ]}
            >
              <Input className={styles.form_input} placeholder='手机号' />
            </Form.Item>
          ) : (
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: '邮箱不能为空',
                },
              ]}
            >
              <Input className={styles.form_input} placeholder='邮箱' />
            </Form.Item>
          )}

          <Form.Item
            name='verificationCode'
            rules={[
              {
                required: true,
                message: '验证码不能为空',
              },
            ]}
          >
            <div className={styles.wrapper}>
              <Input className={styles.form_code} placeholder='验证码' />
              {seconds > 0 ? (
                <Button className={styles.form_small_button}>{seconds}秒后重新获取</Button>
              ) : (
                <Button className={styles.form_small_button} onClick={handleGenerateCode}>
                  获取验证码
                </Button>
              )}
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              onClick={handleLogin}
              htmlType='submit'
              className={classnames(styles.form_button, styles.button, styles.submit)}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        className={classnames([
          styles.switch,
          {
            [styles['is-txr']]: !isSignIn,
            [styles['is-gx']]: !isSignIn,
          },
        ])}
        id='switch-cnt'
      >
        <div
          className={classnames([
            styles.switch_circle,
            {
              [styles['txr']]: !isSignIn,
              [styles['is-gx']]: !isSignIn,
            },
          ])}
        ></div>
        <div
          className={classnames([
            styles.switch_circle,
            styles.switch_circle_t,
            {
              [styles['txr_t']]: !isSignIn,
              [styles['is-gx']]: !isSignIn,
            },
          ])}
        ></div>
        {isSignIn ? (
          <div className={classnames(styles.switch_container, styles['right-panel-active'])} id='switch-c1'>
            <div className={classnames(styles.switch_title, styles.title)} style={{ letterSpacing: 0 }}>
              您好，招聘官
            </div>

            <p className={classnames(styles.switch_description, styles.description)}>
              出于隐私保护，查看简历需要您登录一下，默认为手机号验证码登录。使用邮箱登录点击下方切换
            </p>
            <Button
              className={classnames(styles.switch_button, styles.button, styles['switch-btn'])}
              onClick={switchForm}
            >
              邮箱登录
            </Button>
          </div>
        ) : (
          <div className={classnames(styles.switch_container, styles['right-panel-active'])} id='switch-c2'>
            <div className={classnames(styles.switch_title, styles.title)} style={{ letterSpacing: 0 }}>
              您好，招聘官
            </div>
            <p className={classnames(styles.switch_description, styles.description)}>
              出于隐私保护，查看简历需要您登录一下，当前为为邮箱验证码登录。使用手机登录点击下方切换
            </p>
            <Button
              className={classnames(styles.switch_button, styles.button, styles['switch-btn'])}
              onClick={switchForm}
            >
              手机号登录
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import { Button, Form, Input } from 'antd';
import { generatePhoneCode, loginViaPhone, loginViaEmail } from '@services/users';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [form] = Form.useForm();
  const switchForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleGeneratePhoneCode = async () => {
    const phone = form.getFieldValue('phone');
    const res = await generatePhoneCode({ phone });
    if (res) {
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
    }
  };

  const handleLogin = async () => {
    const values = form.getFieldsValue();
    console.log('values', values);
    if (values.phone && values.code) {
      const res = await loginViaPhone(values);
      console.log('res', res);
    }
    if (values.email && values.code) {
      const res = await loginViaEmail(values);
      console.log('res', res);
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
        <Form
          form={form}
          className={styles.form}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          <h2 className={classnames(styles.form_title, styles.title)}>{isSignIn ? '手机号登录' : '邮箱登录'}</h2>
          {isSignIn ? (
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
          ) : (
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
          )}

          <Form.Item
            name='code'
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
                <Button className={styles.form_small_button} onClick={handleGeneratePhoneCode}>
                  获取验证码
                </Button>
              )}
            </div>
          </Form.Item>

          <Button
            onClick={handleLogin}
            type='primary'
            className={classnames(styles.form_button, styles.button, styles.submit)}
          >
            登录
          </Button>
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
              你好，新朋友
            </div>

            <p className={classnames(styles.switch_description, styles.description)}>
              或者，你习惯使用邮箱登录？点击下方切换！
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
              你好，新朋友
            </div>
            <p className={classnames(styles.switch_description, styles.description)}>
              或者，你习惯使用手机号登录？点击下方切换！
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

import React, { useState } from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import { Button, Form, Input } from 'antd';
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const switchForm = () => {
    setIsSignIn(!isSignIn);
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
          className={styles.form}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          <h2 className={classnames(styles.form_title, styles.title)}>{isSignIn ? '登录' : '注册'}</h2>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
            ]}
          >
            <Input className={styles.form_input} placeholder='用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
            ]}
          >
            <Input.Password className={styles.form_input} placeholder='密码' />
          </Form.Item>
          {!isSignIn && (
            <Form.Item
              name='repassword'
              rules={[
                {
                  required: true,
                  message: '重复密码不能为空',
                },
              ]}
            >
              <Input.Password className={styles.form_input} placeholder='重复密码' />
            </Form.Item>
          )}
          <Button type='primary' className={classnames(styles.form_button, styles.button, styles.submit)}>
            {isSignIn ? '登录' : '注册'}
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
              欢迎回来！
            </div>

            <p className={classnames(styles.switch_description, styles.description)}>
              或者，还没有账号？点击下方前往注册吧！
            </p>
            <Button
              className={classnames(styles.switch_button, styles.button, styles['switch-btn'])}
              onClick={switchForm}
            >
              注册
            </Button>
          </div>
        ) : (
          <div className={classnames(styles.switch_container, styles['right-panel-active'])} id='switch-c2'>
            <div className={classnames(styles.switch_title, styles.title)} style={{ letterSpacing: 0 }}>
              你好，新朋友
            </div>
            <p className={classnames(styles.switch_description, styles.description)}>
              或者，已经有账号了嘛，点击下方去登录账号吧！
            </p>
            <Button
              className={classnames(styles.switch_button, styles.button, styles['switch-btn'])}
              onClick={switchForm}
            >
              登录
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

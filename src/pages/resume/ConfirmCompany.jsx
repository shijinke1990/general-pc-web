import React, { useEffect } from 'react';

import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './ConfirmCompany.module.scss';
import { find } from '@/services/resumes';
import { useRouteLoaderData } from 'react-router-dom';
import { useState } from 'react';

const ConfirmCompany = () => {
  const resume = useRouteLoaderData('resume');
  console.log('resume', resume);
  if (resume && resume._id) {
    window.location.href = `/resumes/${resume._id}`;
  }
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  useEffect(() => {
    document.title = '查看简历 - 恋恋不舍';
  }, []);

  const getPanelValue = async value => {
    if (value.length < 2) {
      return;
    }
    const { list } = await find({
      q: value,
    });
    console.log('list', list);

    setList(list.filter(v => v.available));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>查看简历</div>
      </div>
      <Form
        form={form}
        name='basic'
        autoComplete='off'
        style={{
          width: '380px',
        }}
      >
        <Form.Item name='company'>
          <Input
            placeholder='在此输入贵公司在招聘软件上的名称'
            className={styles.input}
            autoFocus
            onChange={e => getPanelValue(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #3c4656',
              color: '#fff',
              backgroundColor: '#3c4656',
              borderRadius: '0',
              padding: '6px 12px',
              boxSizing: 'border-box',
            }}
          />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {list.map(item => {
            return (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#fff',
                  width: '380px',
                  padding: '10px',
                  boxSizing: 'border-box',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <div>{item.title}</div>
                <Button size='small' href={`/resumes/${item._id}`} type='link' style={{ marginLeft: '10px' }}>
                  查看
                </Button>
              </div>
            );
          })}
        </div>
      </Form>
    </div>
  );
};
export default ConfirmCompany;

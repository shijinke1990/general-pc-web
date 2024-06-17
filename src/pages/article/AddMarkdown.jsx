import React from 'react';
import { useState } from 'react';
import { Drawer, Form, Input, Button, Upload, Space } from 'antd';
import { add } from '@services/articles';

function read(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export default function AddMarkdown({ emitter }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState('#1');
  const [fileList, setFileList] = useState([]);

  emitter.on('addMarkdown', () => {
    setFileList([]);
    setOpen(true);
    form?.resetFields();
  });

  const onRemove = file => {
    setFileList(fileList.filter(item => item.uid !== file.uid));
  };

  const customRequest = async ({ file }) => {
    console.log('file', file);
    const res = await read(file);
    console.log('res', res);
    setContent(res);
    setFileList([
      ...fileList,
      { uid: Date.now(), name: file.name, status: 'done', url: URL.createObjectURL(file), origin: file },
    ]);
    form.setFieldsValue({ title: file.name.split('.')[0] });
  };

  const handleSubmit = async () => {
    const res = await form.validateFields();
    console.log('res', res);
    if (!res) return;
    const values = form.getFieldsValue();
    const article = {
      title: values.title,
      content,
      type: 'markdown',
    };
    await add(article);
    setOpen(false);
    emitter.emit('reload');
  };

  return (
    <Drawer
      forceRender
      title='上传markdown文件'
      width={500}
      open={open}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}> 取消</Button>
          <Button type='primary' onClick={handleSubmit}>
            保存
          </Button>
        </Space>
      }
      onClose={() => setOpen(false)}
      destroyOnClose={true}
    >
      <Form
        form={form}
        initialValues={{
          imgUrl: '',
          link: '#',
          order: 1,
          visible: true,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item extra='请上传markdown文件' required rules={[{ required: true, message: '请上传markdown文件' }]}>
          <Upload fileList={fileList} customRequest={customRequest} onRemove={onRemove}>
            {fileList.length === 0 && <Button>上传</Button>}
          </Upload>
        </Form.Item>
        <Form.Item required name='title' label='标题'>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

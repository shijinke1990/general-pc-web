import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import oss from '../../../utils/aliOss';
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import styles from './Add.module.scss';

import { Button, Modal, Form, Input, Spin } from 'antd';
import { add } from '@services/articles';
import { Result } from 'antd';

function AddArticle() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [html, setHtml] = useState('');
  const [result, setResult] = useState(null);
  const channel = new BroadcastChannel('article');

  const handleContinue = () => {
    setHtml('');
    setResult(null);
    form.resetFields();
  };

  const handleOk = async () => {
    const res = await form.validateFields();
    console.log('res', res);
    if (!res) return;
    const values = form.getFieldsValue();
    const article = {
      title: values.title,
      content: editor.getHtml(),
    };
    const result = await add(article);
    setIsModalOpen(false);
    channel.postMessage({
      type: 'reload',
    });
    setResult({
      status: 'success',
      title: '发布成功',
      extra: [
        <Button type='primary' key='back' href='/articles'>
          返回文章列表
        </Button>,
        <Button key='continue' onClick={handleContinue}>
          继续添加
        </Button>,
      ],
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [editor, setEditor] = useState(null);

  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
  };

  const onSave = () => {
    setIsModalOpen(true);
  };

  editorConfig.MENU_CONF['uploadImage'] = {
    customUpload: async (file, insertFn) => {
      setSpinning(true);
      const res = await oss.upload(file);
      const alt = '图片';
      const href = res.url;
      insertFn(res.url, alt, href);
      setSpinning(false);
    },
  };

  // 工具栏配置
  const toolbarConfig = {}; // TS 语法
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      {result ? (
        <Result status={result.status} title={result.title} extra={result.extra} />
      ) : (
        <>
          <div className={styles.editor}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode='default'
              style={{ borderBottom: '1px solid #ccc', position: 'stick', top: 0 }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={editor => setHtml(editor.getHtml())}
              mode='default'
            />
          </div>
          <Modal centered title='发布文章' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              form={form}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                label='标题'
                name='title'
                rules={[
                  {
                    required: true,
                    message: '标题内容不能为空!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <div className={styles.footer}>
            <Button type='primary' onClick={onSave}>
              发布
            </Button>
          </div>
          <Spin spinning={spinning} fullscreen />
        </>
      )}
    </>
  );
}

export default AddArticle;

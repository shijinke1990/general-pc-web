import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import oss from '../../../utils/aliOss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';

import styles from './Edit.module.scss';
import SiteContext from '../../../context/SiteContext';
import { useParams } from 'react-router-dom';
import { Button, Modal, Checkbox, Form, Input, Spin } from 'antd';

function EditArticle() {
  const { site, handleUpdate } = useContext(SiteContext);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { index } = useParams();
  const [spinning, setSpinning] = useState(false);
  const navigateTo = useNavigate();

  // 编辑器内容
  const [html, setHtml] = useState('<p>在此输入内容</p>');
  const handleLoad = () => {
    if (index >= 0 && site?.articles) {
      console.log('site.articles', site.articles);
      const article = site.articles[index];
      if (article) {
        setHtml(article.content);
      }
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    handleLoad();
  }, [site]);

  const handleOk = () => {
    form.validateFields().then(async values => {
      if (index) {
        const article = {
          ...site.articles[index],
          content: editor.getHtml(),
        };
        const _articles = [...site.articles, article];
        await handleUpdate({ articles: _articles });
        setIsModalOpen(false);
      } else {
        const article = {
          key: Math.random(),
          title: values.title,
          content: editor.getHtml(),
        };
        site.articles = site.articles || [];
        const _articles = [...site.articles, article];
        await handleUpdate({ articles: _articles });
        setIsModalOpen(false);
      }
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
    if (index) {
      site.articles[index].content = editor.getHtml();
      handleUpdate({ articles: site.articles });
      navigateTo('/article');
    } else {
      setIsModalOpen(true);
    }
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
      <div className={styles.editor}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode='default'
          style={{ height: 'calc(100%-100px)', overflowY: 'scroll' }}
        />
      </div>
      <Modal centered title='保存文章' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100px',
        }}
      >
        <Button type='primary' onClick={onSave} style={{ marginTop: '15px' }}>
          保存
        </Button>
      </div>
      <Spin spinning={spinning} fullscreen />
    </>
  );
}

export default EditArticle;

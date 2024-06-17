import React, { useContext, useMemo, useState } from 'react';
import { Button, Table, Space, Flex, message } from 'antd';

import { load, remove, updateMany, update } from '@services/articles';
import { useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { InputNumber } from 'antd';
import AddMarkdown from './AddMarkdown';
import mitt from 'mitt';
import CopyButton from '@components/CopyButton';

const emitter = mitt();

const Article = () => {
  const [dataSource, setDataSource] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const onDragEnd = list => {
    console.log('list', list);
    updateMany({
      list,
    }).then(res => {
      console.log('res', res);
      setDataSource(list);
    });
  };

  emitter.on('reload', () => {
    handleLoad();
  });

  const handleLoad = () => {
    load().then(res => {
      console.log('res', res);
      const host = window.location.host;
      const list = res?.list?.map((item, index) => {
        return {
          ...item,
          key: index,
          link:
            process.env.NODE_ENV === 'development'
              ? `http://${host}/articles/${item._id}`
              : `https://www.lianlianbushe.com/articles/${item._id}`,
        };
      });
      console.log('list', list);
      setDataSource(list);
    });
  };

  useEffect(() => {
    handleLoad();
    const channel = new BroadcastChannel('article');
    channel.onmessage = e => {
      if (e.data.type === 'reload') {
        handleLoad();
      }
    };
    return () => {
      channel.close();
    };
  }, []);

  const handleCopy = record => {
    if (process.env.NODE_ENV === 'development') {
      const host = window.location.host;
      copy(`http://${host}/articles/${record._id}`);
    } else {
      copy(`https://www.lianlianbushe.com/articles/${record._id}`);
    }
    messageApi.success('复制成功');
  };

  const toAdd = () => {
    window.open('/addArticle', 'addArticle');
  };

  const handleRemove = record => {
    remove(record).then(res => {
      handleLoad();
    });
  };

  const addMarkdown = () => {
    emitter.emit('addMarkdown');
  };

  const onChange = (order, record, index) => {
    const data = { ...record, order };
    // console.log(record)
    update(data);
    setDataSource(prevState => {
      const arr = [...prevState];
      arr[index] = data;
      return arr;
    });
  };

  const columns = [
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => (
        <InputNumber min={1} value={text} onChange={order => onChange(order, record, index)} />
      ),
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
      render: _ => <span>{_.username}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },

    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      render(text) {
        return <CopyButton value={text} />;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <Space>
          {/* <CopyButton value={`https://www.lianlianbushe.com/articles/${record.id}`} /> */}
          {/* <Button onClick={() => handleCopy(record)}>复制链接</Button> */}
          <Button href={`/articles/${record.id}`} target='_blank'>
            预览
          </Button>
          <Button>编辑</Button>
          <Button onClick={() => handleRemove(record)} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex
        justify='space-between'
        style={{
          padding: '12px 0',
        }}
      >
        <Space>文章列表</Space>
        <Space>
          <Button type='primary' onClick={toAdd}>
            从编辑器新增
          </Button>
          <Button type='primary' onClick={addMarkdown}>
            上传.md新增
          </Button>
        </Space>
      </Flex>

      {/* <DndTable columns={columns} dataSource={dataSource} setDataSource={setDataSource} afterDragEnd={onDragEnd} /> */}
      {contextHolder}
      <AddMarkdown emitter={emitter} />
    </>
  );
};
export default Article;

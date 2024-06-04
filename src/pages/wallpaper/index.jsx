import React from 'react';
import Masonry from '@components/Masonry';
import { useState } from 'react';
import { Image } from 'antd';
import { load } from '@services/wallpapers';

import { useEffect } from 'react';

export default function Wallpaper() {
  const [list, setList] = useState([]);

  const handleLoad = async () => {
    load().then(res => {
      console.log('res', res);
      const list = res.list.map((item, index) => ({
        radio: item.radio,
        key: index,
        el: (
          <Image
            style={{
              width: '100%',
              height: 'auto',
            }}
            src={item.imgUrl}
            key={index}
          />
        ),
      }));
      setList(list);
    });
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div
      style={{
        margin: 12,
        boxSizing: 'border-box',
        overflow: 'hidden',
        scroll: 'hidden',
      }}
    >
      <Masonry list={list} gap={12} column={4} />
    </div>
  );
}

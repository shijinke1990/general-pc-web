import React from 'react';
import Masonry from '@components/Masonry';
import { useState } from 'react';
import { Image } from 'antd';
import { load } from '@services/wallpapers';
import styles from './index.module.scss';

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
            src={item.imgUrl + '?x-oss-process=image/resize,m_lfit,w_500'}
            preview={{
              src: item.imgUrl,
            }}
            key={index}
          />
        ),
      }));
      setList(list);
    });
  };
  useEffect(() => {
    handleLoad();
    document.title = '壁纸';
  }, []);
  return (
    <div className={styles.container}>
      <Masonry list={list} gap={12} column={4} />
    </div>
  );
}

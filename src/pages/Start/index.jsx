import React, { useEffect, useState } from 'react';

import ProductList from './ProductList';
import styles from './index.module.scss';

const Start = () => {
  document.title = '首页 - 恋恋不舍';
  return (
    <div className={styles.start}>
      <img className={styles.logo} src='/logo.png' alt='logo' />
      <ProductList></ProductList>
      <div className={styles.beiAn}>
        <a className={styles.link} href='http://beian.miit.gov.cn' target='_blank' rel='noopener noreferrer'>
          备案号：鄂ICP备14002884号-6
        </a>
        <a className={styles.link} href='https://www.boluobo.com' target='_blank' rel='noopener noreferrer'>
          友情链接：菠萝卜
        </a>
      </div>
    </div>
  );
};

export default Start;

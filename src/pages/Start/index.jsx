import React, { useEffect, useState } from 'react';

import ProductList from './ProductList';
import styles from './index.module.scss';

const Start = () => {
  return (
    <div className={styles.start}>
      <img className={styles.logo} src='/logo.png' alt='logo' />
      <ProductList></ProductList>
      <div className={styles.beiAn}>
        <a href='http://beian.miit.gov.cn' target='_blank' rel='noopener noreferrer'>
          88888
        </a>
      </div>
    </div>
  );
};

export default Start;

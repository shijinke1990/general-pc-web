import React, { useContext } from 'react';
import styles from './ProductList.module.scss';
import { CheckCircleOutlined } from '@ant-design/icons';

const ProductList = () => {
  const productList = [
    {
      key: 1,
      imgUrl: '/wallpaper.svg',
      title: '壁纸',
      href: '/wallpaper',
    },
    {
      key: 5,
      imgUrl: '/article.svg',
      title: '文章',
      href: '/article',
    },
    {
      key: 2,
      imgUrl: '/music.svg',
      title: '音乐',
      href: '/music',
    },
    {
      key: 4,
      imgUrl: '/card.svg',
      title: '卡片',
      href: '/card',
    },

    {
      key: 3,
      imgUrl: '/resume.svg',
      title: '简历',
      href: '/resume',
    },
  ];
  const onClick = product => {
    console.log('product', product);
    window.open(product.href, '_blank');
  };
  return (
    <div id='productList' className={styles.productList}>
      <div className={styles.productListContent}>
        {productList.map(product => (
          <div className={styles.card} key={product.key} onClick={() => onClick(product)}>
            <img className={styles.img} src={product.imgUrl} />
            <div className={styles.title}>{product.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

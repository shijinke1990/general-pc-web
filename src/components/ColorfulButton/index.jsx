import React from 'react';
import styles from './index.module.scss';

export default function ColorfulButton({ text, ...props }) {
  return (
    <button {...props} className={styles.button}>
      <img className={styles.img} src='/random.svg' alt='' />
      {text}
    </button>
  );
}

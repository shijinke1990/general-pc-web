import React from 'react';
import { Button, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CopyOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default function CopyButton({ value, text = '复制成功', placement = 'top', children }) {
  const [showChecked, setShowChecked] = React.useState(false);

  const onClick = () => {
    copy(value);
    setShowChecked(true);
    setTimeout(() => {
      setShowChecked(false);
    }, 1500);
  };
  return (
    <Tooltip placement={placement} title={<span>{text}</span>} open={showChecked}>
      <div className={styles.wrapper} onClick={onClick}>
        {children}
      </div>
    </Tooltip>
  );
}

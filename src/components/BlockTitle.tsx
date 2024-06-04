import React from 'react';
import styles from './BlockTitle.module.scss';

export interface BlockTitleProps {
    english?: string;
    chinese?: string;
    tips?: string;
}

const BlockTitle: React.FC<BlockTitleProps> = ({ english, chinese, tips }) => {
    return (
        <div className={styles.blockTitle}>
            <div className={styles.blockTitleHeader}>
                <div className={styles.english}>{english}</div>
                <div className={styles.chinese}>{chinese}</div>
            </div>
            <div className={styles.tips}>{tips}</div>
        </div>
    );
};

BlockTitle.defaultProps = {
    english: 'TITLE',
    chinese: '标题',
};

export default BlockTitle;

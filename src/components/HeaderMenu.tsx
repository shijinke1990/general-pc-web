import React from 'react';
import styles from './HeaderMenu.module.scss';

const HeaderMenu: React.FC = () => {
    return (
        <ul className={styles.headerMenu}>
            <li className={styles.headerMenuItem}>
                <a href="#productList" className={styles.link}>
                    产品服务
                </a>
            </li>
            <li className={styles.headerMenuItem}>
                <a href="#customerStories" className={styles.link}>
                    客户案例
                </a>
            </li>
            <li className={styles.headerMenuItem}>
                <a href="#partners" className={styles.link}>
                    合作伙伴
                </a>
            </li>
            <li className={styles.headerMenuItem}>
                <a href="#promiseList" className={styles.link}>
                    联系方式
                </a>
            </li>
        </ul>
    );
};

export default HeaderMenu;

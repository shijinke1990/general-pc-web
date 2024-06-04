import React from 'react';
import HeaderMenu from './HeaderMenu';
import HeaderLogo from './HeaderLogo';
import styles from './Header.module.scss';
const TreeMenu: React.FC = () => {
    return (
        <div className={styles.topContainer}>
            <div className={styles.header}>
                <HeaderLogo />
                <HeaderMenu />
            </div>
        </div>
    );
};

export default TreeMenu;

import React, { useContext } from 'react';
import styles from './HeaderLogo.module.scss';
import SiteContext from '../context/SiteContext';
const HeaderLogo = () => {
    const { site } = useContext(SiteContext);
    return (
        <a href="/#" className={styles.headerContainer}>
            <img className={styles.logo} src={site?.logo} alt="logo" />
            <div className={styles.title}>{site?.siteName}</div>
        </a>
    );
};

export default HeaderLogo;

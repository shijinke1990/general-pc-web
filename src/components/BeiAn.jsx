import React, { useContext } from 'react';
import styles from './BeiAn.module.scss';
import SiteContext from '../context/SiteContext';

const HeaderMenu = () => {
    const { site } = useContext(SiteContext);
    const beiAn = site?.beiAn;
    return (
        <>
            {beiAn && (
                <div className={styles.beiAn}>
                    <a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
                        {site?.beiAn}
                    </a>
                </div>
            )}
        </>
    );
};

export default HeaderMenu;

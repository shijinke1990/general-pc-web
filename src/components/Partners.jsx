import React, { useContext } from 'react';
import styles from './Partners.module.scss';
import BlockTitle from './BlockTitle';
import SiteContext from '../context/SiteContext';
const TreeMenu = () => {
    const { site } = useContext(SiteContext);
    return (
        <div className={styles.partners} id="partners">
            <BlockTitle chinese="合作伙伴" english="PARTNERS" tips={site?.partnersDesc}></BlockTitle>
            <div className={styles.partnersContent}>
                {site?.partners.map((item) => (
                    <div className={styles.partnersContentItem} key={item.key}>
                        <img className={styles.partnersContentItemImg} src={item.imgUrl + '?x-oss-process=image/resize,m_lfit,h_160'} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TreeMenu;

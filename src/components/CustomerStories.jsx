import React, { useContext } from 'react';
import styles from './CustomerStories.module.scss';
import BlockTitle from './BlockTitle';
import SiteContext from '../context/SiteContext';
const CustomerStories = () => {
    const { site } = useContext(SiteContext);

    return (
        <div id="customerStories" className={styles.customerStories}>
            <BlockTitle chinese="客户案例" english="CUSTOMER STORIES" tips={site?.customerStoriesDesc}></BlockTitle>

            <div className={styles.customerStoriesContent}>
                {site?.customerStories.map((item) => (
                    <div className={styles.customerStoriesContentItem} key={item.key}>
                        <div className={styles.imgWrapper}>
                            <img className={styles.img} src={item.imgUrl + '?x-oss-process=image/resize,m_lfit,w_784,h_360'} />
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.title}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerStories;

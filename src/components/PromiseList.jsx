import React, { useContext } from 'react';
import styles from './PromiseList.module.scss';
import { Tooltip, Button } from 'antd';

import SiteContext from '../context/SiteContext';

const HeaderMenu = () => {
    const { site } = useContext(SiteContext);
    return (
        <div id="promiseList" className={styles.promiseList}>
            <div className={styles.wrapper}>
                <div className={styles.title}> 联系方式：</div>
            </div>

            {site?.promiseList.map((item) => (
                <Tooltip placement="bottom" title={item.name} key={item.key} color="#356473">
                    <div className={styles.wrapper}>
                        <Button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <img className={styles.icon} src={item.imgUrl} />
                        </Button>
                        <div className={styles.text}>{item.content}</div>
                    </div>
                </Tooltip>
            ))}
        </div>
    );
};

export default HeaderMenu;

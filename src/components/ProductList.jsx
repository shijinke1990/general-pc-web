import React, { useContext } from 'react';
import styles from './ProductList.module.scss';
import BlockTitle from './BlockTitle';
import { CheckCircleOutlined } from '@ant-design/icons';
import SiteContext from '../context/SiteContext';

const ProductList = () => {
    const { site } = useContext(SiteContext);

    return (
        <div id="productList" className={styles.productList}>
            <BlockTitle english="SERVICES" chinese="产品服务" tips={site?.productListDesc} />
            <div className={styles.productListContent}>
                {site?.productList.map((product) => (
                    <div className={styles.card} key={product.key}>
                        <div className={styles.brief}>
                            <img className={styles.img} src={product.imgUrl} />
                            <div className={styles.title}>{product.title}</div>
                            <div className={styles.desc}>{product.desc}</div>
                        </div>
                        <div className={styles.detail}>
                            <div className={styles.detailHeader}>
                                <img className={styles.img} src={product.imgUrl} />
                                <div className={styles.text}>
                                    <div className={styles.title}>{product.title}</div>
                                    <div className={styles.desc}>{product.desc}</div>
                                </div>
                            </div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailContentItem}>
                                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                    <div className={styles.detailContentItemText}>{product.advantage01}</div>
                                </div>
                                <div className={styles.detailContentItem}>
                                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                    <div className={styles.detailContentItemText}>{product.advantage02}</div>
                                </div>
                                <div className={styles.detailContentItem}>
                                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                    <div className={styles.detailContentItemText}>{product.advantage03}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// export default ProductList;

// {
//     site?.productList.map((item, index) => {
//         <div className={styles.card}>
//             <div className={styles.brief}>
//                 <img
//                     className={styles.img}
//                     src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                     alt=""
//                 />
//                 <div className={styles.title}>附录一卡通</div>
//                 <div className={styles.desc}>一卡在手天下我有</div>
//             </div>
//             <div className={styles.detail}>
//                 <div className={styles.detailHeader}>
//                     <img
//                         className={styles.img}
//                         src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                         alt=""
//                     />
//                     <div className={styles.text}>
//                         <div className={styles.title}>附录一卡通</div>
//                         <div className={styles.desc}>一卡在手天下我有</div>
//                     </div>
//                 </div>
//                 <div className={styles.detailContent}>
//                     <div className={styles.detailContentItem}>
//                         <CheckCircleOutlined style={{ color: "#1890ff" }} />
//                         <div className={styles.detailContentItemText}>
//                             批量直充，卡密采购
//                         </div>
//                     </div>
//                     <div className={styles.detailContentItem}>
//                         <CheckCircleOutlined style={{ color: "#1890ff" }} />
//                         <div className={styles.detailContentItemText}>
//                             批量直充，卡密采购
//                         </div>
//                     </div>
//                     <div className={styles.detailContentItem}>
//                         <CheckCircleOutlined style={{ color: "#1890ff" }} />
//                         <div className={styles.detailContentItemText}>
//                             批量直充，卡密采购
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>;
//     });
// }

// const ProductList = () => {
//     const site = useContext(SiteContext);
//     return (
//         <div className={styles.productList}>
//             <BlockTitle
//                 english="SERVICES"
//                 chinese="产品服务"
//                 tips="从全品类数字权益商品供货，到专业运营技术支持，一站式助力企业增长"
//             />
//             <div className={styles.productListContent}>
//                 {site?.productList.map((item, index) => {})}

//                 <div className={styles.card}>
//                     <div className={styles.brief}>
//                         <img
//                             className={styles.img}
//                             src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                             alt=""
//                         />
//                         <div className={styles.title}>附录一卡通</div>
//                         <div className={styles.desc}>一卡在手天下我有</div>
//                     </div>
//                     <div className={styles.detail}>
//                         <div className={styles.detailHeader}>
//                             <img
//                                 className={styles.img}
//                                 src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                                 alt=""
//                             />
//                             <div className={styles.text}>
//                                 <div className={styles.title}>附录一卡通</div>
//                                 <div className={styles.desc}>
//                                     一卡在手天下我有
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.detailContent}>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.card}>
//                     <div className={styles.brief}>
//                         <img
//                             className={styles.img}
//                             src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                             alt=""
//                         />
//                         <div className={styles.title}>附录一卡通</div>
//                         <div className={styles.desc}>一卡在手天下我有</div>
//                     </div>
//                     <div className={styles.detail}>
//                         <div className={styles.detailHeader}>
//                             <img
//                                 className={styles.img}
//                                 src="https://open.fulu.com/img/fulu_one_card_img_out.png"
//                                 alt=""
//                             />
//                             <div className={styles.text}>
//                                 <div className={styles.title}>附录一卡通</div>
//                                 <div className={styles.desc}>
//                                     一卡在手天下我有
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.detailContent}>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                             <div className={styles.detailContentItem}>
//                                 <CheckCircleOutlined
//                                     style={{ color: "#1890ff" }}
//                                 />
//                                 <div className={styles.detailContentItemText}>
//                                     批量直充，卡密采购
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default ProductList;

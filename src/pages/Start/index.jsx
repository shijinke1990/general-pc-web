import React, { useEffect, useState } from 'react';

import Header from '@components/Header';
import { Carousel, Image } from 'antd';
import Partners from '@components/Partners';
import BeiAn from '@components/BeiAn';
import PromiseList from '@components/PromiseList';
import CustomerStories from '@components/CustomerStories';
import ProductList from '@components/ProductList';
// import { load } from '@api/site';

import SiteContext from '@context/SiteContext';
import useDefer from '@hooks/useDefer';

const Start = () => {
  const [site, setSite] = useState(null);
  // const handleLoad = () => {
  //     load().then((res) => {
  //         setSite(res?.data);
  //     });
  // };
  // useEffect(() => {
  //     handleLoad();
  // }, []);
  const defer = useDefer();
  return (
    <>
      <SiteContext.Provider value={{ site }}>
        <Header></Header>
        <Carousel autoplay autoplaySpeed={2000} effect='fade'>
          {site?.banners?.map((item, index) => {
            return (
              defer(index * 100) && (
                <div key={index}>
                  <Image
                    style={{
                      objectFit: 'cover',
                    }}
                    width={1920}
                    height={520}
                    src={item.imgUrl}
                    preview={false}
                    placeholder={
                      <Image
                        width={1920}
                        height={520}
                        preview={false}
                        style={{
                          objectFit: 'cover',
                        }}
                        src={item.imgUrl + '?x-oss-process=image/resize,m_lfit,w_720,h_195'}
                      />
                    }
                  />
                </div>
              )
            );
          })}
        </Carousel>
        {/* {defer(50) && <ProductList></ProductList>}
                {defer(150) && <CustomerStories></CustomerStories>}
                {defer(200) && <Partners></Partners>}
                {defer(250) && <PromiseList></PromiseList>}
                {defer(300) && <BeiAn></BeiAn>} */}
      </SiteContext.Provider>
    </>
  );
};

export default Start;

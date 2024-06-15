import React, { useEffect, useState } from 'react';

import Header from '@components/Header';
import { Carousel, Image } from 'antd';
import Partners from '@components/Partners';
import BeiAn from '@components/BeiAn';
import PromiseList from '@components/PromiseList';
import CustomerStories from '@components/CustomerStories';
import ProductList from '@components/ProductList';
import { useRef } from 'react';
// import { load } from '@api/site';

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

import SiteContext from '@context/SiteContext';
import useDefer from '@hooks/useDefer';

const Start = () => {
  const myElement = useRef(null);
  const [site, setSite] = useState(myElement.current);
  // const handleLoad = () => {
  //     load().then((res) => {
  //         setSite(res?.data);
  //     });
  // };
  useEffect(() => {
    let flipState = Flip.getState('#header');

    // 在这里，你可以改变你的元素的大小、位置或其他属性
    myElement.current.style.width = '200px';
    myElement.current.style.height = '200px';
    myElement.current.style.backgroundColor = 'red';
    Flip.to(flipState, {
      duration: 3,
      ease: 'power1.inOut',
      absolute: true, // 使用绝对定位
      target: myElement.current, // 指定目标元素
    });
  }, []);
  const defer = useDefer();
  return (
    <div ref={myElement}>
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
    </div>
  );
};

export default Start;

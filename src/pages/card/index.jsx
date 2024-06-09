import React from 'react';
import { load } from '@services/cards';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import ColorfulButton from '@components/ColorfulButton';

export default function Card() {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const handleLoad = async () => {
    const { list } = await load();
    setList(list);
    setData(list[0]?.urls || []);
    setIndex(0);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  const randomCard = () => {
    if (index === list.length - 1) {
      setIndex(0);
      setData(list[0]?.urls || []);
    } else {
      setIndex(index + 1);
      setData(list[index + 1]?.urls || []);
    }
  };
  return (
    <>
      <div className={styles.page}>
        <div className={styles.box}>
          {data.map((item, index) => (
            <img
              className={classNames({
                [styles.cover]: index === 0,
                [styles.hero]: index === 1,
                [styles.title]: index === 2,
              })}
              src={item}
              key={index}
              alt='card'
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '10vh',

          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <ColorfulButton text='换一个' onClick={() => randomCard()} />
      </div>
    </>
  );
}

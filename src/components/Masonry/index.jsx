/**
 * Masonry component
 * 纯js实现瀑布流布局
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Masonry = ({ list, column = 3, gap = 12 }) => {
  const [items, setItems] = useState([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const cal = () => {
    const container = document.querySelector(`.${styles.container}`);
    const rect = container.getBoundingClientRect();
    setContainerHeight(`calc(100vh - ${rect.top}px)`);
    const width = (container.offsetWidth - (column - 1) * gap) / column;
    const columnHeights = new Array(column).fill(0);
    setItems(
      list.map(item => {
        const top = Math.min(...columnHeights) + 'px';
        const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const left = columnIndex * (width + gap) + 'px';
        const el = {
          ...item,
          top,
          left,
          width: width,
        };
        columnHeights[columnHeights.indexOf(Math.min(...columnHeights))] += item.radio * width + gap;
        // setContainerHeight(Math.max(...columnHeights));
        return el;
      })
    );
  };

  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    console.log('scrollTop');
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      console.log('scrollTop', scrollTop);

      if (scrollTop + windowHeight === scrollHeight) {
        console.log('已经滚动到底部');
        // 在这里执行你的逻辑，例如加载更多数据
      }
    };

    container.addEventListener('scroll', handleScroll);

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    cal();
    window.addEventListener('resize', cal);
  }, [list]);

  return (
    <div
      className={styles.container}
      style={{
        height: containerHeight,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          style={{ top: item.top, left: item.left, width: item.width, height: item.width * item.radio }}
        >
          {item.el}
        </div>
      ))}
    </div>
  );
};

export default Masonry;

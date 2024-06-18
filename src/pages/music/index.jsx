import React, { useState, useEffect } from 'react';
import { load } from '@/services/music';
import styles from './index.module.scss';
import classnames from 'classnames';
import ColorfulButton from '../../components/ColorfulButton';

function parseLrc(lrc) {
  const lrcArr = lrc.split('\n');
  const lrcObj = {};
  lrcArr.forEach(item => {
    const time = item.match(/\[\d{2}:\d{2}.\d{2}\]/g);
    const value = item.match(/(?<=\]).*/g);
    if (time && value) {
      time.forEach(t => {
        const timeStr = t.slice(1, -1);
        const second = timeStr.split(':').reduce((prev, curr) => prev * 60 + parseFloat(curr), 0);
        lrcObj[second.toFixed(6)] = value[0];
      });
    }
  });
  return lrcObj;
}

function getActiveIndex(timeList, currentTime) {
  let index = 0;
  for (let i = 0; i < timeList.length; i++) {
    if (i === timeList.length - 1) {
      index = i;
      break;
    }
    if (timeList[i] < currentTime) {
      continue;
    }

    index = i - 1;
    break;
  }
  return index;
}

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.title = '音乐 - 恋恋不舍';
    load()
      .then(res => {
        const { list } = res;
        const musicList = list.map(item => {
          const lrc = parseLrc(item.lrc);
          return {
            ...item,
            lrc,
            timeList: Object.values(lrc),
          };
        });
        setMusicList(musicList);
        setCurrentMusic(musicList[0]);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  const handleSelectMusic = music => {
    setCurrentMusic(music);
    setIsPlaying(true);
  };

  const handleTimeUpdate = e => {
    const timeList = Object.keys(currentMusic.lrc)
      .map(item => parseFloat(item))
      .sort((a, b) => a - b);
    const index = getActiveIndex(timeList, e.target.currentTime);
    console.log('index', index);
    setActive(index);
  };

  const randomMusic = () => {
    const list = musicList.filter(item => item._id !== currentMusic._id);
    const index = Math.floor(Math.random() * list.length);
    setCurrentMusic(list[index]);
    setIsPlaying(true);
  };

  return (
    <div className={styles.music}>
      <div className={styles.musicList}>
        <ColorfulButton text='换一首' onClick={() => randomMusic()} />
      </div>

      <div className={styles.lrc}>
        <div
          style={{
            transform: `translateY(${360 - active * 36}px)`,
            transition: 'transform 0.5s',
          }}
        >
          {currentMusic ? (
            currentMusic.timeList
              .filter(item => item)
              .map((value, index) => (
                <p
                  key={index}
                  className={classnames([
                    styles.lrcItem,
                    {
                      [styles.active]: active === index,
                    },
                  ])}
                >
                  {value}
                </p>
              ))
          ) : (
            <div>暂无歌词</div>
          )}
        </div>
      </div>
      <div className={styles.musicPlayer}>
        <audio
          src={currentMusic ? currentMusic.url : ''}
          autoPlay={isPlaying}
          onTimeUpdate={handleTimeUpdate}
          controls
        />
        <div className={styles.musicInfo}>
          <div className={styles.musicName}>{currentMusic ? currentMusic.name : '暂无音乐'}</div>
        </div>
      </div>
    </div>
  );
};

export default Music;

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { load } from '@/services/notes';
import './index.scss';

export default function Note() {
  const [list, setList] = useState([]);

  useEffect(() => {
    document.title = '笔记 - 恋恋不舍';
    load().then(res => {
      console.log('res', res);
      setList(res.list);
    });
  }, []);
  return (
    <div className='g-container'>
      {list.map(item => (
        <div className='word' key={item._id}>
          {item.content}
        </div>
      ))}
    </div>
  );
}

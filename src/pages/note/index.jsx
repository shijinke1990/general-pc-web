import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { load } from '@/services/notes';
import './index.module.scss';

export default function Note() {
  const [text, setText] = useState('笔记');

  useEffect(() => {
    load().then(res => {
      const list = res.list;
      let index = 0;
      setInterval(() => {
        console.log('list', list);
        if (index === list.length) {
          index = 0;
        } else {
          index++;
        }
        setText(list[index]?.content);
      }, 3000);
    });
  }, []);
  useEffect(() => {
    document.title = '笔记 - 恋恋不舍';
    const h1 = document.querySelector('h1');
    // h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>")

    // Support Space:
    h1.innerHTML = h1.textContent
      .replace(/[\S\u4E00-\u9FFF]/g, '<span>$&</span>')
      .replace(/\s/g, '<span>&nbsp;</span>');

    let delay = 0;
    document.querySelectorAll('span').forEach((span, index) => {
      delay += 0.1;

      if (index === 6) delay += 0.3;

      span.style.setProperty('--delay', `${delay}s`);
    });

    h1.addEventListener('animationend', e => {
      if (e.target === document.querySelector('h1 span:last-child')) {
        h1.classList.add('ended');
      }
    });
  }, [text]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '0 200px',
      }}
    >
      <h1>{text}</h1>
    </div>
  );
}

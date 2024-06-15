import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

export default function MyComponent() {
  const myElement = useRef(null);
  gsap.to('.myElement', { scale: 2, rotate: '720deg', duration: 1 });
  useEffect(() => {
    // 获取元素的初始状态
  }, []);

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <div
        className='myElement'
        ref={myElement}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
        }}
      >
        Hello, world!
      </div>
    </div>
  );
}

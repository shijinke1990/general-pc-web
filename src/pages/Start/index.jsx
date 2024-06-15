import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function MyComponent() {
  const myElement1 = useRef(null);
  const myElement2 = useRef(null);
  const str = '南山南北秋悲正常办公两不误';

  useEffect(() => {
    gsap.to(myElement1.current, {
      rotate: '180deg',
      duration: 10,
      x: 0,
      y: 0,
    });
    gsap.from(myElement2.current, {
      rotate: '180deg',
      duration: 10,
      x: 800,
      y: 600,
    });
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {str.split('').map((item, index) => {
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              fontSize: '20px',
            }}
          >
            {item}
          </span>
        );
      })}
      <div
        ref={myElement1}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
        }}
      >
        王安琪
      </div>
      <div
        ref={myElement2}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'green',
        }}
      >
        胡奕
      </div>
    </div>
  );
}

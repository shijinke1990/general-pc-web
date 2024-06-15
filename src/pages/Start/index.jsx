import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function MyComponent() {
  const myElement1 = useRef(null);
  const myElement2 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(myElement1.current, { x: 900, rotate: '720deg', duration: 5 })
      .to(myElement2.current, { x: -900, rotate: '720deg', duration: 5 })
      .to(myElement1.current, { x: 0, rotate: '720deg', duration: 5 })
      .to(myElement2.current, { x: 0, rotate: '720deg', duration: 5 });

    // myElement1.current.to({ x: 100 }, { duration: 1 });
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '200px',
      }}
    >
      <div
        ref={myElement1}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        胡奕
      </div>
    </div>
  );
}

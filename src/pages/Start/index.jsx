import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import './demo.scss';

gsap.registerPlugin(ScrollTrigger);

export default function MyComponent() {
  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });
    tl.from('.gf', { y: 150, stagger: 0.5, duration: 2, opacity: 0 }).to('.gf', {
      y: 0,
      stagger: 0.5,
      duration: 2,
      opacity: 0,
      scale: 10,
    });
    tl;
  }, []);

  return (
    <div className='gf_container'>
      <h1 className='gf'></h1>
      <h1 className='gf'></h1>
      <h1 className='gf'></h1>
      <h1 className='gf'></h1>
      <h1 className='gf'></h1>
    </div>
  );
}

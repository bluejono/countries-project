import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

const BlurText = ({ 
  text = '', 
  delay = 50, 
  className = '', 
  initialDelay = 0 
}) => {
  const words = text.split(' ');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const [animatedOnce, setAnimatedOnce] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedOnce) {
          setInView(true);
          setAnimatedOnce(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animatedOnce]);

  // When text changes, we can reset animation if we want, but usually it's better to just animate new text seamlessly or use key in parent component
  const springs = useSprings(
    words.length,
    words.map((_, i) => ({
      from: { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,20px,0)' },
      to: inView
        ? { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0px,0)' }
        : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,20px,0)' },
      delay: initialDelay + i * delay,
      config: { mass: 1, tension: 200, friction: 20 },
    }))
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block whitespace-pre"
        >
          {words[index]}{index < words.length - 1 ? ' ' : ''}
        </animated.span>
      ))}
    </span>
  );
};

export default BlurText;

import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

const SplitText = ({ 
  text = '', 
  className = '', 
  delay = 30, 
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

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const letters = word.split('');
        const springs = useSprings(
          letters.length,
          letters.map((_, letterIndex) => ({
            from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
            to: inView
              ? { opacity: 1, transform: 'translate3d(0,0px,0)' }
              : { opacity: 0, transform: 'translate3d(0,40px,0)' },
            delay: initialDelay + (wordIndex * 50) + (letterIndex * delay),
            config: { mass: 1, tension: 250, friction: 25 },
          }))
        );

        return (
          <span key={wordIndex} className="inline-block whitespace-pre">
            {springs.map((props, index) => (
              <animated.span
                key={index}
                style={props}
                className="inline-block"
              >
                {letters[index]}
              </animated.span>
            ))}
            {wordIndex < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
};

export default SplitText;

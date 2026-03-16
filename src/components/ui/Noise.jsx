import { useRef, useEffect } from 'react';

const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrain = () => {
      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = patternSize;
      patternCanvas.height = patternSize;
      const patternCtx = patternCanvas.getContext('2d');
      const patternData = patternCtx.createImageData(patternSize, patternSize);
      const patternPixelData = patternData.data;

      for (let i = 0; i < patternPixelData.length; i += 4) {
        const value = Math.random() * 255;
        patternPixelData[i] = value;
        patternPixelData[i + 1] = value;
        patternPixelData[i + 2] = value;
        patternPixelData[i + 3] = patternAlpha;
      }

      patternCtx.putImageData(patternData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
      ctx.save();
      ctx.scale(patternScaleX, patternScaleY);
      ctx.fillRect(0, 0, canvas.width / patternScaleX, canvas.height / patternScaleY);
      ctx.restore();
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute top-0 left-0 h-full w-full"
      ref={grainRef}
      style={{
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default Noise;

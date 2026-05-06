import React, { useEffect, useRef } from 'react';

export default function SnakeButton({
  as: Component = 'button',
  snakeOptions = {},
  wrapperStyle = {},
  style = {},
  children,
  ...props
}) {
  const btnRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const canvas = canvasRef.current;
    if (!btn || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const speed = snakeOptions.speed || 0.004;
    const tailLength = snakeOptions.tailLength || 0.22;
    const lineWidth = snakeOptions.lineWidth || 2;
    const pad = snakeOptions.pad ?? 2;
    const startAt = snakeOptions.startAt || 'right';
    let radius = parseFloat(getComputedStyle(btn).borderRadius) || 10;
    let progress = 0;
    let rafId = null;
    let resizeObserver = null;

    function resize() {
      radius = parseFloat(getComputedStyle(btn).borderRadius) || 10;
      const w = btn.offsetWidth + pad * 2;
      const h = btn.offsetHeight + pad * 2;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Start from the right edge so RTL and LTR feel consistent.
      const r = Math.min(radius, w / 2 - 1, h / 2 - 1);
      const sw = w - 2 * r;
      const sh = h - 2 * r;
      const totalPerim = 2 * sw + 2 * sh + Math.PI * 2 * r;
      if (totalPerim > 0) {
        if (startAt === 'right') progress = sw / totalPerim;
        else if (startAt === 'bottom') progress = (sw + (Math.PI / 2) * r + sh) / totalPerim;
        else if (startAt === 'left') progress = (sw + (Math.PI / 2) * r + sh + (Math.PI / 2) * r + sw) / totalPerim;
        else progress = 0;
      }
    }

    function getPoint(t) {
      const w = canvas.width;
      const h = canvas.height;
      const r = Math.min(radius, w / 2 - 1, h / 2 - 1);
      const sw = w - 2 * r;
      const sh = h - 2 * r;
      const arcQ = (Math.PI / 2) * r;
      const totalPerim = 2 * sw + 2 * sh + Math.PI * 2 * r;
      t = ((t % 1) + 1) % 1;
      let d = t * totalPerim;

      if (d <= sw) return { x: r + d, y: 0 };
      d -= sw;
      if (d <= arcQ) {
        const a = -Math.PI / 2 + d / r;
        return { x: w - r + Math.cos(a) * r, y: r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sh) return { x: w, y: r + d };
      d -= sh;
      if (d <= arcQ) {
        const a = d / r;
        return { x: w - r + Math.cos(a) * r, y: h - r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sw) return { x: w - r - d, y: h };
      d -= sw;
      if (d <= arcQ) {
        const a = Math.PI / 2 + d / r;
        return { x: r + Math.cos(a) * r, y: h - r + Math.sin(a) * r };
      }
      d -= arcQ;
      if (d <= sh) return { x: 0, y: h - r - d };
      d -= sh;
      const a2 = Math.PI + d / r;
      return { x: r + Math.cos(a2) * r, y: r + Math.sin(a2) * r };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const steps = 80;
      const step = tailLength / steps;

      for (let i = 0; i <= steps; i += 1) {
        const pt = getPoint(progress - i * step);
        const ratio = 1 - i / steps;
        const alpha = ratio * ratio;
        const rr = Math.round(184 + (255 - 184) * ratio * 0.5);
        const g = Math.round(164 + (240 - 164) * ratio * 0.3);
        const b = Math.round(114 + (180 - 114) * ratio * 0.2);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (lineWidth + ratio) / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${g},${b},${alpha})`;
        ctx.fill();
      }

      const head = getPoint(progress);
      ctx.beginPath();
      ctx.arc(head.x, head.y, lineWidth / 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,235,160,1)';
      ctx.fill();

      const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 6);
      grd.addColorStop(0, 'rgba(255,232,140,0.35)');
      grd.addColorStop(1, 'rgba(255,232,140,0)');
      ctx.beginPath();
      ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      progress = (progress + speed) % 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(btn);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [snakeOptions]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', ...wrapperStyle }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: -2,
          left: -2,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Component
        ref={btnRef}
        {...props}
        style={{ ...style, position: style.position || 'relative', zIndex: 1 }}
      >
        {children}
      </Component>
    </div>
  );
}

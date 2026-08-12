import React, { useEffect, useRef, useState } from 'react';

/** Fades/slides an element in the first time it crosses the viewport. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, delay = 0, y = 28, style, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

/** Wraps a button/link so it "pulls" toward the cursor within a magnetic radius — literalizes the "magnetic" brand concept. */
export const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 0.35 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setTransform(`translate(${relX * strength}px, ${relY * strength}px)`);
  };

  const reset = () => setTransform('translate(0px, 0px)');

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        display: 'inline-block',
        transform,
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)'
      }}
    >
      {children}
    </div>
  );
};

/** Counts up to a target number once it enters the viewport. */
export const Counter: React.FC<{ to: number; suffix?: string; duration?: number; style?: React.CSSProperties }> = ({
  to,
  suffix = '',
  duration = 1600,
  style
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(to * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} style={style}>
      {value}
      {suffix}
    </span>
  );
};

/** Infinite scrolling ticker band. */
export const Marquee: React.FC<{ items: string[]; speed?: number }> = ({ items, speed = 32 }) => {
  const loop = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      padding: '16px 0'
    }}>
      <div
        style={{
          display: 'flex',
          gap: '48px',
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite`
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: i % items.length === 0 ? 'var(--accent)' : 'var(--text-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
              whiteSpace: 'nowrap'
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)' }}>&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/** Radial "magnetic field" glow that tracks the cursor within its container. */
export const MagneticField: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty('--mx', `${x}%`);
    node.style.setProperty('--my', `${y}%`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className="magnetic-field" style={style}>
      {children}
    </div>
  );
};

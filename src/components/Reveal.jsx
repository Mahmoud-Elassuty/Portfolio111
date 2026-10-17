import { useEffect, useRef } from 'react';
import { observeReveal } from '../hooks/reveal.js';

/** Scroll-reveal wrapper. effect: up | down | left | right | fade | zoom. delay in ms (stagger). */
export default function Reveal({ as: Tag = 'div', effect = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => observeReveal(ref.current), []);
  return (
    <Tag ref={ref} className={`reveal rv-${effect} ${className}`.trim()} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

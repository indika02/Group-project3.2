  import React, { useEffect, useRef } from 'react';
  import ScrollReveal from 'scrollreveal';

  const ScrollRevealContainer = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
      const sr = ScrollReveal();

      sr.reveal(containerRef.current, {
        reset:true,
        duration: 2000,
        distance: '150px',
        origin: 'bottom',
        delay:200
      });
    }, []);

    return <div ref={containerRef}>{children}</div>;
  };

  export default ScrollRevealContainer;

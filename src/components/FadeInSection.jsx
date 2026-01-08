import React, { useState, useRef, useEffect } from 'react';

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
   
        setVisible(entry.isIntersecting);
      });
    }, {
        threshold: 0.2 
    });

    const currentElement = domRef.current;
    if (currentElement) {
        observer.observe(currentElement);
    }

    return () => {
        if (currentElement) {
            observer.unobserve(currentElement);
        }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default FadeInSection;
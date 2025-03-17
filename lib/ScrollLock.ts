'use client'

import { useEffect } from 'react';

const ScrollLock = () => {
  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return null;
};

export default ScrollLock;

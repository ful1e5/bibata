'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  number: string;
  duration: number;
}

export const AnimatedCounter: React.FC<Props> = (props) => {
  const { number, duration } = props;

  // number displayed by component
  const [count, setCount] = useState('0');

  useEffect(() => {
    let start = 0;
    // first three numbers from props
    const end = parseInt(number.substring(0, 3));
    // if zero, return
    if (start === end) return;

    // find duration per increment
    let incrementTime = (duration / end) * 1000;

    // timer increments start counter
    // then updates count
    // ends if start reaches end
    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    // dependency array
  }, [number, duration]);

  return <>{count}</>;
};

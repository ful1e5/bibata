'use client';

import React, { useState, useEffect } from 'react';

import ls from 'localstorage-slim';

ls.config.encrypt = true;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<T>] {
  const get = () => {
    const d: T = ls.get(key) || initialValue;
    return d;
  };

  const [value, setValue] = useState<T>(() => get());

  useEffect(() => {
    setValue(get());
  }, [localStorage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ls.set(key, value);
  }, [key, value]);

  return [value, setValue];
}

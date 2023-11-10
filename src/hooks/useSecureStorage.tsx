'use client';

import React, { useState, useEffect } from 'react';

import ls from 'localstorage-slim';

ls.config.encrypt = true;

export function useSecureStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<T>] {
  key = `bibata.${key}`;

  const get = () => {
    try {
      const d: T = ls.get(key) || initialValue;
      return d;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(() => get());

  useEffect(() => {
    setValue(() => get());
  }, [key, initialValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ls.set(key, value, { encrypt: true });
  }, [key, value]);

  return [value, setValue];
}

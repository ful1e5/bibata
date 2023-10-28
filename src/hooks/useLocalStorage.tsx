import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(() => {
    // Check if localStorage is available (only in the browser)
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } else {
      // If localStorage is not available (e.g., during server-side rendering), return the initial value
      return initialValue;
    }
  });

  useEffect(() => {
    // Check if localStorage is available (only in the browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

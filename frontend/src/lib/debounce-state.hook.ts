import { useState, useEffect } from "react";

type HookReturnType<T> = {
  debounced: [T, React.Dispatch<React.SetStateAction<T>>];
  original: T;
};

export const useDebouncedState = <T>(
  initialState: T,
  delay: number,
): HookReturnType<T> => {
  const [state, setState] = useState<T>(initialState);
  const [debouncedState, setDebouncedState] = useState<T>(initialState);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [state, delay]);

  return { debounced: [debouncedState, setState], original: state };
};

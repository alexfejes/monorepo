import { useCallback, useEffect, useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const [lastChanged, setLastChanged] = useState(null);

  useEffect(() => {
    if (count !== initial) setLastChanged(new Date().toLocaleTimeString());
  }, [count, initial]);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, lastChanged, increment, reset };
}

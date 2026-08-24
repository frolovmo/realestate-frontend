import { useState } from "react";

const useCache = () => {
  const [cache, set] = useState<Record<string, string>>({});
  const getCache = (key: string) => {
    return cache[key];
  };
  const setCache = (key: string, value: string) => {
    return set((data) => Object.assign({}, data, { [key]: value }));
  };

  return { getCache, setCache };
};

export default useCache;

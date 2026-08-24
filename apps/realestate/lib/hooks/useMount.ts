import { useEffect, useState } from "react";

const useMount = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount;
};

export default useMount;

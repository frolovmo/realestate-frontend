import { useCallback, useState } from "react";

const useModal = (defaultOpen?: boolean) => {
  const [open, setOpen] = useState(defaultOpen || false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, onOpen, onClose };
};

export default useModal;

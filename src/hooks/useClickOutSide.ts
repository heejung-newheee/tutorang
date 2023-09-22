import { RefObject, useCallback, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, onClose: () => void): void => {
  const handleClick = useCallback(
    (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [ref, onClose],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export default useClickOutside;

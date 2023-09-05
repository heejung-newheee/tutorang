import { ChangeEvent, useCallback, useState } from 'react';

type Data = Record<string, string | number | boolean>;
type Handler = {
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
};

type Reset = {
  (): void;
};

type ReturnTypes = [Data, Handler, Reset];

const useInput = (initialValue: Data): ReturnTypes => {
  const [data, setData] = useState<Data>(initialValue);

  const handler: Handler = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    },
    [data],
  );

  const reset: Reset = useCallback(() => {
    setData(initialValue);
  }, [initialValue]);

  return [data, handler, reset];
};

export default useInput;

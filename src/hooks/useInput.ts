import { useState, useCallback, ChangeEvent } from 'react';

type Data = Record<string, string | number | boolean>;
type Handler = {
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
};

type Reset = {
  (): void;
};

type ReturnTypes = [Data, Handler, Reset];

/** 사용방법 예) input 태그에 name='title' value={title as type} 같은 방식으로 사용해주세요  */
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

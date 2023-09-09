import { Dispatch, SetStateAction } from 'react';

const pageCount = 5;

export const handlePrev = (currentNum: number, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  if (currentNum === 1) return;
  setCurrentNum((pre) => pre - 1);
  setHasPageMore(true);
};

export const handleNext = (currentNum: number, totalPageNum: number | null, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  const num = currentNum * pageCount;
  if (totalPageNum && totalPageNum - num < 0) return;
  if (totalPageNum && totalPageNum - num > 0) {
    setCurrentNum((pre) => pre + 1);
  }

  const nextCurrentNum = currentNum + 1;
  console.log(currentNum, nextCurrentNum);
  console.log(totalPageNum && totalPageNum - nextCurrentNum * pageCount, 'totalPageNum && totalPageNum - nextCurrentNum * pageCount <= 0');
  if (totalPageNum && totalPageNum - nextCurrentNum * pageCount <= 0) {
    // console.log('sfdsfd');
    setHasPageMore(false);
  }
};

export const handleTotalNext = (totalPageNum: number | null, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  const totalCurrent = totalPageNum && totalPageNum / pageCount;
  totalCurrent && setCurrentNum(totalCurrent);
  setHasPageMore(false);
};

export const handleCurrentOne = (setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  setCurrentNum(1);
  setHasPageMore(true);
};

// const handleCurrent = (num: number) => {
//   setCurrentNum(num);
// };

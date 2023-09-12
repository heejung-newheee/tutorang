import { Dispatch, SetStateAction } from 'react';

const pageCount = 5;

export const handlePrev = (currentNum: number, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  if (currentNum === 1) return;
  setCurrentNum((pre) => pre - 1);

  setHasPageMore(true);
};

// export const handleNext = (currentNum: number, totalPageNum: number | null, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
//   const dispatch = useDispatch();
//   const totalPostNum = currentNum * pageCount;

//   if (totalPageNum && totalPageNum < totalPostNum) return;
//   if (totalPageNum && totalPageNum > totalPostNum) {
//     setCurrentNum((pre) => pre + 1);
//     dispatch(setPageNum(currentNum - 1));
//   }

//   const nextCurrentNum = currentNum + 1;
//   if (totalPageNum && totalPageNum <= nextCurrentNum * pageCount) {
//     setHasPageMore(false);
//   }
// };

export const handleTotalNext = (totalPageNum: number | null, setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  if (totalPageNum && totalPageNum <= pageCount) return;
  const totalCurrent = totalPageNum && Math.ceil(totalPageNum / pageCount);
  totalCurrent && setCurrentNum(totalCurrent);
  setHasPageMore(false);
};

export const handleCurrentOne = (setCurrentNum: Dispatch<SetStateAction<number>>, setHasPageMore: Dispatch<SetStateAction<boolean>>) => {
  setCurrentNum(1);
  setHasPageMore(true);
};

export const detailDate = (a: Date) => {
  const milliSeconds = new Date().getTime() - a.getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) {
    const year = a.getFullYear().toString().slice(-2);
    const month = a.getMonth();
    const day = a.getDay();
    return `${year}.${month}.${day}`;
  }
};

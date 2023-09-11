/**
 * 날짜를 입력받아 하루 더하여 반환하는 함수 (YYYY-MM-DD)
 */
export const addOneDayToDate = (dateString: string) => {
  const date = new Date(dateString);

  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return year + '-' + month + '-' + day;
};

/**
 * 시간을 입력받아 현재 시간으로부터 상대적 시간을 반환하는 함수 (방금 전, 1분 전, 1시간 전, 1일 전)
 */
export const calculateTimeDifference = (inputTime: string): string => {
  const inputDate = new Date(inputTime);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - inputDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

  if (timeDifferenceInMinutes < 1) {
    return '방금 전';
  } else if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}분 전`;
  } else if (timeDifferenceInMinutes < 1440) {
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    return `${days}일 전`;
  }
};

/**
 *  ISO 8601 형식의 날짜를 입력받아 현재 언어에 맞는 날짜 텍스트를 반환하는 함수 (2023년 1월 1일)
 */
export const getDateTextFromISODate = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat(navigator.language, options).format(isoDate);
};

// compare is equl two iso date
export const isSameDate = (isoDateString1: string, isoDateString2: string): boolean => {
  const date1 = new Date(isoDateString1);
  const date2 = new Date(isoDateString2);

  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};

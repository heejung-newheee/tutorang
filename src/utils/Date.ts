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

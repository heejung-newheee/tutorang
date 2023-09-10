const useCreateDate = (createTime: string) => {
  if (!createTime) return;

  const nowTime = new Date();
  const createdTime = new Date(createTime);

  const timeDiff = Math.abs(nowTime.getTime() - createdTime.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  let timeMessage = '';

  if (hoursDiff < 1) {
    timeMessage = `방금`;
  } else if (hoursDiff < 24) {
    timeMessage = `${hoursDiff}시간 전`;
  } else {
    const getTime = createTime.split('T')[0];

    const [year, month, day] = getTime.split('-');
    const formattedMonth = Number(month).toString();
    const formattedDay = Number(day).toString();

    const formattedDate = `${year}.${formattedMonth}.${formattedDay}`;

    timeMessage = formattedDate;
  }

  return timeMessage;
};

export default useCreateDate;

const useReviewAverage = (reviewRatings: number[]): number => {
  if (!reviewRatings?.length) {
    return 0;
  }

  let sumReviewRating = 0;

  reviewRatings?.forEach((reviewRating): void => {
    sumReviewRating += reviewRating;
  });

  const result = (sumReviewRating / reviewRatings?.length).toFixed(2);

  return parseFloat(result);
};

export default useReviewAverage;

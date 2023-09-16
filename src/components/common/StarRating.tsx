import { starEmpty, starFull } from '../../assets';

const StarRating = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<img key={i} src={starFull} alt={`Full Star`} />);
    } else {
      stars.push(<img key={i} src={starEmpty} alt={`Empty Star`} />);
    }
  }
  return stars;
};

export default StarRating;

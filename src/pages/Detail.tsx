import { useParams } from 'react-router-dom';
import { Review, StarTutorSlider, TutorInfoDetail } from '../components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/modules';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  if (!id) return;

  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <>
      {/* 튜터데이터 */}
      <TutorInfoDetail id={id} />

      {/* 튜터 리뷰 */}
      <Review id={id} />

      {/* 인기강사 */}
      <StarTutorSlider />
    </>
  );
};
export default Detail;

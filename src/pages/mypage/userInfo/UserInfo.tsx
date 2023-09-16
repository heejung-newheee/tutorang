import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReceivedWriteReviewCount, getWriteReviewCount } from '../../../api/review';
import { icon_edit, icon_location } from '../../../assets';
import { RECEIVED_REVIEW_COUNT, WRITE_REVIEW_COUNT } from '../../../constants/query.constant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { confirmModal } from '../../../redux/modules';
import { Tables, Views } from '../../../supabase/database.types';
import { Container } from '../MyPage.styled';
import * as S from './UserInfo.styled';
interface pageProps {
  match: Views<'matching_tutor_data'>[] | undefined;
  user: Tables<'profiles'>;
}
// const UserInfo = ({match, user}) => {
const UserInfo = ({ match, user }: pageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginUser = useSelector((state: RootState) => state.user.user!);
  const { isConfirm, modalId } = useSelector((state: RootState) => state.modal);

  if (!user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const writeReviewCount = useQuery([WRITE_REVIEW_COUNT, user], () => getWriteReviewCount(user.id), { enabled: !!user });
  const receivedReviewCount = useQuery([RECEIVED_REVIEW_COUNT], () => getReceivedWriteReviewCount(user.id), { enabled: !!user });

  const handleEditProfiles = () => {
    if (!loginUser?.gender) {
      dispatch(confirmModal({ type: 'confirm', message: `소셜로그인 사용자는 추가 정보를 입력해야 합니다. 더 많은 기능을 이용하기 위해 추가정보를 등록하러 가시겠습니까?`, modalId: 'handleEditProfiles' }));
    } else {
      navigate('/edit-profiles');
    }
  };

  const studentMatch = match?.filter((item) => item.user_id === user.id);
  const tutorMatch = match?.filter((item) => item.tutor_id === user.id);

  useEffect(() => {
    if (isConfirm && modalId === 'handleEditProfiles') {
      navigate('/additional-information');
    }
  }, [isConfirm]);

  return (
    <>
      <S.ProfileSection>
        <S.ProfileBox>
          <Container>
            <S.ProfileImg>
              <S.UserImg src={user.cardImage_url ?? ''} alt="user profile" />
              <S.EditBtn onClick={handleEditProfiles}>
                <img src={icon_edit} alt="profile edit button" />
              </S.EditBtn>
            </S.ProfileImg>
            <S.UserName>
              {user.username}
              <span> {user.role}</span>
            </S.UserName>
            <S.TutorLocationBox>
              <img src={icon_location} alt="location icon" /> {user.location1_sido} - {user.location1_gugun} | {user.location2_sido} - {user.location2_gugun}
            </S.TutorLocationBox>
            <S.Summary>
              {user.role === 'tutor' ? (
                <>
                  <S.SummaryItem>
                    <p>{tutorMatch?.filter((matchItem) => matchItem.status === 'complete').length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{tutorMatch?.filter((matchItem) => matchItem.status === 'request').length}개</p>
                    <p>대기 요청</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{receivedReviewCount.data}개</p>
                    <p>나에게 남긴 후기</p>
                  </S.SummaryItem>
                </>
              ) : user.role === 'student' ? (
                <>
                  <S.SummaryItem>
                    <p>{studentMatch?.filter((matchItem) => matchItem.status === 'complete').length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{studentMatch?.filter((matchItem) => matchItem.status === 'request').length}개</p>
                    <p>대기 요청</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{writeReviewCount.data}개</p>
                    <p>내가 남긴 후기</p>
                  </S.SummaryItem>
                </>
              ) : (
                <></>
              )}
            </S.Summary>
          </Container>
        </S.ProfileBox>
      </S.ProfileSection>
    </>
  );
};

export default UserInfo;

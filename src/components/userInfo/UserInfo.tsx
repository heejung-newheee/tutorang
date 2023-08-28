import * as S from './UserInfo.styled';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { getMatchData, matchingTutorData } from '../../api/match';
import { useQuery } from '@tanstack/react-query';
import { icon_edit, icon_location } from '../../assets';
import { openModal } from '../../redux/modules';

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading, isError } = useQuery(['matching_tutor_data'], matchingTutorData);
  console.log('UserInfo 로그인사용자', user);
  console.log('matchData', data);

  if (!user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  const handleEditProfiles = () => {
    dispatch(openModal('editProfiles'));
  };

  return (
    <>
      <S.MypageContainer>
        <S.ProfileBox>
          <S.Container>
            <S.ProfileImg>
              <S.UserImg src={user.avatar_url ?? ''} alt="프로필 이미지" />
              <S.EditBtn onClick={handleEditProfiles}>
                <img src={icon_edit} alt="" />
              </S.EditBtn>
            </S.ProfileImg>
            <S.UserName>
              {user.username}
              <span> {user.role}</span>
            </S.UserName>
            <S.TutorLocationBox>
              <img src={icon_location} alt="" /> {user.location1_sido} | {user.location1_gugun} <img src={icon_location} alt="" /> {user.location2_sido} | {user.location2_gugun}
            </S.TutorLocationBox>
            <S.Summary>
              <S.SummaryItem>
                {/* 매칭 후 데이터 불러와야함 */}
                <p>X개</p>
                <p>완료된 수업</p>
              </S.SummaryItem>
              <S.SummaryItem>
                <p>X개</p>
                <p>대기 요청</p>
              </S.SummaryItem>
              <S.SummaryItem>
                <p>X개</p>
                <p>나에게 남긴 후기</p>
              </S.SummaryItem>
            </S.Summary>
          </S.Container>
        </S.ProfileBox>

        <div style={{ height: '170px' }}></div>
        {data && data.length > 0 ? (
          <>
            <TutorInfo match={data} />
            <StudentInfo match={data} />
          </>
        ) : (
          <div>매칭 데이터가 없습니다.</div>
        )}
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;

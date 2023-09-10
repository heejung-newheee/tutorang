import * as S from './TutorApply.styled';
import { icon_month, icon_more_dashboard, icon_time_dashboard } from '../../../../assets';
import { useQuery } from '@tanstack/react-query';
import { PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY } from '../../../../constants/query.constant';
import { getTutorApplyInfo } from '../../../../api/dashboard';
import { Loading } from '../../..';
import { useState } from 'react';

const TutorApply = () => {
  const { data: tutorApplyList, isLoading, isError, error } = useQuery(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY, getTutorApplyInfo);

  const [openMenuId, setOpenMenuId] = useState(0);

  const handleIsOpen = (_reviewId: number) => {
    setOpenMenuId(_reviewId === openMenuId ? 0 : _reviewId);
  };

  const STATE_MESSAGE = (_state: string) => {
    switch (_state) {
      case 'pending':
        return (
          <>
            <S.PendingDotState /> 진행중
          </>
        );
        break;
      case 'success':
        return (
          <>
            <S.SuccessDotState /> 승인
          </>
        );
        break;
      case 'reject':
        return (
          <>
            <S.RejectDotState /> 거절
          </>
        );
        break;
    }
  };

  const handleChangeSuccess = (_state: string, id: number) => {};

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    return;
  }

  return (
    <S.DashboardItem>
      <S.DashboardTopWrapper>
        <S.DashboardItemTitle>튜터 신청 현황</S.DashboardItemTitle>
        <S.ButtonTimeWrapper>
          <S.IconTime src={icon_time_dashboard} />
          2023.9.9
          <S.IconMonth src={icon_month} />
        </S.ButtonTimeWrapper>
      </S.DashboardTopWrapper>

      <ul>
        {tutorApplyList?.map((tutor) => {
          return (
            <S.TutorList key={tutor.id}>
              <S.UserWrapper>
                <S.Avatar>
                  <S.AvatarImg src={tutor.user_id.avatar_url} />
                </S.Avatar>
                <S.UserName>{tutor.user_id.username}</S.UserName>
              </S.UserWrapper>

              <div>
                <S.StateWrapper onClick={() => handleIsOpen(tutor.id)}>
                  {STATE_MESSAGE(tutor.state)}
                  <S.IconMore src={icon_more_dashboard} />
                </S.StateWrapper>

                <S.moreMenu className={tutor.id === openMenuId ? 'active' : ''}>
                  <S.moreMenuItem
                    onClick={() => {
                      handleIsOpen(tutor.id);
                    }}
                  >
                    승인
                  </S.moreMenuItem>
                  <S.moreMenuItem
                    onClick={() => {
                      handleIsOpen(tutor.id);
                    }}
                  >
                    거절
                  </S.moreMenuItem>
                </S.moreMenu>
              </div>
            </S.TutorList>
          );
        })}
      </ul>
    </S.DashboardItem>
  );
};

export default TutorApply;

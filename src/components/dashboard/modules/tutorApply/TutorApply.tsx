import * as S from './TutorApply.styled';
import { icon_month, icon_more_dashboard, icon_time_dashboard } from '../../../../assets';
import { useQuery } from '@tanstack/react-query';
import { PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY } from '../../../../constants/query.constant';
import { getTutorApplyInfo, useChangeStateTutorApply } from '../../../../api/dashboard';
import { Loading } from '../../..';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/modules';

const TutorApply = () => {
  const { data: tutorApplyList, isLoading, isError, error } = useQuery(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY, getTutorApplyInfo);
  const handleChangeStateTutorApply = useChangeStateTutorApply();

  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(0);

  const handleIsOpen = (_reviewId: number) => {
    setOpenMenuId(_reviewId === openMenuId ? 0 : _reviewId);
  };

  const handleOpenTutorApplyInfo = (tutorId: string) => {
    dispatch(openModal({ type: 'tutorApplyInfo', userId: tutorId }));
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    return null;
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
        {Array.isArray(tutorApplyList) &&
          tutorApplyList?.map((tutor) => {
            return (
              <S.TutorList key={tutor.id}>
                <S.UserWrapper onClick={() => handleOpenTutorApplyInfo(tutor.profiles?.id as string)}>
                  <S.Avatar>
                    <S.AvatarImg src={tutor.profiles?.avatar_url as string} />
                  </S.Avatar>
                  <S.UserName>{tutor.profiles?.username as string}</S.UserName>
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
                        handleChangeStateTutorApply({ state: 'success', id: tutor.id });
                      }}
                    >
                      승인
                    </S.moreMenuItem>
                    <S.moreMenuItem
                      onClick={() => {
                        handleIsOpen(tutor.id);
                        handleChangeStateTutorApply({ state: 'reject', id: tutor.id });
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

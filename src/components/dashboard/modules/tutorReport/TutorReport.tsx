import { useQuery } from '@tanstack/react-query';
import { icon_more_dashboard, icon_time_dashboard } from '../../../../assets';
import * as S from './TutorReport.styled';
import { reportList, useChangeStateTutorReport } from '../../../../api/report';
import { Loading } from '../../..';
import { useState } from 'react';
import { REPORT_DASHBOARD_QUERY_KEY } from '../../../../constants/query.constant';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/modules';

const TutorReport = () => {
  const dispatch = useDispatch();
  const { data: tutorReportList, isLoading, isError, error } = useQuery(REPORT_DASHBOARD_QUERY_KEY, reportList);

  if (Array.isArray(tutorReportList)) {
    tutorReportList.sort((a, b) => b.id - a.id);
  }

  const [openMenuId, setOpenMenuId] = useState(0);

  const chageStateTutorReport = useChangeStateTutorReport();

  const handleIsOpen = (_reviewId: number) => {
    setOpenMenuId(_reviewId === openMenuId ? 0 : _reviewId);
  };

  const handleOpenReport = (reportId: number) => {
    dispatch(openModal({ type: 'dashboardReport', targetId: reportId }));
  };

  const STATE_MESSAGE = (_state: string) => {
    switch (_state) {
      case 'pending':
        return (
          <>
            <S.PendingDotState /> 확인중
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

  const createDate = (createTime: string) => {
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
        <S.DashboardItemTitle>튜터 신고 현황</S.DashboardItemTitle>
        <S.ButtonTime>
          Week <S.IconMoreWeek src={icon_more_dashboard} />
        </S.ButtonTime>
      </S.DashboardTopWrapper>
      <ul>
        {Array.isArray(tutorReportList) &&
          tutorReportList.map((report) => {
            return (
              <S.TutorList key={report.id}>
                <S.UserWrapper>
                  <S.Avatar>
                    <S.AvatarImg src={report.profiles?.avatar_url as string} />
                  </S.Avatar>
                  <S.UserName>{report.profiles?.username}</S.UserName>
                </S.UserWrapper>

                <S.ButtonReportDetail onClick={() => handleOpenReport(report.id)}>신고내역</S.ButtonReportDetail>

                <S.StateMenuWrapper>
                  <S.StateWrapper onClick={() => handleIsOpen(report.id)}>
                    {STATE_MESSAGE(report.state as string)}
                    <S.IconMore src={icon_more_dashboard} />
                  </S.StateWrapper>

                  <S.moreMenu className={report.id === openMenuId ? 'active' : ''}>
                    <S.moreMenuItem
                      onClick={() => {
                        handleIsOpen(report.id);
                        chageStateTutorReport({ state: 'success', id: report.id });
                      }}
                    >
                      승인
                    </S.moreMenuItem>
                    <S.moreMenuItem
                      onClick={() => {
                        handleIsOpen(report.id);
                        chageStateTutorReport({ state: 'reject', id: report.id });
                      }}
                    >
                      거절
                    </S.moreMenuItem>
                  </S.moreMenu>
                </S.StateMenuWrapper>
                <S.TimeWrapper>
                  <S.IconTime src={icon_time_dashboard} />
                  {createDate(report.created_at)}
                </S.TimeWrapper>
              </S.TutorList>
            );
          })}
      </ul>
    </S.DashboardItem>
  );
};

export default TutorReport;

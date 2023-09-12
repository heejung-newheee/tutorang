import { useDispatch, useSelector } from 'react-redux';
import * as S from './Dashboard.styled';
import { RootState } from '../../../redux/config/configStore';
import { useQuery } from '@tanstack/react-query';
import { reportTutor } from '../../../api/report';
import { Loading } from '../..';
import { REPORT_DETAIL_DASHBOARD_QUERY_KEY } from '../../../constants/query.constant';
import { close } from '../../../assets';
import { closeModal } from '../../../redux/modules';

const DashboardReport = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state: RootState) => state.modal);

  console.log(reportData.targetId);

  const { data: reportInfo, isLoading, isError, error } = useQuery(REPORT_DETAIL_DASHBOARD_QUERY_KEY, () => reportTutor(reportData?.targetId as number));

  const handleClose = () => {
    dispatch(closeModal());
  };

  const STATE_MESSAGE = (_state: string) => {
    switch (_state) {
      case 'pending':
        return <>확인중</>;
        break;
      case 'success':
        return <>해결</>;
        break;
      case 'reject':
        return <>거절</>;
        break;
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    console.log(error);
    return null;
  }

  return (
    <S.Overlay>
      <S.Container>
        <S.Inner
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <S.TitleWrapper>
            <S.Title>튜터 신고내역</S.Title>
            <S.ButtonClose onClick={handleClose}>
              <img src={close} />
            </S.ButtonClose>
          </S.TitleWrapper>
          <S.ContentInner>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                신청인 :
              </S.InfoTitle>
              <S.InfoContent>{reportInfo.profiles?.username}</S.InfoContent>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                신고내용 :
              </S.InfoTitle>
              <S.InfoContent>{reportInfo.content}</S.InfoContent>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                신청 상태 :
              </S.InfoTitle>
              <S.InfoContent>
                <S.Badge>{STATE_MESSAGE(reportInfo?.state as string)}</S.Badge>
              </S.InfoContent>
            </S.InfoItem>
          </S.ContentInner>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default DashboardReport;

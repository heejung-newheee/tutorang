import { useDispatch, useSelector } from 'react-redux';
import * as S from './TutorApplyDialog.styled';
import { closeModal } from '../../../redux/modules';
import { close } from '../../../assets';
import { RootState } from '../../../redux/config/configStore';
import { useQuery } from '@tanstack/react-query';
import { getTutorDetailInfo } from '../../../api/dashboard';

const TutorApplyDialog = () => {
  const dispatch = useDispatch();
  const tutorId = useSelector((state: RootState) => state.modal?.userId);
  const { data } = useQuery(['tutorDetailInfo'], () => getTutorDetailInfo(tutorId as string));
  if (!data) return;
  const tutor = data[0];

  const STATE_MESSAGE = (_state: string) => {
    switch (_state) {
      case 'pending':
        return <>진행중</>;
        break;
      case 'success':
        return <>승인</>;
        break;
      case 'reject':
        return <>거절</>;
        break;
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <S.Overlay>
      <S.Container>
        <S.Inner
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <S.TitleWrapper>
            <S.Title>튜터 신청가입 내역확인</S.Title>
            <S.ButtonClose onClick={handleClose}>
              <img src={close} />
            </S.ButtonClose>
          </S.TitleWrapper>
          <S.ContentInner>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                신청 상태 :
              </S.InfoTitle>
              <S.InfoContent>관리자</S.InfoContent>
              <S.InfoContent>
                <S.Badge>{STATE_MESSAGE(tutor?.state)}</S.Badge>
              </S.InfoContent>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                학위,자격 증명서 :
              </S.InfoTitle>
              <ul>
                <li>
                  <figure>
                    <S.CertificateImage src={tutor?.certification_image} />
                  </figure>
                </li>
              </ul>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                성격 :
              </S.InfoTitle>
              <span>
                {tutor?.personality.map((item) => {
                  return <span key={item}>{item}, </span>;
                })}
              </span>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                수업레벨 :
              </S.InfoTitle>
              <S.InfoContent>
                {tutor?.class_level.map((item) => {
                  return <span key={item}>{item}, </span>;
                })}
              </S.InfoContent>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                수업소개 :
              </S.InfoTitle>
              <S.InfoContent>{tutor?.class_info}</S.InfoContent>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoTitle>
                <S.Line />
                수업료 :
              </S.InfoTitle>
              <S.PriceItemList>
                <S.PriceItem>
                  <S.Dot />
                  <span>30분 온라인 수업 - </span>
                  <span>{tutor?.tuition_fee_online}</span>
                </S.PriceItem>
                <S.PriceItem>
                  <S.Dot />
                  <span>30분 오프라인 만남 - </span>
                  <span>{tutor?.tuition_fee_offline}</span>
                </S.PriceItem>
              </S.PriceItemList>
            </S.InfoItem>
          </S.ContentInner>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default TutorApplyDialog;

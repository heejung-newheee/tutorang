import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingTutorRegistInfo } from '../../../api/pendingTutorInfo';
import { close } from '../../../assets';
import { Container } from '../../../components/review/Review.styled';
import { PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import './../../../components/common/icon.css';
import * as S from './RetrievePendingTutorRegistration.style';

const RetrievePendingTutorRegistration = () => {
  const dispatch = useDispatch();
  const handleInternalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  const targetId = useSelector((state: RootState) => state.modal.targetId!);

  const { data: pendingTutorRegistInfo } = useQuery(PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY, () => getPendingTutorRegistInfo(targetId), { enabled: !!targetId });

  const handleOutsideClick = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!pendingTutorRegistInfo) return <div>데이터가 없습니다</div>;

  return (
    <Container>
      <S.Inner onClick={handleOutsideClick}>
        <S.Contents onClick={handleInternalClick}>
          <S.ContentsTitle>
            <h1>튜터변경 신청내역확인</h1>
            <S.ButtonWrapper>
              <button type="button" onClick={handleOutsideClick}>
                <img src={close} />
              </button>
            </S.ButtonWrapper>
          </S.ContentsTitle>
          <S.PartitionLine />
          <S.ContentsBody>
            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>튜터신청 상태</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <p>관리자가 제출된 튜터신청서 검토중</p>
              </S.ContentItemBody>
            </S.ContentsItem>
            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>학위/자격 증명</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <S.CertificateContainer>
                  <p>
                    <span>학교 : {pendingTutorRegistInfo.university}</span> / <span>학과 : {pendingTutorRegistInfo.major}</span> / <span>재학여부 : {pendingTutorRegistInfo.enrollmentStatus}</span>
                  </p>

                  <S.Figure>{pendingTutorRegistInfo.certification_image && <img src={pendingTutorRegistInfo.certification_image} />}</S.Figure>
                </S.CertificateContainer>
              </S.ContentItemBody>
            </S.ContentsItem>

            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>성격</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <S.ContentItemBodyList>{pendingTutorRegistInfo.personality && pendingTutorRegistInfo.personality.map((item: string) => <span key={item}>{item}</span>)}</S.ContentItemBodyList>
              </S.ContentItemBody>
            </S.ContentsItem>

            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>가능언어</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <S.ContentItemBodyList>
                  {pendingTutorRegistInfo.speaking_language.map((item: string) => (
                    <span key={item}>{item}</span>
                  ))}
                </S.ContentItemBodyList>
              </S.ContentItemBody>
            </S.ContentsItem>

            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>수업 level</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <S.ContentItemBodyList>
                  {pendingTutorRegistInfo.class_level.map((item: string) => (
                    <span key={item}>{item}</span>
                  ))}
                </S.ContentItemBodyList>
              </S.ContentItemBody>
            </S.ContentsItem>

            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>수업소개</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <p>{pendingTutorRegistInfo.class_info}</p>
              </S.ContentItemBody>
            </S.ContentsItem>

            <S.ContentsItem>
              <S.ContentsItemTitle>
                <h2>자세한 수업료 기준 (₩/30분)</h2>
              </S.ContentsItemTitle>
              <S.ContentItemBody>
                <p>
                  <span>화상수업 : {pendingTutorRegistInfo.tuition_fee_online}</span> / <span>대면수업 : {pendingTutorRegistInfo.tuition_fee_offline}</span>
                </p>
              </S.ContentItemBody>
            </S.ContentsItem>
          </S.ContentsBody>
        </S.Contents>
      </S.Inner>
    </Container>
  );
};

export default RetrievePendingTutorRegistration;

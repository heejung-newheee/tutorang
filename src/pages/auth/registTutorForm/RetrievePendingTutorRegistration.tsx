import { useQuery } from '@tanstack/react-query';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { getPendingTutorRegistInfo } from '../../../api/pendingTutorInfo';
import { Container } from '../../../components/review/Review.styled';
import { PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import { colors } from '../../../style/theme/colors';
import './../../../components/common/icon.css';

const RetrievePendingTutorRegistration = () => {
  const dispatch = useDispatch();
  const handleInternalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  const targetId = useSelector((state: RootState) => state.modal.targetId!);

  const { data: pendingTutorRegistInfo } = useQuery(PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY, () => getPendingTutorRegistInfo(targetId), { enabled: !!targetId });
  console.log(pendingTutorRegistInfo);

  const handleOutsideClick = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      <Inner onClick={handleOutsideClick}>
        <Contents onClick={handleInternalClick}>
          <ContentsTitle>
            <h1>튜터변경 신청내역확인</h1>
            <ButtonWrapper>
              <button type="button" onClick={handleOutsideClick}>
                <BsXLg className="pending_modal_close_btn" />
              </button>
            </ButtonWrapper>
          </ContentsTitle>
          <PartitionLine />
          <ContentsBody>
            <ContentsItem>
              <ContentsItemTitle>
                <h2>튜터신청 상태</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <p>관리자가 제출된 튜터신청서 검토중</p>
              </ContentItemBody>
            </ContentsItem>
            <ContentsItem>
              <ContentsItemTitle>
                <h2>학위/자격 증명</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <CertificateContainer>
                  {/* <CertificateItem> */}
                  {/* <h3>학교/학과/재학여부</h3> */}
                  <p>
                    <span>학교 : {pendingTutorRegistInfo.university}</span> / <span>학과 : {pendingTutorRegistInfo.major}</span> / <span>재학여부 : {pendingTutorRegistInfo.enrollmentStatus}</span>
                  </p>
                  {/* </CertificateItem> */}
                  {/* <CertificateItem> */}
                  {/* <h3>증명가능 서류</h3> */}
                  <Figure>
                    <img src={pendingTutorRegistInfo.certification_image} />
                  </Figure>
                  {/* </CertificateItem> */}
                </CertificateContainer>
              </ContentItemBody>
            </ContentsItem>

            <ContentsItem>
              <ContentsItemTitle>
                <h2>성격</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <ContentItemBodyList>
                  {pendingTutorRegistInfo.personality.map((item: string) => (
                    <span>{item}</span>
                  ))}
                </ContentItemBodyList>
              </ContentItemBody>
            </ContentsItem>

            <ContentsItem>
              <ContentsItemTitle>
                <h2>가능언어</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <ContentItemBodyList>
                  {pendingTutorRegistInfo.speaking_language.map((item: string) => (
                    <span>{item}</span>
                  ))}
                </ContentItemBodyList>
              </ContentItemBody>
            </ContentsItem>

            <ContentsItem>
              <ContentsItemTitle>
                <h2>수업 level</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <ContentItemBodyList>
                  {pendingTutorRegistInfo.class_level.map((item: string) => (
                    <span>{item}</span>
                  ))}
                </ContentItemBodyList>
              </ContentItemBody>
            </ContentsItem>

            <ContentsItem>
              <ContentsItemTitle>
                <h2>수업소개</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <p>{pendingTutorRegistInfo.class_info}</p>
              </ContentItemBody>
            </ContentsItem>

            <ContentsItem>
              <ContentsItemTitle>
                <h2>자세한 수업료 기준 (₩/30분)</h2>
              </ContentsItemTitle>
              <ContentItemBody>
                <p>
                  <span>화상수업 : {pendingTutorRegistInfo.tuition_fee_online}</span> / <span>대면수업 : {pendingTutorRegistInfo.tuition_fee_offline}</span>
                </p>
              </ContentItemBody>
            </ContentsItem>
          </ContentsBody>
        </Contents>
      </Inner>
    </Container>
  );
};

export default RetrievePendingTutorRegistration;

const Inner = styled.div`
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 150px;
`;

const Contents = styled.div`
  margin: 0 auto;
  width: 500px;
  overflow: hidden;
  border-radius: 18px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  @media screen and (max-width: 420px) {
    width: 320px;
  }
`;

const ContentsTitle = styled.div`
  position: relative;
  padding: 20px 30px 20px;
  & h1 {
    font-size: 20px;
    text-align: center;
  }
  @media screen and (max-width: 420px) {
    padding: 15px 25px 15px;
    & h1 {
      font-size: 17px;
      text-align: center;
    }
  }
`;

const ContentsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const PartitionLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray_200};
`;

const ContentsBody = styled.div`
  padding: 20px 30px;
  height: 480px;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 420px) {
    padding: 20px 25px;
    height: 480px;
    overflow-y: scroll;

    gap: 15px;
  }
`;

const ContentsItemTitle = styled.span`
  padding: 0 10px;
  margin-bottom: 0 0 15px 0;
  font-size: 16px;
  font-weight: 500;
  border-left: 5px solid ${colors.primary};
`;

const ContentItemBody = styled.div`
  padding-left: 15px;
  font-size: 14px;
`;
const ContentItemBodyList = styled.div`
  display: flex;
  gap: 10px;
`;

const CertificateContainer = styled.div``;
// const CertificateItem = styled.div``;
// const Certificate;

const Figure = styled.figure`
  & img {
    max-width: 200px;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  /* top: 21px;
  right: 25px; */
  top: 24px;
  right: 25px;
  @media screen and (max-width: 425px) {
    top: 17px;
  }
`;

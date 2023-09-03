import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { homebuttonlogo } from '../../../assets';
import { SContainer, SPartitionLine } from '../common/AuthForm.styled';
import FormHeader from '../common/FormHeader';
import { FORM_CONSTANT_TITLE_COMPLETE } from '../common/formConstant';

const WelcomeMessagePage = () => {
  const navigate = useNavigate();
  const moveToSigninPage = () => navigate('/signin');
  return (
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_COMPLETE} />
      <SPartitionLine />
      <SWelcomeContainer>
        <SWelcomeHeader>
          <img src={homebuttonlogo} />
        </SWelcomeHeader>
        <SWelcomeBody>
          <BsFillCheckCircleFill className="welcome_icon" />
          <p>회원신청이 완료되었습니다</p>
          <p>등록하신 이메일로 가서 최종 회원가입 승인링크를 클릭해주세요!</p>
        </SWelcomeBody>
        <SWelcomeButton type="button" onClick={moveToSigninPage}>
          로그인하러 가기
        </SWelcomeButton>
      </SWelcomeContainer>
    </SContainer>
  );
};

export default WelcomeMessagePage;

const SWelcomeContainer = styled.div`
  box-sizing: border-box;
  padding: 40px 0;
  margin: 0 auto;
  width: 570px;
  height: 680px;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    width: 320px;
    height: 400px;
  }
`;

const SWelcomeHeader = styled.header`
  /* background-color: #f5f5f5; */
  background-color: #f5f5f5;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 134px;
  }
  border-bottom: 1.5px solid #ffd0a8;
  @media screen and (max-width: 420px) {
    height: 70px;
    & img {
      width: 100px;
    }
  }
`;

const SWelcomeBody = styled.div`
  background-color: #f5f5f5;
  height: 400px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  & p {
    color: #585858;
  }
  @media screen and (max-width: 420px) {
    height: 240px;
    padding-top: 54px;
    & p {
      font-size: 14px;
      color: #585858;
      padding: 0 45px;
      text-align: center;
    }
  }
`;

const SWelcomeButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  background-color: #fe902f;
  color: #fff;
  border-radius: 0 0 3px 3px;
`;

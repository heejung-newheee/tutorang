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
`;

const SWelcomeBody = styled.div`
  background-color: #f5f5f5;
  height: 400px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding-top: 120px;
  gap: 10px;
  & p {
    color: #585858;
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

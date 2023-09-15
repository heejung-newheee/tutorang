import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { logo04 } from '../../../assets';
import { SContainer, SPartitionLine } from '../../../components/Form/AuthForm.styled';
import FormHeader from '../../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_COMPLETE } from '../../../constants/formConstant';
import * as S from './WelcomeMessagePage.style';

const WelcomeMessagePage = () => {
  const navigate = useNavigate();
  const moveToSigninPage = () => navigate('/signin');
  return (
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_COMPLETE} />
      <SPartitionLine />
      <S.WelcomeContainer>
        <S.WelcomeHeader>
          <img src={logo04} />
        </S.WelcomeHeader>
        <S.WelcomeBody>
          <BsFillCheckCircleFill className="welcome_icon" />
          <p>회원신청이 완료되었습니다</p>
          <p>등록하신 이메일로 가서 최종 회원가입 승인링크를 클릭해주세요!</p>
        </S.WelcomeBody>
        <S.WelcomeButton type="button" onClick={moveToSigninPage}>
          로그인하러 가기
        </S.WelcomeButton>
      </S.WelcomeContainer>
    </SContainer>
  );
};

export default WelcomeMessagePage;

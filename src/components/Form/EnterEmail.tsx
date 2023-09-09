import { useEffect, useRef } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { styled } from 'styled-components';
import supabase from '../../supabase';

type TypeEnterEmailProps = {
  $setDuplicatedEmail: React.Dispatch<React.SetStateAction<boolean>>;
  $setDoneDuplicationCheck: React.Dispatch<React.SetStateAction<boolean>>;
  $setEmail: React.Dispatch<React.SetStateAction<string>>;
  $email: string;
  $validEmail: boolean;
  $duplicatedEmail: boolean;
  $doneDuplicationCheck: boolean;
};

const EnterEmail: React.FC<TypeEnterEmailProps> = ({ $setDuplicatedEmail, $setDoneDuplicationCheck, $setEmail, $email, $validEmail, $duplicatedEmail, $doneDuplicationCheck }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current!.focus();
  }, []);

  const duplicationCheck = async (unverifiedEmail: string) => {
    const { data: profiles, error } = await supabase.from('profiles').select('email');
    const myEmailFromDB = profiles?.find((profile) => {
      return profile.email === unverifiedEmail;
    });
    const isMyEmailHere = myEmailFromDB === undefined ? false : true;
    $setDuplicatedEmail(isMyEmailHere);
    $setDoneDuplicationCheck(true);

    console.log(error?.message);
  };

  const deleteEmail = () => {
    $setEmail('');
    if (emailRef.current) {
      emailRef.current.value = '';
    }
  };

  return (
    <>
      <label htmlFor="email">이메일</label>
      <SEmailInputWrapper>
        <SInput type="text" id="email" ref={emailRef} autoComplete="off" onChange={(e) => $setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
        {$email && (
          <ResetButton type="button" onClick={deleteEmail}>
            <BsXCircleFill className="reset_input_btn" />
          </ResetButton>
        )}
        <SEmailButton type="button" disabled={!$email || !$validEmail} onClick={() => duplicationCheck($email)}>
          중복확인
        </SEmailButton>
      </SEmailInputWrapper>
      <SGuideMessage $guideMessageColor={'안내'} style={{ display: 'flex', alignContent: 'center', height: '18px', lineHeight: '18px' }}>
        <span style={{ width: '18px', height: '18px', padding: '3px 0' }}>
          <FaInfoCircle className="info_icon" />
        </span>
        <p>해당 이메일로 회원가입 승인메일이 전송됩니다.</p>
      </SGuideMessage>
      <SGuideMessage $guideMessageColor={!$duplicatedEmail ? '확인' : ''}>
        {!!$email && !$validEmail && '이메일 형식으로 입력해주세요'}
        {!!$email && $validEmail && $doneDuplicationCheck && $duplicatedEmail && '이미 가입된 이메일 입니다. 새로운 이메일을 입력하세요'}
        {!!$email && $validEmail && $doneDuplicationCheck && !$duplicatedEmail && '입력된 이메일을 사용할 수 있습니다!'}
      </SGuideMessage>
    </>
  );
};

export default EnterEmail;

const SInput = styled.input<{ id?: string }>`
  box-sizing: border-box;
  width: 100%;
  min-width: ${({ id }) => {
    if (id === 'email') {
      return '220px';
    } else {
      return '320px';
    }
  }};
  width: 100%;
  height: 50px;
  font-size: 16px;
  vertical-align: middle;
  border: 1px solid #696969;
  border-radius: 3px;
  color: #000;
  padding: ${({ id }) => {
    if (id === 'email' || id === 'confirm_pwd' || id === 'password') {
      return '5px 50px 5px 12px';
    } else {
      return '5px 12px 5px 12px';
    }
  }};

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
    padding: ${({ id }) => {
      if (id === 'email' || id === 'confirm_pwd' || id === 'password') {
        return '5px 40px 5px 12px';
      } else {
        return '5px 12px 5px 12px';
      }
    }};
  }
`;

const SGuideMessage = styled.div<{ $guideMessageColor?: string }>`
  min-width: 10px;
  height: 18px;
  display: flex;
  font-size: 12px;
  color: ${({ $guideMessageColor }) => {
    if ($guideMessageColor === '확인') {
      return '#1b7b18';
    } else if ($guideMessageColor === '안내') {
      return '#696969';
    } else {
      return '#d71f1f';
    }
  }};
`;

const SEmailInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 320px;
  @media screen and (max-width: 420px) {
    min-width: 220px;
  }
`;

const SEmailButton = styled.button<{ disabled: boolean }>`
  min-width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  border-radius: 3px;
  background-color: ${({ disabled }) => {
    if (disabled) {
      return '#fe902f57';
    } else {
      return '#FE902F';
    }
  }};
  color: #fff;
  cursor: ${({ disabled }) => {
    if (disabled) {
      return 'default';
    } else {
      return 'pointer';
    }
  }};
  @media screen and (max-width: 420px) {
    min-width: 90px;
    height: 45px;
    line-height: 45px;
  }
`;

const ResetButton = styled.button`
  position: absolute;
  right: 136px;
  top: 18px;
  z-index: 2;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  font-size: 16px;
  .reset_input_btn {
    fill: #cdcdcd;
  }
  &:hover {
    cursor: pointer;
    .reset_input_btn:hover {
      fill: #696969;
    }
  }
  &:focus {
    .reset_input_btn:hover {
      fill: #696969;
    }
  }
  @media screen and (max-width: 420px) {
    right: 115px;
    top: 15.5px;
    font-size: 15px;
  }
`;

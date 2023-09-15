import { useEffect, useRef } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import supabase from '../../supabase';
import * as S from './EnterEmail.style';

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

    console.error(error?.message);
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
      <S.EmailInputWrapper>
        <S.Input type="text" id="email" ref={emailRef} autoComplete="off" onChange={(e) => $setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
        {$email && (
          <S.ResetButton type="button" onClick={deleteEmail}>
            <BsXCircleFill className="reset_input_btn" />
          </S.ResetButton>
        )}
        <S.EmailButton type="button" disabled={!$email || !$validEmail} onClick={() => duplicationCheck($email)}>
          중복확인
        </S.EmailButton>
      </S.EmailInputWrapper>
      <S.GuideMessage $guideMessageColor={'안내'} style={{ display: 'flex', alignContent: 'center', height: '18px', lineHeight: '18px' }}>
        <span style={{ width: '18px', height: '18px', padding: '3px 0' }}>
          <FaInfoCircle className="info_icon" />
        </span>
        <p>해당 이메일로 회원가입 승인메일이 전송됩니다.</p>
      </S.GuideMessage>
      <S.GuideMessage $guideMessageColor={!$duplicatedEmail ? '확인' : ''}>
        {!!$email && !$validEmail && '이메일 형식으로 입력해주세요'}
        {!!$email && $validEmail && $doneDuplicationCheck && $duplicatedEmail && '이미 가입된 이메일 입니다. 새로운 이메일을 입력하세요'}
        {!!$email && $validEmail && $doneDuplicationCheck && !$duplicatedEmail && '입력된 이메일을 사용할 수 있습니다!'}
      </S.GuideMessage>
    </>
  );
};

export default EnterEmail;

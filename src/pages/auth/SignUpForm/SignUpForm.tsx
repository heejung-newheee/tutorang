import { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import EnterEmail from '../../../components/Form/EnterEmail';
import FormHeader from '../../../components/Form/FormHeader';
import GenderRadiobox from '../../../components/Form/GenderRadiobox';
import SelectBirth from '../../../components/Form/SelectBirth';
import SelectLocation from '../../../components/Form/SelectLocation';
import ServiceAgreement from '../../../components/Form/ServiceAgreement';
import '../../../components/Form/icon.css';
import '../../../components/Form/inputBackgroundSetting.css';
import { EMAIL_REGEX, FORM_CONSTANT_TITLE_SIGNUP, PWD_REGEX, USERNAME_EN_REGEX, USERNAME_KR_REGEX } from '../../../constants/formConstant';
import supabase from '../../../supabase';

const SignUpForm = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isMatchPwHidden, setIsMatchPwHidden] = useState(true);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [duplicatedEmail, setDuplicatedEmail] = useState(true);
  const [doneDuplicationCheck, setDoneDuplicationCheck] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [checkedGender, setCheckedGender] = useState({ female: false, male: false });
  const [validGender, setValidGender] = useState(false);

  const [location, setLoaction] = useState({ sido1: '시/도 선택', gugun1: '구/군 선택', sido2: '시/도 선택', gugun2: '구/군 선택' });
  const [validLocation, setValidLocation] = useState(false);

  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [validBirth, setValidBirth] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    setDoneDuplicationCheck(false);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = USERNAME_KR_REGEX.test(username) || USERNAME_EN_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const checkedValidBirth = !!birth.year && !!birth.month && !!birth.day;
    setValidBirth(checkedValidBirth);
  }, [birth]);

  useEffect(() => {
    const checkedValidGender = checkedGender.female === true || checkedGender.male === true;
    setValidGender(checkedValidGender);
  }, [checkedGender]);

  useEffect(() => {
    const checkedValidLocation1 = location.sido1 !== '시/도 선택' && location.sido1 !== '전체' && location.gugun1 !== '구/군 선택' && location.gugun1 !== '전체';
    const checkedValidLocation2 = location.sido2 !== '시/도 선택' && location.sido2 !== '전체' && location.gugun2 !== '구/군 선택' && location.gugun2 !== '전체';
    const checkedSameLocation = location.sido1 === location.sido2 && location.gugun1 === location.gugun2;
    setValidLocation(checkedValidLocation1 && checkedValidLocation2 && !checkedSameLocation);
  }, [location]);

  const now = new Date();

  const calculateAge = () => {
    const thisYear = now.getFullYear();
    const thisMonth = now.getMonth() + 1;
    const thisDay = now.getDate();
    const ageAfterBirthDate = thisYear - +birth.year;
    if (thisMonth >= +birth.month && thisDay >= +birth.day) {
      return ageAfterBirthDate;
    } else {
      return ageAfterBirthDate - 1;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validEmail || !validPwd || !validMatch || !validUsername || !validBirth || !validGender || !validLocation || !doneDuplicationCheck || duplicatedEmail || !isAllChecked) {
      alert('모든 항목이 입력되었는지 다시 한 번 확인해주세요!');
      return false;
    }

    let gender = '';
    if (checkedGender.male !== checkedGender.female && checkedGender.male === true) gender = '남성';
    else if (checkedGender.male !== checkedGender.female && checkedGender.female === true) gender = '여성';
    const age = calculateAge();
    const trimmedBirth = birth.year + '-' + birth.month + '-' + birth.day;

    const formData = {
      username,
      birth: trimmedBirth,
      age,
      gender,
      location1_sido: location.sido1,
      location1_gugun: location.gugun1,
      location2_sido: location.sido2,
      location2_gugun: location.gugun2,
      role: 'student',
      avatar_url:
        'https://rkirhzqybhsglryysdso.supabase.co/storage/v1/object/sign/avatars/default_profile.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2RlZmF1bHRfcHJvZmlsZS5wbmciLCJpYXQiOjE2OTMyNDM2OTUsImV4cCI6MTcyNDc3OTY5NX0.KRdjhdXKjTM1GbM_7KPyU-GSspnWID29bEjWwQvg83s&t=2023-08-28T17%3A28%3A17.316Z',
    };

    const { data } = await supabase.auth.signUp({
      email: email,
      password: pwd,
      options: {
        data: {
          role: 'student',
        },
      },
    });
    if (data && data.user) {
      const { error } = await supabase.from('profiles').update(formData).eq('id', data.user.id);
      if (error) {
        console.error(error);
        console.warn(error);
        alert('회원가입 실패');
      } else {
        navigate('/welcome-to-tutorang');
      }
    }
  };
  let isHereguidemessage = '';
  if (location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2) {
    isHereguidemessage = '중복 지역선택 불가';
  } else if (location.sido1 === '전체' || location.sido2 === '전체' || location.gugun1 === '전체' || location.gugun2 === '전체') {
    isHereguidemessage = '지역1, 지역2 모두 특정지역 선택 필수';
  }
  return (
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_SIGNUP} />
      <SPartitionLine />
      <SFormContainer>
        <SForm onSubmit={handleSubmit}>
          <SUnderForm>
            <SFormItem>
              <EnterEmail
                $setDuplicatedEmail={setDuplicatedEmail}
                $setDoneDuplicationCheck={setDoneDuplicationCheck}
                $setEmail={setEmail}
                $email={email}
                $validEmail={validEmail}
                $duplicatedEmail={duplicatedEmail}
                $doneDuplicationCheck={doneDuplicationCheck}
              />
            </SFormItem>

            <SFormItem>
              <SpasswordLabel htmlFor="password" style={{ position: 'relative' }}>
                <SFormItemTitle>비밀번호</SFormItemTitle>
                <SInput
                  type={isPasswordHidden ? 'password' : 'text'}
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  $color={pwdFocus && !!pwd && !validPwd}
                  $noFocusedColor={!!pwd && !validPwd}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="off"
                />
                {pwd && !isPasswordHidden && <BsFillEyeFill className="password_show_hidden_button pw_button_shown_color" onClick={() => setIsPasswordHidden(true)} />}
                {pwd && isPasswordHidden && <BsFillEyeSlashFill className="password_show_hidden_button pw_button_hidden_color" onClick={() => setIsPasswordHidden(false)} />}
              </SpasswordLabel>
              <SPGuideMessage>{!!pwd && !validPwd && '소문자, 숫자, 특수문자(!@#$%)를 모두 포함하여 6자 이상 24자 이하의 비밀번호를 입력해주세요'}</SPGuideMessage>
            </SFormItem>

            <SFormItem>
              <SpasswordLabel htmlFor="confirm_pwd" style={{ position: 'relative' }}>
                <SFormItemTitle>비밀번호 확인</SFormItemTitle>
                <SInput
                  type={isMatchPwHidden ? 'password' : 'text'}
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  $color={matchFocus && !!matchPwd && !validMatch}
                  $noFocusedColor={!!matchPwd && !validMatch}
                  placeholder="비밀번호 확인 입력하세요"
                  autoComplete="off"
                />
                {matchPwd && !isMatchPwHidden && <BsFillEyeFill className="password_show_hidden_button pw_button_shown_color" onClick={() => setIsMatchPwHidden(true)} />}
                {matchPwd && isMatchPwHidden && <BsFillEyeSlashFill className="password_show_hidden_button pw_button_hidden_color" onClick={() => setIsMatchPwHidden(false)} />}
              </SpasswordLabel>

              <SPGuideMessage>{!!matchPwd && !validMatch && '처음에 입력한 비밀번호와 동일해야합니다.'}</SPGuideMessage>
            </SFormItem>

            <SFormItem>
              <label htmlFor="username">
                <SFormItemTitle>이름</SFormItemTitle>
              </label>
              <SInput
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                $color={usernameFocus && !!username && !validUsername}
                $noFocusedColor={!!username && !validUsername}
                placeholder="실명을 입력하세요"
                autoComplete="off"
              />
              <SPGuideMessage>{!!username && !validUsername && '2자 이상 6자미만의 한국실명 또는 2자이상 20자 미만의 영문실명을 입력하세요.'}</SPGuideMessage>
            </SFormItem>

            <SFormItem style={{ marginBottom: '23px' }}>
              <SFormItemTitle>생년월일</SFormItemTitle>
              <SelectBirth $setBirth={setBirth} />
            </SFormItem>

            <SFormItem style={{ marginBottom: '23px' }}>
              <SFormItemTitle>성별</SFormItemTitle>
              <GenderRadiobox $checkedGender={checkedGender} $setCheckedGender={setCheckedGender} />
            </SFormItem>

            <SFormItem>
              <SFormItemHeader>
                <SFormItemTitle>활동선호지역</SFormItemTitle>
                <SPGuideMessage>{isHereguidemessage !== '' && isHereguidemessage}</SPGuideMessage>
              </SFormItemHeader>

              <SFormItemBody>
                <SFormItemBodySection>
                  <span>지역1</span>
                  <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} />
                </SFormItemBodySection>
                <SFormItemBodySection>
                  <span>지역2</span>
                  <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} />
                </SFormItemBodySection>
              </SFormItemBody>
            </SFormItem>
          </SUnderForm>

          <SPartitionLine />

          <ServiceAgreement $setIsAllChecked={setIsAllChecked} />

          <SUnderFormSubmitButtonContainer>
            <SButton type="submit" disabled={!validEmail || !validPwd || !validMatch || !validUsername || !validBirth || !validGender || !validLocation || !doneDuplicationCheck || duplicatedEmail || !isAllChecked ? true : false}>
              가입완료
            </SButton>
          </SUnderFormSubmitButtonContainer>
        </SForm>
      </SFormContainer>
    </SContainer>
  );
};
export default SignUpForm;

const SContainer = styled.div``;

const SPartitionLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  & p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    & span {
      background-color: #fff;
    }
  }
`;

const SFormContainer = styled.div``;

const SForm = styled.form`
  box-sizing: border-box;
  padding: 40px 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 420px) {
    padding: 30px 0px;
  }
`;

const SUnderForm = styled.div`
  box-sizing: border-box;
  padding: 0px 20px 80px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 12px;
`;

const SpasswordLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SInput = styled.input<{ $color: boolean; $noFocusedColor: boolean; id?: string }>`
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
      return '5px 40px 5px 12px';
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
  }
`;

const SUnderFormSubmitButtonContainer = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 0 20px;
`;

const SButton = styled.button<{ disabled: boolean }>`
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};

  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  border-radius: 3px;
  font-size: 16px;
`;

const SFormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
`;

const SPGuideMessage = styled.p<{ $guideMessageColor?: string }>`
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

const SFormItemBody = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;
`;

const SFormItemBodySection = styled.section`
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SFormItemTitle = styled.span``;

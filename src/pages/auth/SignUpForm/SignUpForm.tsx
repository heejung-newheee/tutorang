import { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EnterEmail from '../../../components/Form/EnterEmail';
import FormHeader from '../../../components/Form/FormHeader';
import GenderRadiobox from '../../../components/Form/GenderRadiobox';
import SelectBirth from '../../../components/Form/SelectBirth';
import SelectLocation from '../../../components/Form/SelectLocation';
import ServiceAgreement from '../../../components/Form/ServiceAgreement';
import '../../../components/Form/icon.css';
import '../../../components/Form/inputBackgroundSetting.css';
import { EMAIL_REGEX, FORM_CONSTANT_TITLE_SIGNUP, PWD_REGEX, USERNAME_EN_REGEX, USERNAME_KR_REGEX } from '../../../constants/formConstant';
import { AppDispatch } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import supabase from '../../../supabase';
import * as S from './SignUpForm.style';

const SignUpForm = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isMatchPwHidden, setIsMatchPwHidden] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const [checkedGender, setCheckedGender] = useState('');
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
    setValidGender(!!checkedGender);
  }, [checkedGender]);

  useEffect(() => {
    const checkedValidLocation1 = location.sido1 !== '시/도 선택' && location.gugun1 !== '구/군 선택';
    const checkedValidLocation2 = location.sido2 !== '시/도 선택' && location.gugun2 !== '구/군 선택';
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
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '모든 항목이 입력되었는지 다시 한 번 확인해주세요!' }));

      return false;
    }

    const age = calculateAge();
    const trimmedBirth = birth.year + '-' + birth.month + '-' + birth.day;

    const formData = {
      username,
      birth: trimmedBirth,
      age,
      gender: checkedGender,
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

        dispatch(displayToastAsync({ id: Date.now(), type: 'danger', message: '회원가입 과정에서 문제가 발생했습니다. 고객센터로 문의주세요!' }));
      } else {
        navigate('/welcome-to-tutorang');
      }
    }
  };
  let isHereguidemessage = '';
  if (location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2) {
    isHereguidemessage = '중복 지역선택 불가';
  } else if (location.sido1 === '시/도 선택' || location.sido2 === '시/도 선택' || location.gugun1 === '구/군 선택' || location.gugun2 === '구/군 선택') {
    isHereguidemessage = '지역1, 지역2 모두 특정지역 선택 필수';
  }
  return (
    <S.Container>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_SIGNUP} />
      <S.PartitionLine />
      <S.FormContainer>
        <S.Form onSubmit={handleSubmit}>
          <S.UnderForm>
            <S.FormItem>
              <EnterEmail
                $setDuplicatedEmail={setDuplicatedEmail}
                $setDoneDuplicationCheck={setDoneDuplicationCheck}
                $setEmail={setEmail}
                $email={email}
                $validEmail={validEmail}
                $duplicatedEmail={duplicatedEmail}
                $doneDuplicationCheck={doneDuplicationCheck}
              />
            </S.FormItem>

            <S.FormItem>
              <S.PasswordLabel htmlFor="password">
                <S.FormItemTitle>비밀번호</S.FormItemTitle>
                <S.Input
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
                {isPasswordHidden ? (
                  <S.PasswordEyeButton type="button" onClick={() => setIsPasswordHidden(false)}>
                    <BsFillEyeSlashFill className="pw_button_hidden_color" />
                  </S.PasswordEyeButton>
                ) : (
                  <S.PasswordEyeButton type="button" onClick={() => setIsPasswordHidden(true)}>
                    <BsFillEyeFill className="pw_button_shown_color" />
                  </S.PasswordEyeButton>
                )}
              </S.PasswordLabel>
              <S.PGuideMessage>{!!pwd && !validPwd && '문자, 숫자, 특수문자(!@#$%) 포함, 6자 이상의 비밀번호'}</S.PGuideMessage>
            </S.FormItem>

            <S.FormItem>
              <S.PasswordLabel htmlFor="confirm_pwd">
                <S.FormItemTitle>비밀번호 확인</S.FormItemTitle>
                <S.Input
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
                {isMatchPwHidden ? (
                  <S.PasswordEyeButton type="button" onClick={() => setIsMatchPwHidden(false)}>
                    <BsFillEyeSlashFill className=" pw_button_hidden_color" />
                  </S.PasswordEyeButton>
                ) : (
                  <S.PasswordEyeButton type="button" onClick={() => setIsMatchPwHidden(true)}>
                    <BsFillEyeFill className=" pw_button_shown_color" />
                  </S.PasswordEyeButton>
                )}
              </S.PasswordLabel>

              <S.PGuideMessage>{!!matchPwd && !validMatch && '처음에 입력한 비밀번호와 동일해야합니다.'}</S.PGuideMessage>
            </S.FormItem>

            <S.FormItem>
              <label htmlFor="username">
                <S.FormItemTitle>이름</S.FormItemTitle>
              </label>
              <S.Input
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
              <S.PGuideMessage>{!!username && !validUsername && '2자 이상 6자 미만의 한국실명 / 2자이상 20자 미만의 영문실명'}</S.PGuideMessage>
            </S.FormItem>

            <S.FormItem className="mar23">
              <S.FormItemTitle>생년월일</S.FormItemTitle>
              <SelectBirth $setBirth={setBirth} />
            </S.FormItem>

            <S.FormItem className="mar23">
              <S.FormItemTitle>성별</S.FormItemTitle>
              <GenderRadiobox $checkedGender={checkedGender} $setCheckedGender={setCheckedGender} />
            </S.FormItem>

            <S.FormItem>
              <S.FormItemHeader>
                <S.FormItemTitle>활동선호지역</S.FormItemTitle>
              </S.FormItemHeader>

              <S.FormItemBody>
                <S.FormItemBodySection>
                  <span>지역1</span>
                  <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} />
                </S.FormItemBodySection>
                <S.FormItemBodySection>
                  <span>지역2</span>
                  <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} />
                </S.FormItemBodySection>
              </S.FormItemBody>
              <S.PGuideMessage>{isHereguidemessage !== '' && isHereguidemessage}</S.PGuideMessage>
            </S.FormItem>
          </S.UnderForm>

          <S.PartitionLine />

          <ServiceAgreement $setIsAllChecked={setIsAllChecked} />

          <S.UnderFormSubmitButtonContainer>
            <S.Button type="submit" disabled={!validEmail || !validPwd || !validMatch || !validUsername || !validBirth || !validGender || !validLocation || !doneDuplicationCheck || duplicatedEmail || !isAllChecked ? true : false}>
              가입완료
            </S.Button>
          </S.UnderFormSubmitButtonContainer>
        </S.Form>
      </S.FormContainer>
    </S.Container>
  );
};
export default SignUpForm;

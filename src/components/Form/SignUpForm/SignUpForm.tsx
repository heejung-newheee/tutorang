import { useEffect, useRef, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill, BsXCircleFill } from 'react-icons/bs';
import { FaAngleDown, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import supabase from '../../../supabase';
import FormHeader from '../common/FormHeader';
import SelectLocation from '../common/SelectLocation';
import { FORM_CONSTANT_TITLE_SIGNUP } from '../common/formConstant';
import './../common/icon.css';
import './../common/inputBackgroundSetting.css';
import ServiceAgreement from './ServiceAgreement';

const USERNAME_KR_REGEX = /^[가-힣|]{2,6}$/;
const USERNAME_EN_REGEX = /^[a-z|A-Z|+\s]{2,20}$/;
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

const SignUpForm = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isMatchPwHidden, setIsMatchPwHidden] = useState(true);

  const emailRef = useRef<HTMLInputElement>(null);
  // const errRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // doneDuplicationCheck얘는 useEffect dependency가 email일 때 false되도록.
  // 중복확인했을 때 다시 true되도록
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

  // const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false)

  const [checkedGender, setCheckedGender] = useState({ female: false, male: false });
  const [validGender, setValidGender] = useState(false);

  // const [location1, setLoaction1] = useState({ sido1: '시/도 선택', gugun1: '구/군 선택' });
  // const [location2, setLoaction2] = useState({ sido2: '시/도 선택', gugun2: '구/군 선택' });
  const [location, setLoaction] = useState({ sido1: '시/도 선택', gugun1: '구/군 선택', sido2: '시/도 선택', gugun2: '구/군 선택' });
  const [validLocation, setValidLocation] = useState(false);

  const now = new Date();

  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [validBirth, setValidBirth] = useState(false);

  const [isDateOpen, setIsDateOpen] = useState({
    year: false,
    month: false,
    day: false,
  });

  const duplicationCheck = async (unverifiedEmail: string) => {
    // unverifiedEmail 을 supabase의 db 에서 확인
    const { data: profiles, error } = await supabase.from('profiles').select('email');
    const myEmailFromDB = profiles?.find((profile) => {
      return profile.email === unverifiedEmail;
    });
    const isMyEmailHere = myEmailFromDB === undefined ? false : true;
    console.log('????????', isMyEmailHere);
    setDuplicatedEmail(isMyEmailHere);
    setDoneDuplicationCheck(true);

    console.log(error?.message);
  };

  const deleteEmail = () => {
    setEmail('');
    if (emailRef.current) {
      emailRef.current.value = '';
    }
  };

  const birthYearOptions = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    birthYearOptions.push(y);
  }

  // 월, 일 2자리
  const birthMonthOptions = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      birthMonthOptions.push('0' + m.toString());
    } else {
      birthMonthOptions.push(m.toString());
    }
  }

  const birthDayOptions = [];
  const date = new Date(+birth.year, +birth.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      birthDayOptions.push('0' + d.toString());
    } else {
      birthDayOptions.push(d.toString());
    }
  }

  const genderChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedGender.male !== checkedGender.female && event.target.name === 'female') setCheckedGender((prev) => ({ male: !prev.male, female: !prev.female }));
    if (checkedGender.male === checkedGender.female && event.target.name === 'female') setCheckedGender((prev) => ({ ...prev, female: true }));
    if (checkedGender.male !== checkedGender.female && event.target.name === 'male') setCheckedGender((prev) => ({ male: !prev.male, female: !prev.female }));
    if (checkedGender.male === checkedGender.female && event.target.name === 'male') setCheckedGender((prev) => ({ ...prev, male: true }));
    console.log(event.target.value);
  };

  useEffect(() => {
    emailRef.current!.focus();
  }, []);

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

  // useEffect(() => {
  //   setErrMsg('');
  // }, [email, pwd, matchPwd]);

  useEffect(() => {
    const checkedValidBirth = !!birth.year && !!birth.month && !!birth.day;
    setValidBirth(checkedValidBirth);
  }, [birth]);

  useEffect(() => {
    const checkedValidGender = checkedGender.female === true || checkedGender.male === true;
    setValidGender(checkedValidGender);
  }, [checkedGender]);

  useEffect(() => {
    const checkedValidLocation1 = location.sido1 !== '시/도 선택' && location.sido1 !== '전체' && location.gugun1 !== '구/군 선택';
    const checkedValidLocation2 = location.sido2 !== '시/도 선택' && location.sido2 !== '전체' && location.gugun2 !== '구/군 선택';
    const checkedSameLocation = location.sido1 === location.sido2 && location.gugun1 === location.gugun2;
    setValidLocation(checkedValidLocation1 && checkedValidLocation2 && !checkedSameLocation);
  }, [location]);

  const selectDateOption = (value: string, dateType: string) => {
    console.log(value, dateType);
    if (dateType === 'year') {
      setBirth((prev) => ({ ...prev, year: value }));
      setIsDateOpen((prev) => ({ ...prev, year: !prev.year }));
    }
    if (dateType === 'month') {
      setBirth((prev) => ({ ...prev, month: value }));
      setIsDateOpen((prev) => ({ ...prev, month: !prev.month }));
    }
    if (dateType === 'day') {
      setBirth((prev) => ({ ...prev, day: value }));
      setIsDateOpen((prev) => ({ ...prev, day: !prev.day }));
    }
  };

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
    //만나이 계산

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

    // TODO 아래 식이 DB에 넘기는 단계 => 아래식 거치기 전에 회원정보 입력할 수 있어야함.
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
        console.log(error);
        alert('회원가입 실패');
      } else {
        alert('입력했던 이메일로가서 인증을 완료하면 로그인이 가능합니다! 지금바로 확인하시기 바랍니다!');
        navigate('/signin');
      }
    }
  };
  return (
    <SContainer>
      {/* {errMsg && <p ref={errRef}>{errMsg}</p>} */}
      <FormHeader $keyword={FORM_CONSTANT_TITLE_SIGNUP} />
      <SPartitionLine />
      <SFormContainer>
        <SForm onSubmit={handleSubmit}>
          <SUnderForm>
            {/* [x] 이메일 작성란 */}
            <SFormItem>
              <label htmlFor="email">이메일</label>
              <SEmailInputWrapper>
                <SInput
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  $color={emailFocus && !!email && !validEmail}
                  $noFocusedColor={!!email && !validEmail}
                  placeholder="이메일을 입력하세요"
                />
                {/* email */}
                <SEmailButton type="button" disabled={!email || !validEmail} onClick={() => duplicationCheck(email)}>
                  중복확인
                </SEmailButton>
                {email && <BsXCircleFill className="reset_input_btn" onClick={deleteEmail} />}
              </SEmailInputWrapper>
              <SPGuideMessage $guideMessageColor={'안내'}>
                <FaInfoCircle style={{ marginRight: '5px' }} />
                최종 회원가입 승인메일을 보낼 예정이오니 실제 열람가능한 이메일을 기입해주시기 바랍니다.
              </SPGuideMessage>
              <SPGuideMessage $guideMessageColor={!duplicatedEmail ? '확인' : ''}>
                {!!email && !validEmail && '이메일 형식으로 입력해주세요'}
                {!!email && validEmail && doneDuplicationCheck && duplicatedEmail && '이미 가입된 이메일 입니다. 새로운 이메일을 입력하세요'}
                {!!email && validEmail && doneDuplicationCheck && !duplicatedEmail && '입력된 이메일을 사용할 수 있습니다!'}
              </SPGuideMessage>
            </SFormItem>

            {/* [x] 비밀번호 작성란 */}
            <SFormItem>
              <SpasswordLabel htmlFor="password" style={{ position: 'relative' }}>
                <span>비밀번호</span>
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
                {!isPasswordHidden && <BsFillEyeFill className="password_show_hidden_button pw_button_shown_color" onClick={() => setIsPasswordHidden(true)} />}
                {isPasswordHidden && <BsFillEyeSlashFill className="password_show_hidden_button pw_button_hidden_color" onClick={() => setIsPasswordHidden(false)} />}
              </SpasswordLabel>
              <SPGuideMessage>{!!pwd && !validPwd && '소문자, 숫자, 특수문자(!@#$%)를 모두 포함하여 6자 이상 24자 이하의 비밀번호를 입력해주세요'}</SPGuideMessage>
            </SFormItem>

            {/* [x] 비밀번호 확인 작성란 */}
            <SFormItem>
              <SpasswordLabel htmlFor="confirm_pwd" style={{ position: 'relative' }}>
                <span>비밀번호 확인</span>
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
                {!isMatchPwHidden && <BsFillEyeFill className="password_show_hidden_button pw_button_shown_color" onClick={() => setIsMatchPwHidden(true)} />}
                {isMatchPwHidden && <BsFillEyeSlashFill className="password_show_hidden_button pw_button_hidden_color" onClick={() => setIsMatchPwHidden(false)} />}
              </SpasswordLabel>

              <SPGuideMessage>{!!matchPwd && !validMatch && '처음에 입력한 비밀번호와 동일해야합니다.'}</SPGuideMessage>
            </SFormItem>

            {/* [x] 이름 작성란 */}
            <SFormItem>
              <label htmlFor="username">이름</label>
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

            {/* [x] 생년월일 선택란 */}
            <SFormItem style={{ marginBottom: '23px' }}>
              <span>생년월일</span>

              <SDropdownField>
                <SDropdownWrapper>
                  <SDropDownHeader id="birthYearDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, year: !prev.year }))}>
                    <span>{birth.year || '년도'}</span>
                    <FaAngleDown />
                  </SDropDownHeader>
                  {isDateOpen.year && (
                    <SOptionContainer>
                      <Select>
                        {birthYearOptions.map((option) => (
                          <SOption key={option} $selectedOption={birth.year === option.toString()} onClick={() => selectDateOption(option.toString(), 'year')}>
                            {option}
                          </SOption>
                        ))}
                      </Select>
                    </SOptionContainer>
                  )}
                </SDropdownWrapper>
                <SDropdownWrapper>
                  <SDropDownHeader id="birthMonthDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, month: !prev.month }))}>
                    <span>{birth.month || '월'}</span>
                    <FaAngleDown />
                  </SDropDownHeader>
                  {isDateOpen.month && (
                    <SOptionContainer>
                      <Select>
                        {birthMonthOptions.map((option) => (
                          <SOption key={option} $selectedOption={birth.month === option} onClick={() => selectDateOption(option, 'month')}>
                            {option}
                          </SOption>
                        ))}
                      </Select>
                    </SOptionContainer>
                  )}
                </SDropdownWrapper>
                <SDropdownWrapper>
                  <SDropDownHeader id="birthDayDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, day: !prev.day }))}>
                    <span>{birth.day || '일'}</span>
                    <FaAngleDown />
                  </SDropDownHeader>
                  {isDateOpen.day && (
                    <SOptionContainer>
                      <Select>
                        {birthDayOptions.map((option) => (
                          <SOption key={option} $selectedOption={birth.day === option} onClick={() => selectDateOption(option, 'day')}>
                            {option}
                          </SOption>
                        ))}
                      </Select>
                    </SOptionContainer>
                  )}
                </SDropdownWrapper>
              </SDropdownField>
            </SFormItem>

            {/* [x] 성별 선택란 */}
            <SFormItem style={{ marginBottom: '23px' }}>
              <span>성별</span>
              <SRadioField>
                <SRadioLabel htmlFor="female" $isGenderChecked={checkedGender.female}>
                  여성
                </SRadioLabel>
                <SHiddenInput type="radio" id="female" name="female" value="female" checked={checkedGender.female} onChange={genderChangeHandler} />
                <SRadioLabel htmlFor="male" $isGenderChecked={checkedGender.male}>
                  남성
                </SRadioLabel>
                <SHiddenInput type="radio" id="male" name="male" value="male" checked={checkedGender.male} onChange={genderChangeHandler} />
              </SRadioField>
            </SFormItem>

            {/* [x] 지역 선택란 */}
            <SFormItem>
              <SFormItemHeader>
                <span>활동선호지역</span>
                {/* <Sicon>
                      <FaInfoCircle style={{ marginRight: '5px' }} />
                    </Sicon> */}
                <SPGuideMessage>{location.sido1 === location.sido2 && location.gugun1 === location.gugun2 && '중복 지역선택 불가'}</SPGuideMessage>
              </SFormItemHeader>
              {/* [x] 1지역 선택란  */}
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

const SFormContainer = styled.div`
  /* height: 1600px; */
`;

const SForm = styled.form`
  box-sizing: border-box;
  padding: 80px 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 40px; */
  @media screen and (max-width: 420px) {
    padding: 50px 0px;
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

const SpasswordLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SEmailButton = styled.button<{ disabled: boolean }>`
  min-width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  border-radius: 3px;
  /* cursor: default; */
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

/* input Radio */
const SHiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const SRadioField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SRadioLabel = styled.label<{ $isGenderChecked: boolean }>`
  /* width 100%로 해도 되나 */
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => {
    if (props.$isGenderChecked === true) {
      return '1px solid #FE902F';
    } else {
      return '1px solid #696969';
    }
  }};
  color: ${(props) => {
    if (props.$isGenderChecked === true) {
      return ' #FE902F';
    } else {
      return '#696969';
    }
  }};

  cursor: pointer;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;

/* select box (drop down)  */
const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  position: relative;
  width: 100%;
  border: 1px solid #696969;
  border-radius: 3px;
`;

const SDropDownHeader = styled.div`
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

const SOptionContainer = styled.div<{ $selectOptionsType?: string }>`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 180px;
  background-color: #fff;
  border: 1px solid #696969;
  overflow-y: scroll;
  z-index: ${({ $selectOptionsType }) => {
    if ($selectOptionsType === 'location1') return '3';
    else return '1';
  }};
`;
const Select = styled.ul``;

const SOption = styled.li<{ $selectedOption: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }};
  cursor: pointer;
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
  font-size: 13px;
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
  border: 1px solid #696969;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  width: 100%;
  gap: 25px;
`;

const SFormItemBodySection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

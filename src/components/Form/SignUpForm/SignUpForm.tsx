// [ ] 이메일 중복 체크해야함.
// [ ] 날짜 select box 밖에 클릭시 닫히게 해야함
// [ ] 날짜 select box 열렸을 때 아이콘 방향 틀어야함

import { useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { FaAngleDown, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AREA0, AREA1, AREA10, AREA11, AREA12, AREA13, AREA14, AREA15, AREA16, AREA2, AREA3, AREA4, AREA5, AREA6, AREA7, AREA8, AREA9 } from '../../../api/cities';
import supabase from '../../../supabase';
import '../icon.css';
import '../inputBackgroundSetting.css';
interface CityData {
  [key: string]: string[];
}

const cities: CityData = { AREA0, AREA1, AREA2, AREA3, AREA4, AREA5, AREA6, AREA7, AREA8, AREA9, AREA10, AREA11, AREA12, AREA13, AREA14, AREA15, AREA16 };

// [\w-\.]
const USERNAME_KR_REGEX = /^[가-힣|]{2,6}$/;
const USERNAME_EN_REGEX = /^[a-z|A-Z|+\s]{2,20}$/;
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

type TSignUpFormProps = {
  setFormComponent: React.Dispatch<React.SetStateAction<string>>;
};
const SignUpForm: React.FC<TSignUpFormProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
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

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false)

  const [checkedGender, setCheckedGender] = useState({ female: false, male: false });
  const [validGender, setValidGender] = useState(false);

  const [location1, setLoaction1] = useState({ sido1: '1지역 시/도 선택', gugun1: '1지역 구/군 선택' });
  const [location2, setLoaction2] = useState({ sido2: '2지역 시/도 선택', gugun2: '2지역 구/군 선택' });
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

  const [isLocationOpen, setIsLocationOpen] = useState({ sido1: false, gugun1: false, sido2: false, gugun2: false });

  const [gugun1Options, setGugun1Options] = useState<string[]>([]);
  const [gugun2Options, setGugun2Options] = useState<string[]>([]);

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

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  useEffect(() => {
    const checkedValidBirth = !!birth.year && !!birth.month && !!birth.day;
    setValidBirth(checkedValidBirth);
  }, [birth]);

  useEffect(() => {
    const checkedValidGender = checkedGender.female === true || checkedGender.male === true;
    setValidGender(checkedValidGender);
  }, [checkedGender]);

  useEffect(() => {
    const checkedValidLocation1 = location1.sido1 !== '1지역 시/도 선택' && location1.sido1 !== '전체' && location1.gugun1 !== '1지역 구/군 선택';
    const checkedValidLocation2 = location2.sido2 !== '2지역 시/도 선택' && location2.sido2 !== '전체' && location2.gugun2 !== '2지역 구/군 선택';
    const checkedSameLocation = location1.sido1 === location2.sido2 && location1.gugun1 === location2.gugun2;
    setValidLocation(checkedValidLocation1 && checkedValidLocation2 && !checkedSameLocation);
  }, [location1, location2]);

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

  const selectLocation1Option = (option: string, locationType: string, preCode: string) => {
    if (locationType === 'sido1') {
      setGugun1Options([]);
      setLoaction1((prev) => ({ ...prev, sido1: option }));
      setIsLocationOpen((prev) => ({ ...prev, sido1: !prev.sido1 }));

      // option 전체일 때는 gugun 선택사항 X
      if (option === '전체') return setLoaction1((prev) => ({ ...prev, gugun1: '1지역 구/군 선택' }));

      // sido - gugun 관계 => 'sido에 해당하는 gugun', 'gugun selectbox에서 처음 보여줄 option' 세팅
      const gugunCode = 'AREA' + preCode;
      const options = cities[gugunCode];
      setGugun1Options(options);
      setLoaction1((prev) => ({ ...prev, gugun1: options[0] }));
    }
    if (locationType === 'gugun1') {
      setLoaction1((prev) => ({ ...prev, gugun1: option }));
      setIsLocationOpen((prev) => ({ ...prev, gugun1: !prev.gugun1 }));
    }
    // if (locationType === 'sido2') {}
    // if (locationType === 'gugun2') {}
  };
  const selectLocation2Option = (option: string, locationType: string, preCode: string) => {
    if (locationType === 'sido2') {
      setGugun2Options([]);
      setLoaction2((prev) => ({ ...prev, sido2: option }));
      setIsLocationOpen((prev) => ({ ...prev, sido2: !prev.sido2 }));

      if (option === '전체') return setLoaction2((prev) => ({ ...prev, gugun2: '2지역 구/군 선택' }));

      // sido - gugun 관계 => 'sido에 해당하는 gugun', 'gugun selectbox에서 처음 보여줄 option' 세팅
      const gugunCode = 'AREA' + preCode;
      const options = cities[gugunCode];
      setGugun2Options(options);
      setLoaction2((prev) => ({ ...prev, gugun2: options[0] }));
    }
    if (locationType === 'gugun2') {
      setLoaction2((prev) => ({ ...prev, gugun2: option }));
      setIsLocationOpen((prev) => ({ ...prev, gugun2: !prev.gugun2 }));
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
    if (!validEmail || !validPwd || !validMatch || !validUsername || !validBirth || !validGender || !validLocation || !doneDuplicationCheck || duplicatedEmail) {
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
      location1_sido: location1.sido1,
      location1_gugun: location1.gugun1,
      location2_sido: location2.sido2,
      location2_gugun: location2.gugun2,
      role: 'student',
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
  // const test = () => {
  //   let gender = '';
  //   if (checkedGender.male !== checkedGender.female && checkedGender.male === true) gender = '남성';
  //   else if (checkedGender.male !== checkedGender.female && checkedGender.female === true) gender = '여성';
  //   const age = calculateAge();
  //   const trimmedBirth = birth.year + '-' + birth.month + '-' + birth.day;
  //   //만나이 계산

  //   const testFetchData = {
  //     email,
  //     pwd,
  //     username,
  //     birth: trimmedBirth,
  //     age,
  //     gender,
  //     location1_sido: location1.sido1,
  //     location1_gugun: location1.gugun1,
  //     location2_sido: location2.sido2,
  //     location2_gugun: location2.gugun2,
  //     role: 'student',
  //   };
  //   console.log('💟', testFetchData);
  // };

  return (
    <SContainer>
      {errMsg && <p ref={errRef}>{errMsg}</p>}
      <h1>회원가입</h1>
      <SForm onSubmit={handleSubmit}>
        {/* [x] 이메일 작성란 */}
        <SInputField>
          <label htmlFor="email">이메일</label>
          <SEmailInputWrapper style={{ width: '360px' }}>
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
            <BsXCircleFill className="reset_input_btn" onClick={deleteEmail} />
          </SEmailInputWrapper>
          <SPGuideMessage>
            <FaInfoCircle style={{ marginRight: '5px' }} />
            기입된 이메일로 최종 회원가입 승인메일을 보낼 예정이오니 실제 열람가능한 이메일을 기입해주시기 바랍니다.
          </SPGuideMessage>
          {!!email && !validEmail && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              이메일 형식으로 입력해주세요
            </SPGuideMessage>
          )}
          {!!email && validEmail && doneDuplicationCheck && duplicatedEmail && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              중복된 이메일 입니다. 새로운 이메일을 입력하세요
            </SPGuideMessage>
          )}
          {!!email && validEmail && doneDuplicationCheck && !duplicatedEmail && (
            <SPGuideMessage $positiveMessage={!duplicatedEmail}>
              <BsFillCheckCircleFill style={{ marginRight: '5px' }} />
              입력된 이메일을 사용할 수 있습니다!
            </SPGuideMessage>
          )}
        </SInputField>

        {/* [x] 비밀번호 작성란 */}
        <SInputField>
          <label htmlFor="password">비밀번호</label>
          <SInput
            type="password"
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
          {!!pwd && !validPwd && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              대소문자, 숫자, 특수문자(!@#$%)를 모두 포함하여 24자 이상의 비밀번호를 입력해주세요
            </SPGuideMessage>
          )}
        </SInputField>

        {/* [x] 비밀번호 확인 작성란 */}
        <SInputField>
          <label htmlFor="confirm_pwd">비밀번호 확인</label>
          <SInput
            type="password"
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
          {!!matchPwd && !validMatch && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              처음에 입력한 비밀번호와 동일해야합니다.
            </SPGuideMessage>
          )}
        </SInputField>

        {/* [x] 이름 작성란 */}
        <SInputField>
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
          {!!username && !validUsername && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              2자 이상 6자미만의 한국실명 또는 2자이상 20자 미만의 영문실명을 입력하세요.
            </SPGuideMessage>
          )}
        </SInputField>

        {/* [x] 생년월일 선택란 */}
        <SInputField>
          <span>생년월일</span>

          <SDropdownField>
            <SbirthDropdownWrapper>
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
            </SbirthDropdownWrapper>
            <SbirthDropdownWrapper>
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
            </SbirthDropdownWrapper>
            <SbirthDropdownWrapper>
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
            </SbirthDropdownWrapper>
          </SDropdownField>
        </SInputField>

        {/* [x] 성별 선택란 */}
        <SInputField>
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
        </SInputField>

        {/* [x] 지역 선택란 */}
        <SInputField>
          <span>활동선호지역</span>
          {location1.sido1 === location2.sido2 && location1.gugun1 === location2.gugun2 && (
            <SPGuideMessage>
              <FaInfoCircle style={{ marginRight: '5px' }} />
              선택1과 선택2에 각각 다른 지역을 선택해주세요
            </SPGuideMessage>
          )}
          {/* [x] 1지역 선택란  */}
          <span>선택1</span>
          <SDropdownField>
            <SbirthDropdownWrapper>
              <SDropDownHeader id="location1SidoDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, sido1: !prev.sido1 }))}>
                <span>{location1.sido1}</span>
                <FaAngleDown />
              </SDropDownHeader>
              {isLocationOpen.sido1 && (
                <SOptionContainer>
                  <Select>
                    {cities.AREA0.map((option, index) => (
                      <SOption key={option} $selectedOption={location1.sido1 === option} onClick={() => selectLocation1Option(option, 'sido1', index.toString())}>
                        {option}
                      </SOption>
                    ))}
                  </Select>
                </SOptionContainer>
              )}
            </SbirthDropdownWrapper>
            <SbirthDropdownWrapper>
              <SDropDownHeader id="location1gugunDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, gugun1: !prev.gugun1 }))}>
                <span>{location1.gugun1}</span>
                <FaAngleDown />
              </SDropDownHeader>
              {isLocationOpen.gugun1 && (
                <SOptionContainer>
                  <Select>
                    {gugun1Options.map((option, index) => (
                      <SOption key={option} $selectedOption={location1.gugun1 === option} onClick={() => selectLocation1Option(option, 'gugun1', index.toString())}>
                        {option}
                      </SOption>
                    ))}
                  </Select>
                </SOptionContainer>
              )}
            </SbirthDropdownWrapper>
          </SDropdownField>

          {/* [x] 2지역 선택란  */}
          <span>선택2</span>
          <SDropdownField>
            <SbirthDropdownWrapper>
              <SDropDownHeader id="location2SidoDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, sido2: !prev.sido2 }))}>
                <span>{location2.sido2}</span>
                <FaAngleDown />
              </SDropDownHeader>
              {isLocationOpen.sido2 && (
                <SOptionContainer>
                  <Select>
                    {cities.AREA0.map((option, index) => (
                      <SOption key={option} $selectedOption={location2.sido2 === option} onClick={() => selectLocation2Option(option, 'sido2', index.toString())}>
                        {option}
                      </SOption>
                    ))}
                  </Select>
                </SOptionContainer>
              )}
            </SbirthDropdownWrapper>
            <SbirthDropdownWrapper>
              <SDropDownHeader id="location2gugunDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, gugun2: !prev.gugun2 }))}>
                <span>{location2.gugun2}</span>
                <FaAngleDown />
              </SDropDownHeader>
              {isLocationOpen.gugun2 && (
                <SOptionContainer>
                  <Select>
                    {/* <SOption key={option} selectedOption={birth.year === option} onClick={() => selectOption()}></SOption> */}
                    {gugun2Options.map((option, index) => (
                      // <SOption key={option} selectedOption={+birth.year === option} onClick={() => setBirth((prev) => ({ ...prev, year: `${option}` }))}>
                      // <SOption key={option} selectedOption={birth.year === option.toString()} onClick={() => selectOption(option.toString(), 'year')}>
                      <SOption key={option} $selectedOption={location2.gugun2 === option} onClick={() => selectLocation2Option(option, 'gugun2', index.toString())}>
                        {option}
                      </SOption>
                    ))}
                  </Select>
                </SOptionContainer>
              )}
            </SbirthDropdownWrapper>
          </SDropdownField>
        </SInputField>

        <SButton type="submit" disabled={!validEmail || !validPwd || !validMatch || !validUsername || !validBirth || !validGender || !validLocation || !doneDuplicationCheck || duplicatedEmail ? true : false}>
          sign Up
        </SButton>
      </SForm>
    </SContainer>
  );
};
export default SignUpForm;

const SContainer = styled.section`
  margin-top: 100px;
`;
const SForm = styled.form`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const SRadioField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const SEmailInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const SEmailButton = styled.button<{ disabled: boolean }>`
  width: 70px;
  height: 40px;
  /* cursor: default; */
  cursor: ${({ disabled }) => {
    if (disabled) {
      return 'default';
    } else {
      return 'pointer';
    }
  }};
  background-color: ${({ disabled }) => {
    if (disabled) {
      return '#8c474762';
    } else {
      return '#8c4747';
    }
  }};
  color: #fff;
  border-radius: 3px;
`;

const SInput = styled.input<{ $color: boolean; $noFocusedColor: boolean; id?: string }>`
  border: 1px solid #cdcdcd;
  box-sizing: border-box;
  /* background-color: #fff !important; */
  color: #000;
  vertical-align: middle;
  border-radius: 3px;
  padding: 5px;
  width: ${({ id }) => {
    if (id === 'email') {
      return '280px';
    } else {
      return '360px';
    }
  }};
  height: 40px;
  &:focus {
    outline: none;
  }
`;
const SHiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const SRadioLabel = styled.label<{ $isGenderChecked: boolean }>`
  /* width 100%로 해도 되나 */
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.$isGenderChecked === true) {
      return '#d96767';
    } else {
      return '#eee';
    }
  }};
  cursor: pointer;
  border-radius: 3px;
`;

const SPGuideMessage = styled.p<{ $positiveMessage?: boolean }>`
  font-size: 13px;
  color: ${({ $positiveMessage }) => {
    if ($positiveMessage) {
      return '#1b7b18';
    } else {
      return '#d71f1f';
    }
  }};
`;

const SbirthDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  width: 100%;
  box-shadow: 0 4px 5px 0 #00000026;
  position: relative;
`;

const SDropDownHeader = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const SOptionContainer = styled.div`
  /* display: none; */
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
`;
const Select = styled.ul``;

const SOption = styled.li<{ $selectedOption: boolean }>`
  box-sizing: border-box;
  padding: 12px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }};
`;

const SButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => {
    if (props.disabled === true) return '#eee';
    else return '#933636ed';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
`;

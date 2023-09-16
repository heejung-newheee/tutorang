import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import FormHeader from '../../../components/Form/FormHeader';
import GenderRadiobox from '../../../components/Form/GenderRadiobox';
import SelectBirth from '../../../components/Form/SelectBirth';
import SelectLocation from '../../../components/Form/SelectLocation';
import ServiceAgreement from '../../../components/Form/ServiceAgreement';
import { FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO, USERNAME_EN_REGEX, USERNAME_KR_REGEX } from '../../../constants/formConstant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import supabase from '../../../supabase';

const CreateAdditionalInformationForm = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [email, setEmail] = useState('');

  const [username, setUsername] = useState(user?.username || '');
  const [validUsername, setValidUsername] = useState(false);

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
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);
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
    if (!validUsername || !validBirth || !validGender || !validLocation || !isAllChecked) {
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
    };

    if (user) {
      const { error: ErrorOfUpdatingProfile } = await supabase.from('profiles').update(formData).eq('id', user.id);
      const { error: ErrorOfUpdatingAuth } = await supabase.auth.updateUser({
        data: { role: 'student' },
      });
      if (ErrorOfUpdatingProfile) {
        console.error(ErrorOfUpdatingProfile, ErrorOfUpdatingProfile.message);
      } else if (ErrorOfUpdatingAuth) {
        console.error(ErrorOfUpdatingAuth, ErrorOfUpdatingAuth.message);

        dispatch(displayToastAsync({ id: Date.now(), type: 'danger', message: '입력한 정보를 저장하는데 문제가 발생했습니다! 고객센터로 문의주세요!' }));
      } else {
        dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '추가정보 입력이 완료됐습니다. 더 다양한 기능을 이용해보세요~' }));
        navigate('/mypage');
      }
    }
  };
  let isHereguidemessage = '';
  if (location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2) {
    isHereguidemessage = '중복 지역선택 불가';
  } else if (location.sido1 === '시/도 선택' || location.sido2 === '시/도 선택' || location.gugun1 === '구/군 선택' || location.gugun2 === '구/군 선택') {
    isHereguidemessage = '지역1, 지역2 모두 특정지역 선택 필수';
  }

  if (!user) return <div>로딩중</div>;

  return (
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_USER_ADDITIONAL_INFO} />
      <SPartitionLine />
      <SForm onSubmit={handleSubmit}>
        <SUnderForm>
          <SFormItem className="mar23">
            <label htmlFor="email">
              <SFormItemTitle>이메일</SFormItemTitle>
            </label>
            <SInput type="text" id="email" value={email} disabled={true} />
          </SFormItem>

          <SFormItem className="mar23">
            <SFormItemTitle>생년월일</SFormItemTitle>
            <SelectBirth $setBirth={setBirth} />
          </SFormItem>

          <SFormItem className="mar23">
            <SFormItemTitle>성별</SFormItemTitle>
            <GenderRadiobox $checkedGender={checkedGender} $setCheckedGender={setCheckedGender} />
          </SFormItem>

          <SFormItem>
            <label htmlFor="username">
              <SFormItemTitle>이름</SFormItemTitle>
            </label>
            <SInput type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="실명을 입력하세요" autoComplete="off" />
            <SPGuideMessage>{!!username && !validUsername && '2자 이상 6자미만의 한국실명 또는 2자이상 20자 미만의 영문실명을 입력하세요.'}</SPGuideMessage>
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
          <SButton type="submit" disabled={!validUsername || !validBirth || !validGender || !validLocation || !isAllChecked ? true : false}>
            추가 인증정보 등록완료
          </SButton>
        </SUnderFormSubmitButtonContainer>
      </SForm>
    </SContainer>
  );
};

export default CreateAdditionalInformationForm;

const SContainer = styled.div``;

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
  gap: 5px;
  & .mar23 {
    margin-bottom: '23px';
  }
`;

const SInput = styled.input<{ id?: string; disabled?: boolean }>`
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
  ${({ disabled }) => {
    if (disabled) {
      return `background-color: #e7e7e7`;
    }
  }};
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

const SFormItemTitle = styled.span``;

const SFormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
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

const SUnderFormSubmitButtonContainer = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
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

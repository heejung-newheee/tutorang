import { useEffect, useState } from 'react';
import { BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FormHeader from '../../../components/Form/FormHeader';
import SelectLocation from '../../../components/Form/SelectLocation';
import { FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT } from '../../../constants/formConstant';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from '../../../constants/signup.constant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import supabase from '../../../supabase';
import { FormItemBody, FormItemBodySection, FormItemHeader } from '../../auth/SignUpForm/SignUpForm.style';
import Checkbox from '../../auth/registTutorForm/Checkbox';
import * as S from '../../auth/registTutorForm/RegistTutorForm.styled';
import SelectEnrollmentStatus from '../../auth/registTutorForm/SelectEnrollmentStatus';
import SelectTuitionFee from '../../auth/registTutorForm/SelectTuitionFee';
import { classLevelEngTranslation, classLevelTranslation, personalityEngTranslation, personalityTranslation, speakingLanguageEngTranslation, speakingLanguageTranslation } from '../../auth/translation';
import { Container } from '../Mypage.styled';

const EditTutorForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const tutorInfo = state.tutorInfo;
  const [location, setLoaction] = useState({ sido1: tutorInfo.location1_sido!, gugun1: tutorInfo.location1_gugun!, sido2: tutorInfo.location2_sido!, gugun2: tutorInfo.location2_gugun! });
  const [prevLocation, __] = useState(location);
  const [university, setUniversity] = useState(tutorInfo.university || '');
  const [enrollmentStatus, setEnrollmentStatus] = useState(tutorInfo.enrollmentStatus || '');
  const [major, setMajor] = useState(tutorInfo.major || '');
  const [checkPersonalityItems, setCheckPersonalityItems] = useState<string[]>([]);
  const [checkLanguageItems, setCheckLanguageItems] = useState<string[]>([]);
  const [checkClassLevelItems, setCheckClassLevelItems] = useState<string[]>([]);
  const [classInfo, setClassInfo] = useState(tutorInfo.class_info || '');
  const [tuitionFeeOnline, setTuitionFeeOnline] = useState(tutorInfo.tuition_fee_online);
  const [tuitionFeeOffline, setTuitionFeeOffline] = useState(tutorInfo.tuition_fee_offline);
  const [uid, setUid] = useState<string | null>('');
  const [_, setEmail] = useState<string | null>('');
  const [validLocation, setValidLocation] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    let personality = tutorInfo.personality;
    personality = personalityEngTranslation(personality);
    setCheckPersonalityItems(personality);
    let class_level = tutorInfo.class_level;
    class_level = classLevelEngTranslation(class_level);
    setCheckClassLevelItems(class_level);
    let speaking_language = tutorInfo.speaking_language;
    speaking_language = speakingLanguageEngTranslation(speaking_language);
    setCheckLanguageItems(speaking_language);
  }, [tutorInfo]);
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'university') setUniversity(event.target.value);
    if (event.target.name === 'major') setMajor(event.target.value);
  };
  const handleCheckedItems = (checkBoxType: string, value: string, isChecked: boolean) => {
    if (checkBoxType === 'personality') {
      if (isChecked) {
        if (checkPersonalityItems.length >= 5) return false;
        setCheckPersonalityItems([...checkPersonalityItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkPersonalityItems.filter((item) => {
          return item !== value;
        });
        setCheckPersonalityItems(updatedPersonalityItems);
      }
    }
    if (checkBoxType === 'language') {
      if (isChecked) {
        if (checkLanguageItems.length >= 3) return false;
        setCheckLanguageItems([...checkLanguageItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkLanguageItems.filter((item) => {
          return item !== value;
        });
        setCheckLanguageItems(updatedPersonalityItems);
      }
    }
    if (checkBoxType === 'classLevel') {
      if (isChecked) {
        if (checkClassLevelItems.length >= 3) return false;
        setCheckClassLevelItems([...checkClassLevelItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkClassLevelItems.filter((item) => {
          return item !== value;
        });
        setCheckClassLevelItems(updatedPersonalityItems);
      }
    }
  };
  const selectTuitionFee = (option: number, tuitionType: string) => {
    if (tuitionType === 'online') {
      setTuitionFeeOnline(option);
    }
    if (tuitionType === 'offline') {
      setTuitionFeeOffline(option);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const personality = personalityTranslation(checkPersonalityItems);
    const class_level = classLevelTranslation(checkClassLevelItems);
    const speaking_language = speakingLanguageTranslation(checkLanguageItems);
    const formData = { user_id: uid, university, major, enrollmentStatus, speaking_language, personality, class_level, class_info: classInfo, tuition_fee_online: tuitionFeeOnline, tuition_fee_offline: tuitionFeeOffline };
    const locationUpdate = { location1_sido: location.sido1, location1_gugun: location.gugun1, location2_sido: location.sido2, location2_gugun: location.gugun2 };
    const { error } = await supabase.from('tutor_info').update(formData).eq('user_id', user?.id);
    await supabase.from('profiles').update(locationUpdate).eq('id', user?.id);
    if (error) console.error(error.message);
    else {
      dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '수업 정보 변경이 완료되었습니다' }));
      navigate(-1);
    }
  };
  useEffect(() => {
    if (user) {
      setUid(user.id);
      setEmail(user.email);
    }
  }, [user]);
  useEffect(() => {
    if (prevLocation.sido1 !== location.sido1 || prevLocation.gugun1 !== location.gugun1 || prevLocation.sido2 !== location.sido2 || prevLocation.gugun2 !== location.gugun2) {
      const checkedValidLocation1 = location.sido1 !== '시/도 선택' && location.sido1 !== '전체' && location.gugun1 !== '구/군 선택' && location.gugun1 !== '전체';
      const checkedValidLocation2 = location.sido2 !== '시/도 선택' && location.sido2 !== '전체' && location.gugun2 !== '구/군 선택' && location.gugun2 !== '전체';
      const checkedSameLocation = location.sido1 === location.sido2 && location.gugun1 === location.gugun2;
      setValidLocation(checkedValidLocation1 && checkedValidLocation2 && !checkedSameLocation);
    }
  }, [location]);
  let isHereguidemessage = '';
  if (location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2) {
    isHereguidemessage = '중복 지역선택 불가';
  } else if (location.sido1 === '시/도 선택' || location.sido2 === '시/도 선택' || location.gugun1 === '구/군 선택' || location.gugun2 === '구/군 선택') {
    isHereguidemessage = '지역1, 지역2 모두 특정지역 선택 필수';
  }
  return (
    <Container>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT} />
      <S.PartitionLine />
      <S.Form onSubmit={handleSubmit}>
        <S.FormItem>
          <S.FormItemTitle>활동 선호 지역</S.FormItemTitle>
          <FormItemBody>
            <FormItemBodySection>
              <span>지역1</span> <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} $prevValue={location} />
            </FormItemBodySection>
            <FormItemBodySection>
              <span>지역2</span> <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} $prevValue={location} />
            </FormItemBodySection>
          </FormItemBody>
          <FormItemHeader>
            <S.PGuideMessage style={{ color: 'red', fontSize: '14px' }}>{isHereguidemessage !== '' && isHereguidemessage}</S.PGuideMessage>
          </FormItemHeader>
          <S.FormItemTitle>학위/자격 증명</S.FormItemTitle>
          <S.FormCertificateItems>
            <S.CertificateItem>
              <label htmlFor="university">대학교</label>
              <S.ItemSchool>
                <S.Input type="text" id="university" name="university" value={university} onChange={onChangeInputHandler} /> <SelectEnrollmentStatus $selectedOption={enrollmentStatus} $setEnrollmentStatus={setEnrollmentStatus} />
              </S.ItemSchool>
            </S.CertificateItem>
            <S.CertificateItem>
              <label htmlFor="major">학과</label> <S.Input type="text" id="major" name="major" value={major} onChange={onChangeInputHandler}></S.Input>
            </S.CertificateItem>
          </S.FormCertificateItems>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemTitle>성격 (최대 3개 선택)</S.FormItemTitle>
          <S.Items>
            {PERSONALITY_LIST.map((personality) => (
              <Checkbox key={personality.value} $checkboxType={'personality'} option={personality} handleCheckedItems={handleCheckedItems} checkItems={checkPersonalityItems} />
            ))}
          </S.Items>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemTitle>가능언어</S.FormItemTitle>
          <S.Items>
            {AVAILABLE_LANGUAGE_LIST.map((language) => (
              <Checkbox key={language.value} $checkboxType={'language'} option={language} handleCheckedItems={handleCheckedItems} checkItems={checkLanguageItems} />
            ))}
          </S.Items>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemTitle>수업 level</S.FormItemTitle>
          <S.Items>
            {CLASSLEVEL_LIST.map((classLevel) => (
              <Checkbox key={classLevel.value} $checkboxType={'classLevel'} option={classLevel} handleCheckedItems={handleCheckedItems} checkItems={checkClassLevelItems} />
            ))}
          </S.Items>
          <S.GuideBox>
            <FaInfoCircle style={{ marginLeft: '5px', fill: '#696969' }} />
            <S.PGuideMessage>
              <li>{'초급 : 기본적인 일상 대화와 문법 학습'}</li> <li>{'중급 : 다양한 주제에 대한 의사소통과 간단한 토론'}</li> <li>{'고급 : 심도 있는 토론과 어려운 어휘, 문법 다룸'}</li>
            </S.PGuideMessage>
          </S.GuideBox>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemTitle>수업소개</S.FormItemTitle> <S.Textarea name="class_Info" id="class_Info" value={classInfo} onChange={(e) => setClassInfo(e.target.value)}></S.Textarea>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemTitle>자세한 수업료 기준 (₩/30분)</S.FormItemTitle>
          <S.TuitionItems>
            <S.TuitionItem>
              <S.ItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} /> <span>화상 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'online'} $selectTuitionFee={selectTuitionFee} $prevValue={tuitionFeeOnline} />
            </S.TuitionItem>
            <S.TuitionItem>
              <S.ItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} /> <span>대면 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'offline'} $selectTuitionFee={selectTuitionFee} $prevValue={tuitionFeeOffline} />
            </S.TuitionItem>
          </S.TuitionItems>
        </S.FormItem>
        <S.Button type="submit" disabled={location === prevLocation ? false : !validLocation ? true : false}>
          정보 수정 완료
        </S.Button>
      </S.Form>
    </Container>
  );
};
export default EditTutorForm;

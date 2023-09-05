import { useEffect, useState } from 'react';
import { BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import FormHeader from '../../../components/Form/FormHeader';
import SelectLocation from '../../../components/Form/SelectLocation';
import { FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT } from '../../../components/Form/formConstant';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from '../../../constants/signup.constant';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import Checkbox from './Checkbox';
import ImgFileUpload from './ImgFileUpload';
import * as S from './RegistTutorForm.styled';
import SelectEnrollmentStatus from './SelectEnrollmentStatus';
import SelectTuitionFee from './SelectTuitionFee';
import { classLevelTranslation, personalityTranslation, speakingLanguageTranslation } from './translation';

const EditTutorForm = () => {
  const [tuitionFeeOnline, setTuitionFeeOnline] = useState(0);
  const [tuitionFeeOffline, setTuitionFeeOffline] = useState(0);
  const [checkPersonalityItems, setCheckPersonalityItems] = useState<string[]>([]);
  const [checkLanguageItems, setCheckLanguageItems] = useState<string[]>([]);
  const [checkClassLevelItems, setCheckClassLevelItems] = useState<string[]>([]);
  const [uid, setUid] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [classInfo, setClassInfo] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [certificationImgFile, setCertificationImgFile] = useState<File | undefined>();
  const [enrollmentStatus, setEnrollmentStatus] = useState('');
  const [location, setLoaction] = useState({ sido1: '1지역 시/도 선택', gugun1: '1지역 구/군 선택', sido2: '2지역 시/도 선택', gugun2: '2지역 구/군 선택' });

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'university') setUniversity(event.target.value);
    if (event.target.name === 'major') setMajor(event.target.value);
  };
  const handleCheckedItems = (checkBoxType: string, value: string, isChecked: boolean) => {
    if (checkBoxType === 'personality') {
      if (isChecked) {
        if (checkPersonalityItems.length >= 3) return false;
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

  const storeAndGetProfileImg = async () => {
    const imgIdentity = v4();
    if (certificationImgFile && certificationImgFile !== undefined) {
      const { error } = await supabase.storage.from('certification-img-file').upload(`${email}/${imgIdentity}`, certificationImgFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        console.error('upload error', error);
      } else {
        const { data } = await supabase.storage.from('certification-img-file').getPublicUrl(`${email}/${imgIdentity}`);
        return data?.publicUrl;
      }
    } else return undefined;
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
    const imgUrlList = await storeAndGetProfileImg();
    const personality = personalityTranslation(checkPersonalityItems);
    const class_level = classLevelTranslation(checkClassLevelItems);
    const speaking_language = speakingLanguageTranslation(checkLanguageItems);
    const formData = {
      user_id: uid,
      university,
      major,
      enrollmentStatus,
      certification_image: imgUrlList,
      speaking_language,
      personality,
      class_level,
      class_info: classInfo,
      tuition_fee_online: tuitionFeeOnline,
      tuition_fee_offline: tuitionFeeOffline,
    };
    const locationUpdate = {
      location1_sido: location.sido1,
      location1_gugun: location.gugun1,
      location2_sido: location.sido2,
      location2_gugun: location.gugun2,
    };
    const { error } = await supabase.from('tutor_info').update(formData).eq('user_id', user?.id);
    await supabase.from('profiles').update(locationUpdate).eq('id', user?.id);
    if (error) console.log(error.message);
    else {
      alert('수업 정보 변경이 완료되었습니다');
      navigate(-1);
    }
  };

  useEffect(() => {
    if (user) {
      setUid(user.id);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <S.Container>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_TUTOR_CLASS_EDIT} />
      <S.PartitionLine />
      <S.Form onSubmit={handleSubmit}>
        <S.FormItem>
          <S.FormItemTitle>활동 선호 지역</S.FormItemTitle>
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
          <S.FormItemHeader>
            <S.PGuideMessage>
              {location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2 && '중복 지역선택 불가'}
              {(location.sido1 === '전체' || location.sido2 === '전체') && '지역1, 지역2 모두 특정지역 선택 필수'}
            </S.PGuideMessage>
          </S.FormItemHeader>
          <S.FormItemTitle>학위/자격 증명</S.FormItemTitle>
          <S.FormCertificateItems>
            <S.CertificateItem>
              <label htmlFor="university">대학교</label>
              <S.ItemSchool>
                <S.Input type="text" id="university" name="university" value={university} onChange={onChangeInputHandler} />
                <SelectEnrollmentStatus $setEnrollmentStatus={setEnrollmentStatus} />
              </S.ItemSchool>
            </S.CertificateItem>
            <S.CertificateItem>
              <label htmlFor="major">학과</label>
              <S.Input type="text" id="major" name="major" value={major} onChange={onChangeInputHandler}></S.Input>
            </S.CertificateItem>
            <S.CertificateItem>
              <span>학생증, 증명가능서류 사진첨부</span>
              <ImgFileUpload $setCertificationImgFile={setCertificationImgFile} $fileType={'tutorCertificationImg'} />
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
              <li>{'초급 : 기본적인 일상 대화와 문법 학습'}</li>
              <li>{'중급 : 다양한 주제에 대한 의사소통과 간단한 토론'}</li>
              <li>{'고급 : 심도 있는 토론과 어려운 어휘, 문법 다룸'}</li>
            </S.PGuideMessage>
          </S.GuideBox>
        </S.FormItem>

        <S.FormItem>
          <S.FormItemTitle>수업소개</S.FormItemTitle>
          <S.Textarea name="class_Info" id="class_Info" value={classInfo} onChange={(e) => setClassInfo(e.target.value)}></S.Textarea>
        </S.FormItem>

        <S.FormItem>
          <S.FormItemTitle>자세한 수업료 기준 (₩/30분)</S.FormItemTitle>
          <S.TuitionItems>
            <S.TuitionItem>
              <S.ItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} />
                <span>화상 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'online'} $selectTuitionFee={selectTuitionFee} />
            </S.TuitionItem>
            <S.TuitionItem>
              <S.ItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} />
                <span>대면 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'offline'} $selectTuitionFee={selectTuitionFee} />
            </S.TuitionItem>
          </S.TuitionItems>
        </S.FormItem>

        <S.Button type="submit">정보 수정 완료</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default EditTutorForm;

import { useEffect, useState } from 'react';
import { BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import FormHeader from '../../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE } from '../../../constants/formConstant';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from '../../../constants/signup.constant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import supabase from '../../../supabase';
import { classLevelTranslation, personalityTranslation, speakingLanguageTranslation } from '../translation';
import Checkbox from './Checkbox';
import ImgFileUpload from './ImgFileUpload';
import * as S from './RegistTutorForm.styled';
import SelectEnrollmentStatus from './SelectEnrollmentStatus';
import SelectTuitionFee from './SelectTuitionFee';

const RegistTutorForm = () => {
  const [tuitionFeeOnline, setTuitionFeeOnline] = useState(0);
  const [tuitionFeeOffline, setTuitionFeeOffline] = useState(0);
  const [checkPersonalityItems, setCheckPersonalityItems] = useState<string[]>([]);
  const [checkLanguageItems, setCheckLanguageItems] = useState<string[]>([]);
  const [checkClassLevelItems, setCheckClassLevelItems] = useState<string[]>([]);
  const [validationCheck, setValicationCheck] = useState(false);
  const [uid, setUid] = useState<string>('');
  const [email, setEmail] = useState<string | null>('');
  const [classInfo, setClassInfo] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [certificationImgFile, setCertificationImgFile] = useState<File | undefined>();
  const [enrollmentStatus, setEnrollmentStatus] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
      state: 'pending',
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
    const { error } = await supabase.from('pending_tutor_registration').insert(formData);
    if (error) console.error(error.message);
    else {
      dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '튜터신청이 완료되었습니다. 관리자의 승인을 기다려주세요!' }));
      navigate(-1);
    }
  };

  useEffect(() => {
    const isValidate =
      tuitionFeeOnline === 0 || tuitionFeeOffline === 0 || checkLanguageItems.length === 0 || checkClassLevelItems.length === 0 || enrollmentStatus === '' || classInfo === '' || university === '' || major === '' || certificationImgFile === undefined
        ? true
        : false;
    setValicationCheck(() => isValidate);
  }, [enrollmentStatus, tuitionFeeOffline, tuitionFeeOnline, checkClassLevelItems, checkLanguageItems, checkPersonalityItems, classInfo, university, major, certificationImgFile]);

  useEffect(() => {
    if (user) {
      setUid(user.id);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <S.Container>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE} />
      <S.PartitionLine />
      <S.Form onSubmit={handleSubmit}>
        <S.FormItem>
          <S.FormItemTitle>학위/자격 증명</S.FormItemTitle>
          <S.FormCertificateItems>
            <S.CertificateItem>
              <label htmlFor="university">대학교</label>
              <S.ItemSchool>
                <S.Input type="text" id="university" name="university" value={university} onChange={onChangeInputHandler} />
                <SelectEnrollmentStatus $setEnrollmentStatus={setEnrollmentStatus} $selectedOption={classInfo} />
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
            <FaInfoCircle className="guidebox_info_icon" />
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
                <BsFillRecordFill color="#FE902F" style={{ marginRight: '5px' }} />
                <span>화상 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'online'} $selectTuitionFee={selectTuitionFee} $prevValue={tuitionFeeOnline} />
            </S.TuitionItem>
            <S.TuitionItem>
              <S.ItemHeader>
                <BsFillRecordFill color="#FE902F" style={{ marginRight: '5px' }} />
                <span>대면 수업</span>
              </S.ItemHeader>
              <SelectTuitionFee $tuitionType={'offline'} $selectTuitionFee={selectTuitionFee} $prevValue={tuitionFeeOffline} />
            </S.TuitionItem>
          </S.TuitionItems>
        </S.FormItem>

        <S.Button type="submit" disabled={validationCheck}>
          튜터 신청 완료
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default RegistTutorForm;

import { useEffect, useState } from 'react';
import { BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { v4 } from 'uuid';
import FormHeader from '../../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE } from '../../../components/Form/formConstant';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from '../../../constants/constant';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import Checkbox from './Checkbox';
import ImgFileUpload from './ImgFileUpload';
import SelectEnrollmentStatus from './SelectEnrollmentStatus';
import SelectTuitionFee from './SelectTuitionFee';
import { classLevelTranslation, personalityTranslation, speakingLanguageTranslation } from './translation';

const RegistTutorForm = () => {
  const [tuitionFeeOnline, setTuitionFeeOnline] = useState(0);
  const [tuitionFeeOffline, setTuitionFeeOffline] = useState(0);
  const [checkPersonalityItems, setCheckPersonalityItems] = useState<string[]>([]);
  const [checkLanguageItems, setCheckLanguageItems] = useState<string[]>([]);
  const [checkClassLevelItems, setCheckClassLevelItems] = useState<string[]>([]);
  const [validationCheck, setValicationCheck] = useState(false);
  const [uid, setUid] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [classInfo, setClassInfo] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [certificationImgFile, setCertificationImgFile] = useState<File | undefined>();
  const [enrollmentStatus, setEnrollmentStatus] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

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
    if (error) console.log(error.message);
    else {
      alert('튜터신청이 완료되었습니다! 관리자의 승인을 기다려주세염');
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
    <SContainer>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE} />
      <SPartitionLine />
      <SForm onSubmit={handleSubmit}>
        <SFormItem>
          <SFormItemTitle>학위/자격 증명</SFormItemTitle>
          <SFormCertificateItems>
            <SCertificateItem>
              <label htmlFor="university">대학교</label>
              <SItemSchool>
                <SInput type="text" id="university" name="university" value={university} onChange={onChangeInputHandler} />
                <SelectEnrollmentStatus $setEnrollmentStatus={setEnrollmentStatus} />
              </SItemSchool>
            </SCertificateItem>
            <SCertificateItem>
              <label htmlFor="major">학과</label>
              <SInput type="text" id="major" name="major" value={major} onChange={onChangeInputHandler}></SInput>
            </SCertificateItem>
            <SCertificateItem>
              <span>학생증, 증명가능서류 사진첨부</span>
              <ImgFileUpload $setCertificationImgFile={setCertificationImgFile} $fileType={'tutorCertificationImg'} />
            </SCertificateItem>
          </SFormCertificateItems>
        </SFormItem>

        <SFormItem>
          <SFormItemTitle>성격 (최대 3개 선택)</SFormItemTitle>
          <SItems>
            {PERSONALITY_LIST.map((personality) => (
              <Checkbox key={personality.value} $checkboxType={'personality'} option={personality} handleCheckedItems={handleCheckedItems} checkItems={checkPersonalityItems} />
            ))}
          </SItems>
        </SFormItem>

        <SFormItem>
          <SFormItemTitle>가능언어</SFormItemTitle>
          <SItems>
            {AVAILABLE_LANGUAGE_LIST.map((language) => (
              <Checkbox key={language.value} $checkboxType={'language'} option={language} handleCheckedItems={handleCheckedItems} checkItems={checkLanguageItems} />
            ))}
          </SItems>
        </SFormItem>

        <SFormItem>
          <SFormItemTitle>수업 level</SFormItemTitle>
          <SItems>
            {CLASSLEVEL_LIST.map((classLevel) => (
              <Checkbox key={classLevel.value} $checkboxType={'classLevel'} option={classLevel} handleCheckedItems={handleCheckedItems} checkItems={checkClassLevelItems} />
            ))}
          </SItems>
          <SGuideBox>
            <FaInfoCircle style={{ marginLeft: '5px', fill: '#696969' }} />
            <SPGuideMessage>
              <li>{'초급 : 기본적인 일상 대화와 문법 학습'}</li>
              <li>{'중급 : 다양한 주제에 대한 의사소통과 간단한 토론'}</li>
              <li>{'고급 : 심도 있는 토론과 어려운 어휘, 문법 다룸'}</li>
            </SPGuideMessage>
          </SGuideBox>
        </SFormItem>

        <SFormItem>
          <SFormItemTitle>수업소개</SFormItemTitle>
          <STextarea name="class_Info" id="class_Info" value={classInfo} onChange={(e) => setClassInfo(e.target.value)}></STextarea>
        </SFormItem>

        <SFormItem>
          <SFormItemTitle>자세한 수업료 기준 (₩/30분)</SFormItemTitle>
          <STuitionItems>
            <STuitionItem>
              <SItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} />
                <span>화상 수업</span>
              </SItemHeader>
              <SelectTuitionFee $tuitionType={'online'} $selectTuitionFee={selectTuitionFee} />
            </STuitionItem>
            <STuitionItem>
              <SItemHeader>
                <BsFillRecordFill style={{ marginRight: '5px', fill: '#FE902F' }} />
                <span>대면 수업</span>
              </SItemHeader>
              <SelectTuitionFee $tuitionType={'offline'} $selectTuitionFee={selectTuitionFee} />
            </STuitionItem>
          </STuitionItems>
        </SFormItem>

        <SButton type="submit" disabled={validationCheck}>
          튜터 신청 완료
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default RegistTutorForm;

const SContainer = styled.div``;

const SForm = styled.form`
  box-sizing: border-box;
  padding: 40px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 420px) {
    padding: 30px 20px;
  }
`;

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SFormItemTitle = styled.span`
  font-weight: 500;
`;
const SItemSchool = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const SFormCertificateItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px 10px;
  border: 1px solid #696969;
  border-radius: 3px;
`;

const SCertificateItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SGuideBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 14px;
`;

const SPGuideMessage = styled.ul`
  color: #aeaeae;
`;

const SItems = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 5px;
  justify-content: space-between;
`;

const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  padding: 8px 10px;
  font-size: 16px;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

const STextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  border: 1px solid #696969;
  border-radius: 3px;
  resize: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
`;

const STuitionItems = styled.div`
  border: 1px solid #696969;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  width: 100%;
  gap: 25px;
  @media screen and (min-width: 1024px) {
    gap: 10px;
  }
`;

const STuitionItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  @media screen and (min-width: 1024px) {
    width: 48%;
  }
`;

const SItemHeader = styled.div``;

const SButton = styled.button<{ disabled: boolean }>`
  height: 50px;
  font-size: 16px;
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
  margin-top: 20px;
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

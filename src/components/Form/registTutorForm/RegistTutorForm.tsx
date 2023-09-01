// [ ] 현재 로그인한 사용자의 uid를 session에서 불러오고 있는데 , redux로 한번에 관리하는 거 연결하고 나면 없애야함.
// [ ] 등록할 때 session?거기에 핞
import { useEffect, useState } from 'react';
import { BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { v4 } from 'uuid';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import FormHeader from '../common/FormHeader';
import { FORM_CONSTANT_TITLE_TUTOR_CERTIFICATE } from '../common/formConstant';
import Checkbox from './Checkbox';
import ImgFileUpload from './ImgFileUpload';
import SelectEnrollmentStatus from './SelectEnrollmentStatus';
import SelectTuitionFee from './SelectTuitionFee';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from './constant';
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
  console.log('user', user);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'university') setUniversity(event.target.value);
    if (event.target.name === 'major') setMajor(event.target.value);
  };

  const handleCheckedItems = (checkBoxType: string, value: string, isChecked: boolean) => {
    if (checkBoxType === 'personality') {
      if (isChecked) {
        // 선택된 아이템이 2개 이상이면 더 추가 못하게 (Checkbox에서 어차피 선택안되게 해서 필요없지만 한 번 더 써줌.)
        if (checkPersonalityItems.length >= 3) return false;
        setCheckPersonalityItems([...checkPersonalityItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkPersonalityItems.filter((item) => {
          return item !== value;
        });
        setCheckPersonalityItems(updatedPersonalityItems);
      }
      console.log(checkPersonalityItems);
    }
    if (checkBoxType === 'language') {
      if (isChecked) {
        // 선택된 아이템이 2개 이상이면 더 추가 못하게 (Checkbox에서 어차피 선택안되게 해서 필요없지만 한 번 더 써줌.)
        if (checkLanguageItems.length >= 3) return false;
        setCheckLanguageItems([...checkLanguageItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkLanguageItems.filter((item) => {
          return item !== value;
        });
        setCheckLanguageItems(updatedPersonalityItems);
      }
      console.log(checkLanguageItems);
    }
    if (checkBoxType === 'classLevel') {
      if (isChecked) {
        // 선택된 아이템이 2개 이상이면 더 추가 못하게 (Checkbox에서 어차피 선택안되게 해서 필요없지만 한 번 더 써줌.)
        if (checkClassLevelItems.length >= 3) return false;
        setCheckClassLevelItems([...checkClassLevelItems, value]);
      } else if (!isChecked) {
        const updatedPersonalityItems = checkClassLevelItems.filter((item) => {
          return item !== value;
        });
        setCheckClassLevelItems(updatedPersonalityItems);
      }
      console.log(checkClassLevelItems);
    }
  };

  const storeAndGetProfileImg = async () => {
    const imgIdentity = v4();
    // let pdfUrlList: string | undefined;
    if (certificationImgFile && certificationImgFile !== undefined) {
      const { error } = await supabase.storage.from('certification-img-file').upload(`${email}/${imgIdentity}`, certificationImgFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        console.error('upload error', error);
      } else {
        const { data } = await supabase.storage.from('certification-img-file').getPublicUrl(`${email}/${imgIdentity}`);
        return data?.publicUrl; // 업로드된 파일들의 URL을 반환합니다. imgUrlList
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
    // console.log('formData로 뭐가 들어오나요? =>', formData);
    const { error } = await supabase.from('tutor_info').insert(formData);
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
        {/* [x] 학위/자격증명 */}
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

        {/* [x] 성격 */}
        <SFormItem>
          <SFormItemTitle>성격 (최대 3개 선택)</SFormItemTitle>
          <SItems>
            {PERSONALITY_LIST.map((personality) => (
              <Checkbox key={personality.value} $checkboxType={'personality'} option={personality} handleCheckedItems={handleCheckedItems} checkItems={checkPersonalityItems} />
            ))}
          </SItems>
        </SFormItem>

        {/* [x] 사용가능 언어 (한/중/일) */}
        <SFormItem>
          <SFormItemTitle>가능언어</SFormItemTitle>
          <SItems>
            {AVAILABLE_LANGUAGE_LIST.map((language) => (
              <Checkbox key={language.value} $checkboxType={'language'} option={language} handleCheckedItems={handleCheckedItems} checkItems={checkLanguageItems} />
            ))}
          </SItems>
        </SFormItem>

        {/* [x] 수업 레벨 (초급/중급/고급) */}
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

        {/* [x] 수업소개 */}
        <SFormItem>
          <SFormItemTitle>수업소개</SFormItemTitle>
          <STextarea name="class_Info" id="class_Info" value={classInfo} onChange={(e) => setClassInfo(e.target.value)}></STextarea>
        </SFormItem>

        {/* [x] 수업료 설정 */}
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
  padding: 80px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 420px) {
    padding: 50px 20px;
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
  /* width: 360px; */
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
  /* @media screen and (max-width: 420px) {
    width: 100%;
  } */
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

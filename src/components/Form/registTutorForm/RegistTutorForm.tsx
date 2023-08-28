// [ ] 현재 로그인한 사용자의 uid를 session에서 불러오고 있는데 , redux로 한번에 관리하는 거 연결하고 나면 없애야함.
// [ ] 등록할 때 session?거기에 핞
import { useEffect, useState } from 'react';
import { BsFileEarmarkImage, BsFileEarmarkPdf, BsFileEarmarkPerson, BsFillRecordFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { styled } from 'styled-components';
import supabase from '../../../supabase';
import Checkbox from './Checkbox';
import SelectTuitionFee from './SelectTuitionFee';
import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from './constant';
import { classLevelTranslation, personalityTranslation, speakingLanguageTranslation } from './translation';

// null 안넣고 싶은데 안넣으면 빨간줄이 안사라져서 넣어본다...
type locationType = {
  location1_sido: string | null;
  location1_gugun: string | null;
  location2_sido: string | null;
  location2_gugun: string | null;
};
const RegistTutorForm = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [tuitionFeeOnline, setTuitionFeeOnline] = useState(0);
  const [tuitionFeeOffline, setTuitionFeeOffline] = useState(0);
  const [checkPersonalityItems, setCheckPersonalityItems] = useState<string[]>([]);
  const [checkLanguageItems, setCheckLanguageItems] = useState<string[]>([]);
  const [checkClassLevelItems, setCheckClassLevelItems] = useState<string[]>([]);
  const [validationCheck, setValicationCheck] = useState(false);
  const [location, setLocation] = useState<locationType>({
    location1_sido: '',
    location1_gugun: '',
    location2_sido: '',
    location2_gugun: '',
  });
  const [uid, setUid] = useState<string>('');
  const [classInfo, setClassInfo] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  // const [myImgFile, setMyImgFile] = useState<File | null>(null);
  // const [previewMyImg, setPreviewMyImg] = useState<string | ArrayBuffer | null>(null);

  // 현재 로그인한 튜터정보 불러오기
  const findUserUid = async () => {
    await supabase.auth.onAuthStateChange((event, session) => {
      // console.log('event', event);
      // console.log('session', session);
      if (session) {
        setUid(() => session.user.id);
      }
    });
  };
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'university') setUniversity(event.target.value);
    if (event.target.name === 'major') setMajor(event.target.value);
  };
  const getUserData = async (uid: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).single();
      console.log('hey~', data);
      if (error) throw error;
      if (data) {
        // const authData = data[0];
        const storedLocation: locationType = { location1_sido: data.location1_sido, location1_gugun: data.location1_gugun, location2_sido: data.location2_sido, location2_gugun: data.location2_gugun };

        setLocation(storedLocation);
      }
    } catch (error) {
      if (error instanceof Error) {
        // 👉️ err is type Error here
        console.log(error.message);

        return;
      }
    }
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

  const selectTuitionFee = (option: number, tuitionType: string) => {
    if (tuitionType === 'online') {
      setTuitionFeeOnline(option);
    }
    if (tuitionType === 'offline') {
      setTuitionFeeOffline(option);
    }
  };
  const test = () => {
    const personality = personalityTranslation(checkPersonalityItems);
    const class_level = classLevelTranslation(checkClassLevelItems);
    const speaking_language = speakingLanguageTranslation(checkLanguageItems);
    const formData = {
      university,
      major,
      certification_image: '사진',
      certification_pdf: 'pdf파일 (사진 or 파일 둘중 하나는 필수)',
      location1_sido: location?.location1_sido,
      location1_gugun: location?.location1_gugun,
      location2_sido: location?.location2_sido,
      location2_gugun: location?.location2_gugun,
      speaking_language,
      personality,
      class_level,
      class_info: classInfo,
      tuition_fee_online: tuitionFeeOnline,
      tuition_fee_offline: tuitionFeeOffline,
      profile_image: '이미지url',
    };
    console.log(formData);
  };

  // const handleReadytoUploadMyimgfile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0]; // Access the selected file
  //   if (selectedFile) {
  //     setMyImgFile(selectedFile); // Update the state with the selected file
  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);
  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         setPreviewMyImg(reader.result);
  //       }
  //     };
  //   }
  // };
  // const handleUploadMyimgfile = async (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   if (myImgFile) {
  //     const { data, error } = await supabase.storage
  //       .from('tutor-profile-img')
  //       .upload(public/${myImgFile.name}, myImgFile, {
  //         cacheControl: '3600',
  //         upsert: false,
  //       });
  //     // setImgData(data);
  //   }
  // };
  // const handleCancelMyimgfileUpload = () => {
  //   setMyImgFile(null);
  //   setPreviewMyImg(null);
  // };
  useEffect(() => {
    const isValidate = tuitionFeeOnline === 0 || tuitionFeeOffline === 0 || checkLanguageItems.length === 0 || checkClassLevelItems.length === 0 || classInfo.length === 0 ? true : false;
    setValicationCheck(() => isValidate);
  }, [tuitionFeeOffline, tuitionFeeOnline, checkClassLevelItems, checkLanguageItems, checkPersonalityItems, classInfo]);

  useEffect(() => {
    findUserUid();
  }, []);

  useEffect(() => {
    if (uid) {
      getUserData(uid);
    }
  }, [uid]);

  return (
    <SContainer>
      <h1>RegistTutorForm</h1>
      <SForm>
        <SFormCertificateItem>
          <div>
            <label htmlFor="university">대학교</label>
            <SInput type="text" id="university" name="university" value={university} onChange={onChangeInputHandler} />
          </div>
          <div>
            <label htmlFor="">학과</label>
            <SInput type="text" id="major" name="major" value={major} onChange={onChangeInputHandler}></SInput>
          </div>
        </SFormCertificateItem>
        <SFormItem id="certification_Item">
          <span>학생증, 증명가능서류 사진첨부</span>
          <SCertifiFilesArea>
            <SCertifiIcon>
              <BsFileEarmarkImage className="certification_icon" />
            </SCertifiIcon>
            <SCertifiFilesContainer>
              <li></li>
            </SCertifiFilesContainer>
          </SCertifiFilesArea>
          <SCertifiFilesArea>
            <SCertifiIcon>
              <BsFileEarmarkPdf className="certification_icon" />
            </SCertifiIcon>
            <SCertifiFilesContainer>
              <li></li>
            </SCertifiFilesContainer>
          </SCertifiFilesArea>
        </SFormItem>
        <SFormItem>
          <span>성격 (최대 3개 선택)</span>
          <SItems>
            {PERSONALITY_LIST.map((personality) => (
              <Checkbox key={personality.value} $checkboxType={'personality'} option={personality} handleCheckedItems={handleCheckedItems} checkItems={checkPersonalityItems} />
            ))}
          </SItems>
        </SFormItem>
        <SFormItem>
          <span>가능언어</span>
          <SItems>
            {AVAILABLE_LANGUAGE_LIST.map((language) => (
              <Checkbox key={language.value} $checkboxType={'language'} option={language} handleCheckedItems={handleCheckedItems} checkItems={checkLanguageItems} />
            ))}
          </SItems>
        </SFormItem>
        <SFormItem>
          <SItemClassLevelHeader>
            <span>수업 level</span>
            <FaInfoCircle style={{ marginLeft: '10px', cursor: 'pointer' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
            {isHovered && (
              <SPGuideMessage>
                <li>{'초급 : 기본적인 일상 대화와 문법 학습'}</li>
                <li>{'중급 : 다양한 주제에 대한 의사소통과 간단한 토론'}</li>
                <li>{'고급 : 심도 있는 토론과 어려운 어휘, 문법 다룸'}</li>
              </SPGuideMessage>
            )}
          </SItemClassLevelHeader>
          <SItems>
            {CLASSLEVEL_LIST.map((classLevel) => (
              <Checkbox key={classLevel.value} $checkboxType={'classLevel'} option={classLevel} handleCheckedItems={handleCheckedItems} checkItems={checkClassLevelItems} />
            ))}
          </SItems>
        </SFormItem>
        <SFormItem>
          <span>수업소개</span>
          <STextarea name="class_Info" id="class_Info" value={classInfo} onChange={(e) => setClassInfo(e.target.value)}></STextarea>
        </SFormItem>
        <SFormItem>
          <span>자세한 수업료 기준 (₩/30분)</span>
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
        <SFormItem>
          <span>대표 프로필 이미지</span>
          <SCertifiFilesArea>
            <SCertifiIcon>
              <BsFileEarmarkPerson className="certification_icon" />
            </SCertifiIcon>
            <SCertifiFilesContainer id="certificateImgPreview">
              <li></li>
            </SCertifiFilesContainer>
            <SImgPreview type="button">미리보기</SImgPreview>
          </SCertifiFilesArea>
        </SFormItem>
        <button type="button" onClick={test}>
          test
        </button>
        <SButton type="submit" disabled={validationCheck}>
          튜터 신청 완료
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default RegistTutorForm;

const SContainer = styled.section`
  margin-top: 100px;
  max-width: 1200px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SForm = styled.form`
  /* height: 500px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SFormCertificateItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SItemClassLevelHeader = styled.div`
  position: relative;
`;

const SPGuideMessage = styled.ul`
  position: absolute;
  top: -72px;
  left: 100px;
  width: 360px;
  z-index: 1;
  background-color: #fdf9f9;
  padding: 10px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  /* font-size: 13px;
  color:  */
`;
// const SPersonalityItems = styled.div`
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
  height: 40px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  padding: 10px;
`;

const STextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  border: 1px solid #696969;
  border-radius: 3px;
  resize: none;
  outline: none;
  padding: 10px;
`;

const STuitionItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
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
  height: 40px;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};
  /* color: ${(props) => {
    if (props.disabled === true) return '#131212';
    else return '#fff';
  }}; */
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  border-radius: 3px;
`;

const SCertifiFilesArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const SCertifiIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const SCertifiFilesContainer = styled.ul<{ id?: string }>`
  background-color: #f7f7f7;
  border: 1px solid #696969;
  border-radius: ${({ id }) => {
    if (id === 'certificateImgPreview') return '3px 0 0 3px';
    else return '3px';
  }};
  width: 100%;
  height: 40px;
`;

const SImgPreview = styled.button`
  border: 1px solid #696969;
  border-left: none;
  border-radius: 3px;
  width: 100px;
  height: 40px;
  border-radius: 0 3px 3px 0;
`;

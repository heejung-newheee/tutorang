import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getUserById, profileImgUpload, userUpdate } from '../../../api/user';
import { edit_photo } from '../../../assets';
import { SPGuideMessage } from '../../../components/Form/AuthForm.styled';
import FormHeader from '../../../components/Form/FormHeader';
import SelectLocation from '../../../components/Form/SelectLocation';
import { PartitionLine } from '../../../components/common/header/Header.styled';
import { FORM_CONSTANT_TITLE_PROFILES_EDIT, PWD_REGEX } from '../../../constants/formConstant';
import { USER_PROFILE_QUERY_KEY } from '../../../constants/query.constant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { setUser } from '../../../redux/modules/user';
import supabase from '../../../supabase';
import { Container, Section } from '../Mypage.styled';
import * as S from './ProfileForm.styled';
import { displayToastAsync } from '../../../redux/modules';

type sessionType = {
  provider: string | undefined;
  providers: string[];
};
const EditProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootState) => state.user.user);

  const userData = useQuery([USER_PROFILE_QUERY_KEY], () => getUserById(loginUser!.id));
  const user = userData.data;

  if (!user) return;
  const [provider, setProvider] = useState<sessionType>();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [location, setLoaction] = useState({ sido1: user.location1_sido!, gugun1: user.location1_gugun!, sido2: user.location2_sido!, gugun2: user.location2_gugun! });
  const [prevLocation, _] = useState(location);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isMatchPwHidden, setIsMatchPwHidden] = useState(true);

  const [validPwd, setValidPwd] = useState(false);
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [validLocation, setValidLocation] = useState(false);

  const changeNewpassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
      makeVisiblePreviewImg(selectedFile);
    } else return false;
  };
  const makeVisiblePreviewImg = (selectedFile: File) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImg(reader.result);
        }
      };
    }
  };

  const updateProfilesInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== '') {
        supabase.auth.updateUser({ password: password });
        navigate('/mypage');
      }
      if (location.sido1 !== user.location1_sido || location.gugun1 !== user.location1_gugun || location.sido2 !== user.location2_sido || location.gugun2 !== user.location2_gugun) {
        const locationData = {
          location1_sido: location.sido1,
          location1_gugun: location.gugun1,
          location2_sido: location.sido2,
          location2_gugun: location.gugun2,
        };
        await userUpdate(locationData, user.id);
        dispatch(setUser({ ...user, location1_sido: location.sido1, location1_gugun: location.gugun1, location2_sido: location.sido2, location2_gugun: location.gugun2 }));
      }
      if (imgFile) {
        const uploadProfile = await profileImgUpload({ id: user.id, img: imgFile });
        dispatch(setUser({ ...user, avatar_url: uploadProfile }));
      }
      dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '프로필 수정이 완료되었습니다.' }));
      navigate('/mypage');
    } catch (error) {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: `정보 수정 중 오류가 발생했습니다${error}` }));
    }
  };
  let isHereguidemessage = '';
  if (location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2) {
    isHereguidemessage = '중복 지역선택 불가';
  } else if (location.sido1 === '전체' || location.sido2 === '전체' || location.gugun1 === '전체' || location.gugun2 === '전체') {
    isHereguidemessage = '지역1, 지역2 모두 특정지역 선택 필수';
  }

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const resultMatch = password === confirmPassword;
    setValidPwdConfirm(resultMatch);
    supabase.auth.getSession().then(({ data: { session } }) => {
      const sessionProvider: string | undefined = session?.user.app_metadata.provider;
      const sessionProviders: string[] = session?.user.app_metadata.providers;
      setProvider({
        provider: sessionProvider,
        providers: sessionProviders,
      });
      return session;
    });
  }, [password, confirmPassword]);

  useEffect(() => {
    if (prevLocation.sido1 !== location.sido1 || prevLocation.gugun1 !== location.gugun1 || prevLocation.sido2 !== location.sido2 || prevLocation.gugun2 !== location.gugun2) {
      const checkedValidLocation1 = location.sido1 !== '시/도 선택' && location.sido1 !== '전체' && location.gugun1 !== '구/군 선택' && location.gugun1 !== '전체';
      const checkedValidLocation2 = location.sido2 !== '시/도 선택' && location.sido2 !== '전체' && location.gugun2 !== '구/군 선택' && location.gugun2 !== '전체';
      const checkedSameLocation = location.sido1 === location.sido2 && location.gugun1 === location.gugun2;
      setValidLocation(checkedValidLocation1 && checkedValidLocation2 && !checkedSameLocation);
    }
  }, [location]);

  return (
    <>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_PROFILES_EDIT} />
      <PartitionLine />
      <Section>
        <Container>
          <S.Inner>
            <form onSubmit={updateProfilesInfo}>
              <S.ProfileImgBox>
                <S.ProfileImg src={previewImg?.toString() || user?.avatar_url || undefined} alt="user profile" />
                <S.EditPhotoBtn>
                  <img src={edit_photo} alt="이미지 교체 버튼" />
                </S.EditPhotoBtn>
                <S.EditInput className="edit-photo" type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
              </S.ProfileImgBox>
              <div>
                <p>이름</p>
                <S.UserData>{user?.username}</S.UserData>
              </div>
              <div>
                <p>생년월일</p>
                <S.UserData>{user?.birth}</S.UserData>
              </div>
              <div>
                <p>성별</p>
                <S.UserData>{user?.gender}</S.UserData>
              </div>
              <div>
                <p>이메일</p>
                <S.UserData>{user?.email}</S.UserData>
              </div>
              {provider?.provider === 'email' ? (
                <S.PasswordChangeWrap>
                  <S.ConfirmPass>
                    {password.length > 6 && PWD_REGEX.test(password) ? (
                      <p></p>
                    ) : password !== '' ? (
                      <p>문자, 숫자, 특수문자(!@#$%) 포함, 6자 이상의 비밀번호</p>
                    ) : (
                      <p>
                        <br />
                      </p>
                    )}
                  </S.ConfirmPass>
                  <S.ConfirmPass>
                    {password === confirmPassword ? (
                      <p>
                        <br />
                      </p>
                    ) : confirmPassword !== '' ? (
                      <p>처음에 입력한 비밀번호와 동일해야합니다</p>
                    ) : (
                      <p>
                        <br />
                      </p>
                    )}
                  </S.ConfirmPass>
                  <S.PasswordWrap>
                    <p>비밀번호 변경</p>
                    <S.EditInput type={isPasswordHidden ? 'password' : 'text'} name="password" value={password} onChange={changeNewpassword} placeholder="비밀번호를 입력하세요" />
                    {isPasswordHidden ? (
                      <S.PasswordEyeButton onClick={() => setIsPasswordHidden(false)}>
                        <BsFillEyeSlashFill className="pw_button_hidden_color" />
                      </S.PasswordEyeButton>
                    ) : (
                      <S.PasswordEyeButton onClick={() => setIsPasswordHidden(true)}>
                        <BsFillEyeFill className="pw_button_shown_color" />
                      </S.PasswordEyeButton>
                    )}
                  </S.PasswordWrap>

                  <S.PasswordWrap>
                    <p>비밀번호 확인</p>
                    <S.EditInput type={isMatchPwHidden ? 'password' : 'text'} name="confirmPassword" value={confirmPassword} onChange={changeConfirmPassword} placeholder="비밀번호 확인 입력하세요" />

                    {isMatchPwHidden ? (
                      <S.PasswordEyeButton onClick={() => setIsMatchPwHidden(false)}>
                        <BsFillEyeSlashFill className=" pw_button_hidden_color" />
                      </S.PasswordEyeButton>
                    ) : (
                      <S.PasswordEyeButton onClick={() => setIsMatchPwHidden(true)}>
                        <BsFillEyeFill className=" pw_button_shown_color" />
                      </S.PasswordEyeButton>
                    )}
                  </S.PasswordWrap>
                </S.PasswordChangeWrap>
              ) : (
                <div> SNS 로그인 사용자입니다 </div>
              )}

              <SFormItem>
                <SFormItemHeader>
                  <SPGuideMessage>{isHereguidemessage !== '' && isHereguidemessage}</SPGuideMessage>
                </SFormItemHeader>
                <SFormItemBody>
                  <SFormItemBodySection>
                    <span>활동 선호 지역1</span>
                    <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} $prevValue={location} />
                  </SFormItemBodySection>
                  <SFormItemBodySection>
                    <span>활동 선호 지역2</span>
                    <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} $prevValue={location} />
                  </SFormItemBodySection>
                </SFormItemBody>
              </SFormItem>
              <S.EditSubmitButton type="submit" disabled={(validPwd && validPwdConfirm) || validLocation || imgFile !== null ? false : true}>
                수정
              </S.EditSubmitButton>
            </form>
          </S.Inner>
        </Container>
      </Section>
    </>
  );
};

export default EditProfileForm;

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

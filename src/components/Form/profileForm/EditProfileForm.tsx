import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { v4 } from 'uuid';
import { close, edit_photo } from '../../../assets';
// import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import supabase from '../../../supabase';
import { SPGuideMessage } from '../common/AuthForm.styled';
import SelectLocation from '../common/SelectLocation';
import { Container, ContentWrapper, Inner } from '../reviewForm/ReviewForm.styled';
import * as S from './ProfileForm.styled';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../../api/chat';
import { USER_PROFILE_QUERY_KEY } from '../../userInfo/UserInfo';
import { RootState } from '../../../redux/config/configStore';
import { Button } from '../../button/Button.styled';

// const GET_USER_QUERY_KEY = ['profiles'];
const EditProfileForm = () => {
  const dispatch = useDispatch();
  const loginUserId = useSelector((state: RootState) => state.user.user!.id);
  const userData = useQuery(USER_PROFILE_QUERY_KEY, () => getUserProfile(loginUserId));
  const user = userData.data;

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

  const [checkedGender, setCheckedGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [location, setLoaction] = useState({ sido1: '1지역 시/도 선택', gugun1: '1지역 구/군 선택', sido2: '2지역 시/도 선택', gugun2: '2지역 구/군 선택' });

  const changeNewpassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  // const onChangeGenderHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  //   if (event.target.name === 'female' || event.target.name === 'male') setCheckedGender(event.target.value);
  // };

  // TODO 변경할 프로필 이미지 미리보기
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
      makeVisiblePreviewImg(selectedFile);
    } else return false;
  };

  const makeVisiblePreviewImg = (selectedFile: File) => {
    if (selectedFile) {
      // setImgFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImg(reader.result);
        }
      };
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const updateProfilesInfo = async (e: React.FormEvent) => {
    const imgName = v4();
    e.preventDefault();
    try {
      if (password) {
        await supabase.auth.updateUser({ password: password });
        alert('비밀번호 변경이 완료되었습니다.');
      }
      await supabase.from('profiles').update({ location1_sido: location.sido1, location1_gugun: location.gugun1, location2_sido: location.sido2, location2_gugun: location.gugun2 }).eq('id', user?.id);
      if (imgFile) {
        await supabase.storage.from('avatars').upload(`profiles/${user!.id}/${imgName}`, imgFile);
        // TODO await 수정하기
        const { data } = await supabase.storage.from('avatars').getPublicUrl(`profiles/${user!.id}/${imgName}`);
        await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user?.id);
      }

      handleClose();
      alert('프로필 수정이 완료되었습니다.');
    } catch (error) {
      alert(`정보 수정 중 오류가 발생했습니다${error}`);
    }
  };

  return (
    <Container>
      <Inner>
        <ContentWrapper>
          <S.EditFormTop>
            <S.CloseBtn onClick={handleClose}>
              <img src={close} alt="close button" />
            </S.CloseBtn>
          </S.EditFormTop>
          <form onSubmit={updateProfilesInfo}>
            <S.ProfileImgBox>
              <S.ProfileImg src={previewImg?.toString() || user?.avatar_url || undefined} alt="" />
              <S.EditPhotoBtn>
                <img src={edit_photo} alt="이미지 교체 버튼" />
              </S.EditPhotoBtn>
              <S.EditInput className="edit-photo" type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
            </S.ProfileImgBox>
            <S.EditFormFlex>
              <p>이름</p>
              <div>{user?.username}</div>
            </S.EditFormFlex>
            <S.EditFormFlex>
              <p>생년월일</p>
              <div>{user?.birth}</div>
            </S.EditFormFlex>
            <S.EditFormFlex>
              <p>성별</p>
              <div>{user?.gender}</div>
            </S.EditFormFlex>
            <S.EditFormFlex>
              <p>이메일</p>
              <div>{user?.email}</div>
            </S.EditFormFlex>
            <S.PasswordChangeWrap>
              <S.ConfirmPass>
                {password.length > 6 && PWD_REGEX.test(password) ? (
                  <p>사용가능한 비밀번호 입니다</p>
                ) : password !== '' ? (
                  <p>6자 이상 영문 대소문자, 숫자, 특수문자를 포함해주세요</p>
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
                  <p>비밀번호가 다릅니다</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </S.ConfirmPass>
              <div>
                <p>비밀번호 변경</p>
                <S.EditInput type="password" name="password" value={password} onChange={changeNewpassword} />
              </div>

              <div>
                <p>비밀번호 확인</p>
                <S.EditInput type="password" name="confirmPassword" value={confirmPassword} onChange={changeConfirmPassword} />
              </div>
            </S.PasswordChangeWrap>

            <SFormItem>
              <SFormItemHeader>
                <SPGuideMessage>
                  {location.sido1 !== '시/도 선택' && location.sido2 !== '시/도 선택' && location.sido1 === location.sido2 && location.gugun1 === location.gugun2 && '중복 지역선택 불가'}
                  {(location.sido1 === '전체' || location.sido2 === '전체') && '지역1, 지역2 모두 특정지역 선택 필수'}
                </SPGuideMessage>
              </SFormItemHeader>
              <SFormItemBody>
                <SFormItemBodySection>
                  <span>활동 선호 지역1</span>
                  <SelectLocation $locationType={'locationType1'} $setLocation={setLoaction} />
                </SFormItemBodySection>
                <SFormItemBodySection>
                  <span>활동 선호 지역2</span>
                  <SelectLocation $locationType={'locationType2'} $setLocation={setLoaction} />
                </SFormItemBodySection>
              </SFormItemBody>
            </SFormItem>
            <Button style={{ marginTop: '30px' }} variant="solid" color={'primary'} size="Large" type="submit">
              수정
            </Button>
          </form>
        </ContentWrapper>
      </Inner>
    </Container>
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

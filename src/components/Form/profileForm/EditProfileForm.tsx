import React, { ChangeEvent, useState } from 'react';
import { Container, ContentWrapper, Inner } from '../reviewForm/ReviewForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/modules';
import { RootState } from '../../../redux/config/configStore';
import supabase from '../../../supabase';
import * as S from './ProfileForm.styled';
import { close } from '../../../assets';
import { v4 } from 'uuid';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  // console.log(user);
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

  const [checkedGender, setCheckedGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);

  const changeNewpassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'female' || event.target.name === 'male') setCheckedGender(event.target.value);
  };

  // TODO 변경할 프로필 이미지 미리보기
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files && files.length > 0) {
      const theFile = files[0];
      setImgFile(theFile);
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
      await supabase.from('profiles').update({ gender: checkedGender }).eq('id', user?.id);

      if (imgFile) {
        await supabase.storage.from('avatars').upload(`profiles/${user!.id}/${imgName}`, imgFile);

        // TODO await 수정하기
        const { data } = await supabase.storage.from('avatars').getPublicUrl(`profiles/${user!.id}/${imgName}`);
        console.log(data.publicUrl);
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
            <h2>내 정보 수정</h2>
            <S.CloseBtn onClick={handleClose}>
              <img src={close} alt="close button" />
            </S.CloseBtn>
          </S.EditFormTop>

          <form onSubmit={updateProfilesInfo}>
            <S.ProfileImg>
              <img src={user?.avatar_url || undefined} alt="" />
            </S.ProfileImg>
            <S.EditInput type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
            <S.EditFormFlex>
              <p>이름</p>
              <div>{user?.username}</div>
            </S.EditFormFlex>
            <S.EditFormFlex>
              <p>이메일</p>
              <div>{user?.email}</div>
            </S.EditFormFlex>
            <div>
              <p>비밀번호</p>
              <S.EditInput type="password" name="password" value={password} onChange={changeNewpassword} />
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
            </div>
            <div>
              <p>비밀번호 확인</p>
              <S.EditInput type="password" name="confirmPassword" value={confirmPassword} onChange={changeConfirmPassword} />
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
            </div>

            <S.EditFormFlex>
              <p>생년월일</p>
              <div>{user?.birth}</div>
            </S.EditFormFlex>
            <S.EditFormFlex>
              <p>성별</p>
              <div>
                <label htmlFor="female">
                  여성
                  <input type="radio" id="female" name="female" value="여성" checked={checkedGender === '여성'} onChange={onChangeHandler} />
                </label>
                <label htmlFor="male">
                  남성
                  <input type="radio" id="male" name="male" value="남성" checked={checkedGender === '남성'} onChange={onChangeHandler} />
                </label>
              </div>
            </S.EditFormFlex>
            <p>지역</p>
            {/* <span>선택1</span>
            <S.SDropdownField>
            <S.SDropdownWrapper>
              <S.SDropDownHeader id="location1SidoDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, sido1: !prev.sido1 }))}>
                <span>{location1.sido1}</span>
                <FaAngleDown />
              </S.SDropDownHeader>
              {isLocationOpen.sido1 && (
                <S.SOptionContainer $selectOptionsType={'location1'}>
                  <S.Select>
                    {cities.AREA0.map((option, index) => (
                      <S.SOption key={option} $selectedOption={location1.sido1 === option} onClick={() => selectLocation1Option(option, 'sido1', index.toString())}>
                        {option}
                      </S.SOption>
                    ))}
                  </S.Select>
                </S.SOptionContainer>
              )}
            </S.SDropdownWrapper>
            <S.SDropdownWrapper>
              <S.SDropDownHeader id="location1gugunDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, gugun1: !prev.gugun1 }))}>
                <span>{location1.gugun1}</span>
                <FaAngleDown />
              </S.SDropDownHeader>
              {isLocationOpen.gugun1 && (
                <S.SOptionContainer $selectOptionsType={'location1'}>
                  <S.Select>
                    {gugun1Options.map((option, index) => (
                      <S.SOption key={option} $selectedOption={location1.gugun1 === option} onClick={() => selectLocation1Option(option, 'gugun1', index.toString())}>
                        {option}
                      </S.SOption>
                    ))}
                  </S.Select>
                </S.SOptionContainer>
              )}
            </S.SDropdownWrapper>
          </S.SDropdownField>     
          <span>선택2</span>
          <S.SDropdownField>
            <S.SDropdownWrapper>
              <S.SDropDownHeader id="location2SidoDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, sido2: !prev.sido2 }))}>
                <span>{location2.sido2}</span>
                <FaAngleDown />
              </S.SDropDownHeader>
              {isLocationOpen.sido2 && (
                <S.SOptionContainer $selectOptionsType={'location2'}>
                  <S.Select>
                    {cities.AREA0.map((option, index) => (
                      <S.SOption key={option} $selectedOption={location2.sido2 === option} onClick={() => selectLocation2Option(option, 'sido2', index.toString())}>
                        {option}
                      </S.SOption>
                    ))}
                  </S.Select>
                </S.SOptionContainer>
              )}
            </S.SDropdownWrapper>
            <S.SDropdownWrapper>
              <S.SDropDownHeader id="location2gugunDropdown" onClick={() => setIsLocationOpen((prev) => ({ ...prev, gugun2: !prev.gugun2 }))}>
                <span>{location2.gugun2}</span>
                <FaAngleDown />
              </S.SDropDownHeader>
              {isLocationOpen.gugun2 && (
                <S.SOptionContainer $selectOptionsType={'location2'}>
                  <S.Select>
                    {gugun2Options.map((option, index) => (
                      <S.SOption key={option} $selectedOption={location2.gugun2 === option} onClick={() => selectLocation2Option(option, 'gugun2', index.toString())}>
                        {option}
                      </S.SOption>
                    ))}
                  </S.Select>
                </S.SOptionContainer>
              )}
            </S.SDropdownWrapper>
          </S.SDropdownField> */}
            <button type="submit">수정</button>
          </form>
        </ContentWrapper>
      </Inner>
    </Container>
  );
};

export default EditProfileForm;

import { useEffect, useRef, useState } from 'react';
import { BsBell } from 'react-icons/bs';
import { RiUserStarLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import { Tables } from '../../../supabase/database.types';
import * as S from './Header.styled';
import './headericon.css';

type TypeSiginUserNavProps = {
  $loginUser: Tables<'profiles'> | null;
};

const SigninUserNav: React.FC<TypeSiginUserNavProps> = ({ $loginUser }) => {
  const AuthNavInfoAreaRef = useRef<HTMLDivElement>(null);
  const [isOpenAuthNavInfoArea, setIsOpenAuthNavInfoArea] = useState(false);
  const navigate = useNavigate();
  const moveToRegisterTutorPage = () => navigate('/tutor-registration');
  const moveToMyPage = () => navigate('/mypage');
  const handleUserSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert('로그아웃 되었습니다');
      navigate('/');
    }
  };
  const toggleAuthNavInfoArea = () => {
    setIsOpenAuthNavInfoArea((prev) => !prev);
  };
  useEffect(() => {
    const handleOutsideClose = (event: MouseEvent) => {
      if (isOpenAuthNavInfoArea && !AuthNavInfoAreaRef.current?.contains(event.target as Node)) setIsOpenAuthNavInfoArea(false);
    };
    window.addEventListener('click', handleOutsideClose);
    return () => {
      window.removeEventListener('click', handleOutsideClose);
    };
  }, [isOpenAuthNavInfoArea]);
  return (
    <>
      {$loginUser?.role === 'student' && (
        <S.RegisterTutorBtnContainer>
          <S.BtnWholeBody onClick={moveToRegisterTutorPage}>
            <S.RightButton>
              <S.IconCover>
                <RiUserStarLine className="right_icon register_tutor_icon" />
              </S.IconCover>
            </S.RightButton>
          </S.BtnWholeBody>
        </S.RegisterTutorBtnContainer>
      )}

      <S.AlarmBtnContainer>
        <S.BtnWholeBody>
          <S.RightButton>
            <S.IconCover>
              <BsBell className="right_icon" />
            </S.IconCover>
          </S.RightButton>
        </S.BtnWholeBody>
      </S.AlarmBtnContainer>

      <S.AvatarBtnContainer ref={AuthNavInfoAreaRef}>
        <S.AvatarBtnWholeBody>
          <S.RightButton onClick={toggleAuthNavInfoArea}>
            <div>
              <S.ProfileImg src={$loginUser!.avatar_url || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="" />
            </div>
          </S.RightButton>

          {isOpenAuthNavInfoArea && (
            <S.AuthNavContainer>
              <S.AuthInfoSection>
                <S.AuthAvatarContainer>
                  <S.ProfileImg src={$loginUser!.avatar_url || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="" />
                </S.AuthAvatarContainer>
                <S.AuthProfileContainer>
                  <p>{$loginUser!.username || '이름 미확인'}</p>
                  <p>{$loginUser!.role}</p>
                </S.AuthProfileContainer>
              </S.AuthInfoSection>
              <S.PartitionLine />
              <S.AuthNavSection>
                <S.AuthNavItem
                  onClick={() => {
                    setIsOpenAuthNavInfoArea(false);
                    moveToMyPage();
                  }}
                >
                  <Link to="#">마이페이지</Link>
                </S.AuthNavItem>
                <S.AuthNavItem
                  onClick={() => {
                    setIsOpenAuthNavInfoArea(false);
                    handleUserSignOut();
                  }}
                >
                  <button>로그아웃</button>
                </S.AuthNavItem>
              </S.AuthNavSection>
            </S.AuthNavContainer>
          )}
        </S.AvatarBtnWholeBody>
      </S.AvatarBtnContainer>
    </>
  );
};

export default SigninUserNav;

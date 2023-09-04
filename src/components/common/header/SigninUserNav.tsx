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

  return (
    <>
      <S.RegisterTutorBtnContainer>
        <S.BtnWholeBody onClick={moveToRegisterTutorPage}>
          {/* 다른 header button이랑 크기 동일, hover시 gray, 원모양 w/h = 40px */}
          <S.RightButton>
            {/* semantic 기능 -감싸주기만 */}
            <S.IconCover>
              {/* 아이콘 모양 잡기 */}
              <RiUserStarLine className="right_icon register_tutor_icon" />
            </S.IconCover>
          </S.RightButton>
          {/* <div>
            <p></p>
          </div> */}
        </S.BtnWholeBody>
      </S.RegisterTutorBtnContainer>
      <S.AlarmBtnContainer>
        <S.BtnWholeBody>
          <S.RightButton>
            <S.IconCover>
              <BsBell className="right_icon" />
            </S.IconCover>
          </S.RightButton>
          {/* <div>
            <p></p>
          </div> */}
        </S.BtnWholeBody>
      </S.AlarmBtnContainer>
      <S.AvatarBtnContainer>
        <S.AvatarBtnWholeBody>
          <S.RightButton>
            <div>
              <S.ProfileImg src={$loginUser!.avatar_url || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="" />
            </div>
          </S.RightButton>
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
              <S.AuthNavItem onClick={moveToMyPage}>
                <Link to="#">마이페이지</Link>
              </S.AuthNavItem>
              <S.AuthNavItem onClick={handleUserSignOut}>
                <button>로그아웃</button>
              </S.AuthNavItem>
            </S.AuthNavSection>
          </S.AuthNavContainer>
        </S.AvatarBtnWholeBody>
      </S.AvatarBtnContainer>
    </>
  );
};

export default SigninUserNav;

import { BsBell } from 'react-icons/bs';
import { RiUserStarFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Tables } from '../../../supabase/database.types';
import * as S from './Header.styled';
import './headericon.css';

type TypeSiginUserNavProps = {
  $loginUser: Tables<'profiles'> | null;
};

const SigninUserNav: React.FC<TypeSiginUserNavProps> = ({ $loginUser }) => {
  const navigate = useNavigate();
  const moveToRegisterTutorPage = () => navigate('/tutor-registration');
  return (
    <>
      <S.RegisterTutorBtnContainer>
        <S.BtnWholeBody onClick={moveToRegisterTutorPage}>
          {/* 다른 header button이랑 크기 동일, hover시 gray, 원모양 w/h = 40px */}
          <S.RightButton>
            {/* semantic 기능 -감싸주기만 */}
            <S.IconCover>
              {/* 아이콘 모양 잡기 */}
              <RiUserStarFill className="right_icon register_tutor_icon" />
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
            <S.AuthInfoSection></S.AuthInfoSection>
            <S.PartitionLine />
            <div></div>
          </S.AuthNavContainer>
        </S.AvatarBtnWholeBody>
      </S.AvatarBtnContainer>
    </>
  );
};

export default SigninUserNav;

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { RiUserStarLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPendingTutorRegistInfo } from '../../../api/pendingTutorInfo';
import { PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY } from '../../../constants/query.constant';
import { openModal } from '../../../redux/modules';
import supabase from '../../../supabase';
import { Tables } from '../../../supabase/database.types';
import * as S from './Header.styled';
import './headericon.css';

type TypeSiginUserNavProps = {
  $loginUser: Tables<'profiles'> | null;
};

const SigninUserNav: React.FC<TypeSiginUserNavProps> = ({ $loginUser }) => {
  const dispatch = useDispatch();
  const AuthNavInfoAreaRef = useRef<HTMLDivElement>(null);
  const [isOpenAuthNavInfoArea, setIsOpenAuthNavInfoArea] = useState(false);
  const loginUserId: string | number = $loginUser!.id;
  const { data: pendingTutorRegistInfo } = useQuery(PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY, () => getPendingTutorRegistInfo(loginUserId), { enabled: !!$loginUser });

  const presentUrlPathname = window.location.pathname;

  const handleRetrieveTutorRegistInfo = () => {
    if ($loginUser && $loginUser?.id) {
      dispatch(openModal({ type: 'retrievePendingTutorRegistForm', targetId: $loginUser.id }));
    }
  };

  const navigate = useNavigate();

  const HandleClickChatNav = () => {
    if (presentUrlPathname === '/additional-information') {
      alert('추가 정보를 입력해야 채팅이용이 가능합니다~ 작성하시던 추가정보를 먼저 제출해주세요~');
      return false;
    }

    if (!$loginUser?.gender) {
      const wannaAddMoreInfo = window.confirm('소셜로그인을 하셨는데 아직 추가정보를 입력하지 않았다구요? 더 많은 기능을 이용하기 위해 추가정보등록이 필요합니다. 등록하시러 가시겠습니까?');
      if (wannaAddMoreInfo) {
        navigate('/additional-information');
      } else {
        return false;
      }
    } else {
      setIsOpenAuthNavInfoArea(false);
      moveToChatPage();
    }
  };
  const HandleClickRegisterTutorIcon = () => {
    if (presentUrlPathname === '/additional-information') {
      alert('추가 정보를 입력해야 튜터 등록이 가능합니다~ 작성하시던 추가정보를 먼저 제출해주세요~');
      return false;
    }

    if (!$loginUser?.gender) {
      const wannaAddMoreInfo = window.confirm('소셜로그인을 하셨는데 아직 추가정보를 입력하지 않았다구요? 더 많은 기능을 이용하기 위해 추가정보등록이 필요합니다. 등록하시러 가시겠습니까?');
      if (wannaAddMoreInfo) {
        navigate('/additional-information');
      } else {
        return false;
      }
    } else {
      if ($loginUser?.role === 'student' && !!pendingTutorRegistInfo) {
        return alert('관리자가 귀하의 튜터신청서를  검토중입니다');
      } else {
        return navigate('/tutor-registration');
      }
    }
  };
  const moveToMyPage = () => navigate('/mypage');
  const moveToChatPage = () => navigate('/chat');
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
          <S.BtnWholeBody onClick={HandleClickRegisterTutorIcon}>
            <S.RightButton>
              <S.IconCover>
                <RiUserStarLine className="right_icon register_tutor_icon" />
              </S.IconCover>
            </S.RightButton>
          </S.BtnWholeBody>
        </S.RegisterTutorBtnContainer>
      )}

      <S.AvatarBtnContainer ref={AuthNavInfoAreaRef}>
        <S.AvatarBtnWholeBody>
          <S.RightButton onClick={toggleAuthNavInfoArea}>
            <div>
              <S.ProfileImg src={$loginUser!.avatar_url || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="user profile " />
            </div>
          </S.RightButton>

          {isOpenAuthNavInfoArea && (
            <S.AuthNavContainer>
              <S.AuthInfoSection>
                <S.AuthAvatarContainer>
                  <S.ProfileImg src={$loginUser!.avatar_url || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt="user profile" />
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
                <S.AuthNavItem onClick={HandleClickChatNav}>
                  <Link to="#">1:1 채팅</Link>
                </S.AuthNavItem>
                {$loginUser?.role === 'student' && !!pendingTutorRegistInfo && (
                  <S.AuthNavItem
                    onClick={() => {
                      setIsOpenAuthNavInfoArea(false);
                      handleRetrieveTutorRegistInfo();
                    }}
                  >
                    <button>튜터변경 신청내역확인</button>
                  </S.AuthNavItem>
                )}
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

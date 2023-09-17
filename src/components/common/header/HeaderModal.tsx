import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPendingTutorRegistInfo } from '../../../api/pendingTutorInfo';
import { close } from '../../../assets';
import { PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { clearModal, openModal } from '../../../redux/modules';
import { Tables } from '../../../supabase/database.types';
import * as S from './Header.styled';

type HEADERMENUMOBILE = { title: string; path: string; parentPath: string }[];

const HeaderMenuMobile: HEADERMENUMOBILE = [
  { title: '튜터찾기', path: '/list', parentPath: 'list' },
  { title: '매칭후기', path: '/review', parentPath: 'review' },
  { title: '커뮤니티', path: '/community/free', parentPath: 'community' },
  { title: '고객센터', path: '/customer-service/announcements', parentPath: 'customer-service' },
];

type Props = {
  sideNavOpen: boolean;
  setSideNavOpen: Dispatch<SetStateAction<boolean>>;
  loginUser: Tables<'profiles'>;
  signOut: () => void;
};

const HeaderModal = ({ sideNavOpen, setSideNavOpen, loginUser, signOut }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { targetId, isConfirm, modalId } = useSelector((state: RootState) => state.modal);
  // 튜터신청 내역 확인
  const { data: pendingTutorRegistInfo } = useQuery(PENDING_TUTOR_REGISTRATION_INFO_QUERY_KEY, () => getPendingTutorRegistInfo(loginUser.id), { enabled: !!loginUser });

  const parentPathHere = useLocation().pathname.split('/')[1];
  const [pathKeyword, setPathKeyword] = useState('/');
  const [isOpenAuthNavInfoArea, setIsOpenAuthNavInfoArea] = useState(false);

  const moveToChatPage = () => navigate('/chat');
  const presentUrlPathname = window.location.pathname;

  const closeModal = () => {
    setSideNavOpen((pre) => !pre);
  };

  // 튜터 신청
  const HandleClickRegisterTutorIcon = () => {
    // if (presentUrlPathname === '/additional-information') {
    //   dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '추가 정보를 입력해야 튜터 등록이 가능합니다. 작성하시던 추가정보를 먼저 제출해주세요.' }));
    //   return false;
    // }
    closeModal();

    // if (loginUser?.role === 'student' && !!pendingTutorRegistInfo) {
    //       return dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '관리자가 귀하의 튜터신청서를  검토중입니다' }));
    //     } else {
    //       return navigate('/tutor-registration');
    //     }
    //   }
  };

  // 채팅
  const HandleClickChatNav = () => {
    // 추가인증이 없으면
    if (loginUser?.gender === null) {
      dispatch(openModal({ type: 'confirm', message: '소셜로그인 사용자는 추가 정보를 입력해야 합니다. 더 많은 기능을 이용하기 위해 추가정보를 등록하러 가시겠습니까?', modalId: 'HandleClickChatNav' }));
    } else {
      moveToChatPage();
    }

    // 제출중이엇다면?
    // setIsOpenAuthNavInfoArea(false);
    // if (presentUrlPathname === '/additional-information') {
    //   dispatch(displayToastAsync({ id: Date.now(), type: 'info', message: '추가 정보를 입력해야 채팅이용이 가능합니다! 작성하시던 추가정보를 먼저 제출해주세요!' }));
    //   return false;
    // }
  };
  useEffect(() => {
    if (isConfirm && modalId === 'HandleClickChatNav') {
      navigate('/additional-information');
      dispatch(clearModal());
    }
  }, [isConfirm, targetId]);

  useEffect(() => {
    setPathKeyword(parentPathHere);
  }, [parentPathHere]);
  return (
    <S.MobileContainer $sideNavOpen={sideNavOpen} onClick={(pre) => setSideNavOpen(!pre)}>
      <S.MobileInner
        $sideNavOpen={sideNavOpen}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <S.MobileLogoDiv>
          <S.NavModalCloseBtn onClick={(pre) => setSideNavOpen(!pre)}>
            <img src={close} alt="menu close btn" />
          </S.NavModalCloseBtn>

          <S.SignMobileWrapper>
            {loginUser ? (
              <>
                <S.ButtonMyPage to={'/mypage'} onClick={() => closeModal()}>
                  마이페이지
                </S.ButtonMyPage>
                <button
                  onClick={() => {
                    signOut();
                    navigate('/');
                    setSideNavOpen(false);
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSideNavOpen(false);
                    navigate('/signin');
                  }}
                >
                  로그인
                </button>
                <button
                  onClick={() => {
                    setSideNavOpen(false);
                    navigate('/signup');
                  }}
                >
                  회원가입
                </button>
              </>
            )}
          </S.SignMobileWrapper>
        </S.MobileLogoDiv>
        <S.MobileMenuWrapper>
          <nav>
            <S.GnbMobileList>
              {HeaderMenuMobile.map((item, index) => (
                <S.GnbMobileItem key={index}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    {item.title}
                  </Link>
                </S.GnbMobileItem>
              ))}
            </S.GnbMobileList>
            {loginUser && (
              <S.GnbMobileList>
                <S.GnbMobileItem onClick={HandleClickChatNav}>
                  <Link
                    to={'/chat'}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    1:1 채팅
                  </Link>
                </S.GnbMobileItem>

                {loginUser?.role === 'student' && (
                  <S.GnbMobileItem onClick={HandleClickRegisterTutorIcon}>
                    <Link to={'/tutor-registration'}>튜터신청</Link>
                  </S.GnbMobileItem>
                )}
              </S.GnbMobileList>
            )}
          </nav>
        </S.MobileMenuWrapper>
      </S.MobileInner>
    </S.MobileContainer>
  );
};

export default HeaderModal;

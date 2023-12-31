import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { close } from '../../../assets';
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
  loginUser: Tables<'profiles'> | null;
  signOut: () => void;
};

const HeaderModal = ({ sideNavOpen, setSideNavOpen, loginUser, signOut }: Props) => {
  const parentPathHere = useLocation().pathname.split('/')[1];
  const [pathKeyword, setPathKeyword] = useState('/');
  const navigate = useNavigate();
  const closeModal = (page: string) => {
    navigate(page);
    setSideNavOpen((pre) => !pre);
  };

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
                <button onClick={() => closeModal('/mypage')}>마이페이지</button>
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
            <S.GnbMobile>
              {HeaderMenuMobile.map((item, index) => (
                <S.GnbMobileItemList key={index}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      closeModal(item.path);
                    }}
                  >
                    <S.NavTitle $pathKeyword={pathKeyword} $parentPath={item.parentPath}>
                      {item.title}
                    </S.NavTitle>
                  </Link>
                </S.GnbMobileItemList>
              ))}
            </S.GnbMobile>
          </nav>
        </S.MobileMenuWrapper>
      </S.MobileInner>
    </S.MobileContainer>
  );
};

export default HeaderModal;

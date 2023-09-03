import * as S from './Header.styled';
import { Dispatch, SetStateAction } from 'react';
import { tutorang_logo } from '../../../assets';
import { Tables } from '../../../supabase/database.types';
import { useNavigate } from 'react-router-dom';

type HEADERMENUMOBILE = { title: string; path: string }[];

const HeaderMenuMobile: HEADERMENUMOBILE = [
  { title: '튜터찾기', path: '/list' },
  { title: '매칭후기', path: '/' },
  { title: '커뮤니티', path: '/' },
  { title: '고객센터', path: '/' },
];

type Props = {
  sideNavOpen: boolean;
  setSideNavOpen: Dispatch<SetStateAction<boolean>>;
  loginUser: Tables<'profiles'> | null;
  signOut: () => void;
};

const HeaderModal = ({ sideNavOpen, setSideNavOpen, loginUser, signOut }: Props) => {
  const navigate = useNavigate();
  return (
    <S.MobileContainer $sideNavOpen={sideNavOpen} onClick={(pre) => setSideNavOpen(!pre)}>
      <S.MobileInner
        $sideNavOpen={sideNavOpen}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <S.MobileLogoDiv>
          <span>
            <img src={tutorang_logo} alt="logo"></img>
            <h1>튜터랑</h1>
          </span>

          <S.SignMobileWrapper>
            {loginUser ? (
              <>
                {' '}
                <button onClick={() => navigate('/mypage')}>마이페이지</button>
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
                {' '}
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
                <S.GnbMobileItemList>
                  <S.NavLinkSt key={index} to={item.path}>
                    {item.title}
                  </S.NavLinkSt>
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

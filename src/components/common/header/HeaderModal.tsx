import * as S from './Header.styled';
import styled, { keyframes } from 'styled-components';
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
    <MobileContainer $sideNavOpen={sideNavOpen} onClick={(pre) => setSideNavOpen(!pre)}>
      <MobileInner
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
      </MobileInner>
    </MobileContainer>
  );
};

export default HeaderModal;

const slideOpen = keyframes`
	0%{
      transform: translateX(300px);


    }
    100%{
      transform: translateX(0);

      

    }
`;

const slideClose = keyframes`
    0%{
      transform: translateX(0);
      visibility: visible;
    }
    100%{
      transform: translateX(300px);
      visibility: hidden;

    }
`;

const backgroundToGray = keyframes`
    0%{
      opacity: 0;
      visibility: hidden;
    }
    100%{
      opacity: 1;
      visibility: visible;
    }
`;

const backgroundToWhite = keyframes`
	0%{
      visibility: visible;
      opacity: 1;
    }
    100%{
        visibility: hidden;
        opacity: 0;
    }
`;

const MobileContainer = styled.div<{ $sideNavOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #43434371;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
  visibility: ${(props) => (props.$sideNavOpen ? 'visible' : 'hidden')};
  animation: ${(props) => (props.$sideNavOpen ? backgroundToGray : backgroundToWhite)} 0.8s ease-in-out;
`;

const MobileInner = styled.div<{ $sideNavOpen: boolean }>`
  width: 280px;
  height: 100vh;
  position: fixed;
  right: 0;
  background-color: #ffffff;
  animation: ${(props) => (props.$sideNavOpen ? slideOpen : slideClose)} 0.8s ease-in-out;
`;

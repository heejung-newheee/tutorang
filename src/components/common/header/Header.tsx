import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { tutorInfoJoin } from '../../../api/tutor';
import { logo04 } from '../../../assets';
import { MATCHING_QUERY_KEY, TUTOR_INFO_JOIN_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { matchingList } from '../../../redux/modules/matching';
import { tutorInfo } from '../../../redux/modules/tutorSlice';
import supabase from '../../../supabase';
import * as S from './Header.styled';
import HeaderModal from './HeaderModal';
import SigninUserNav from './SigninUserNav';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: '튜터찾기', path: '/list' },
  { title: '매칭후기', path: '/review' },
];

const Header = () => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginUser = useSelector((state: RootState) => state.user.user);
  const { data: tutor } = useQuery(TUTOR_INFO_JOIN_QUERY_KEY, tutorInfoJoin);
  const { data: matchData } = useQuery(MATCHING_QUERY_KEY, () => getMatchData());

  useEffect(() => {
    if (matchData) {
      dispatch(matchingList(matchData));
    }
    if (tutor) {
      dispatch(tutorInfo(tutor));
    }
  }, [tutor, matchData, dispatch]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  const preventScroll = (e: Event) => {
    e.preventDefault();
  };
  useEffect(() => {
    const { body } = document;
    if (sideNavOpen) {
      body.addEventListener('wheel', preventScroll, { passive: false });
    }
    return () => {
      body.removeEventListener('wheel', preventScroll);
    };
  }, [sideNavOpen]);

  return (
    <>
      <S.NavContainer>
        <S.WidthLimitContainer>
          <S.HeaderLeft>
            <S.LogoWrap to="/">
              <S.NavLogoImg src={logo04} alt="logo"></S.NavLogoImg>
              {/* <S.LogoH1>튜터랑</S.LogoH1> */}
            </S.LogoWrap>
            {/* 채팅 다른 곳으로 뺄꺼라 지금 당장은 HeaderMenu가 하나밖에 없어서 map 돌릴 필요가 없지만 곧 다른 카테고리도 넣을거라 일단 map 부분은 수정 안하고 남겨두겠습니다! */}
            <S.Gnb>
              {HeaderMenu.map((item, index) => (
                <S.NavLinkSt key={index} to={item.path}>
                  {item.title}
                </S.NavLinkSt>
              ))}
            </S.Gnb>
          </S.HeaderLeft>

          <S.MobileLogo to="/">
            <div>
              <S.NavLogoImg src={logo04} alt="logo"></S.NavLogoImg>
            </div>
          </S.MobileLogo>

          <S.Hamburger onClick={() => setSideNavOpen(!sideNavOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill=" #fe902f" height="1.2em" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </S.Hamburger>

          <HeaderModal sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} loginUser={loginUser} signOut={signOut} />
          <S.LoginBtn>
            {loginUser ? (
              <>
                <SigninUserNav $loginUser={loginUser} />
              </>
            ) : (
              <NavLink to="/signin">
                <S.LoginSignUpDiv>
                  <span>로그인</span>
                </S.LoginSignUpDiv>
              </NavLink>
            )}
          </S.LoginBtn>
        </S.WidthLimitContainer>
      </S.NavContainer>
    </>
  );
};

export default Header;

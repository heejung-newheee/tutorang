import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { tutorInfoJoin } from '../../../api/tutor';
import { logo04, mobileNabBtn } from '../../../assets';
import { MATCHING_QUERY_KEY, TUTOR_INFO_JOIN_QUERY_KEY } from '../../../constants/query.constant';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import { matchingList } from '../../../redux/modules/matching';
import { tutorInfo } from '../../../redux/modules/tutorSlice';
import supabase from '../../../supabase';
import * as S from './Header.styled';
import HeaderModal from './HeaderModal';
import SigninUserNav from './SigninUserNav';

type HEADERMENU = { title: string; path: string; parentPath: string }[];

const HeaderMenu: HEADERMENU = [
  { title: '튜터찾기', path: '/list', parentPath: 'list' },
  { title: '매칭후기', path: '/review', parentPath: 'review' },
  { title: '커뮤니티', path: '/community/free/?q=1', parentPath: 'community' },
  { title: '고객센터', path: '/customer-service/announcements', parentPath: 'customer-service' },
];

const Header = () => {
  const parentPathHere = useLocation().pathname.split('/')[1];
  const [pathKeyword, setPathKeyword] = useState('/');

  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

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

    if (error) dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: error.message }));
    dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '로그아웃 되었습니다' }));
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

  useEffect(() => {
    setPathKeyword(parentPathHere);
  }, [parentPathHere]);

  return (
    <>
      <S.NavContainer>
        <S.WidthLimitContainer>
          <S.HeaderLeft>
            <S.LogoWrap to="/">
              <S.NavLogoImg src={logo04} alt="logo"></S.NavLogoImg>
            </S.LogoWrap>
            <S.Gnb>
              {HeaderMenu.map((item, index) => (
                <Link key={index} to={item.path}>
                  <S.NavTitle $pathKeyword={pathKeyword} $parentPath={item.parentPath}>
                    {item.title}
                  </S.NavTitle>
                </Link>
              ))}
            </S.Gnb>
          </S.HeaderLeft>

          <S.MobileLogo to="/">
            <div>
              <S.NavLogoImg src={logo04} alt="logo"></S.NavLogoImg>
            </div>
          </S.MobileLogo>

          <S.Hamburger onClick={() => setSideNavOpen(!sideNavOpen)}>
            <img src={mobileNabBtn} alt="mobile menu btn" />
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

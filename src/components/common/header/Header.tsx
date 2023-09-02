import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { matchingList } from '../../../redux/modules/matching';
import { tutorInfoJoin } from '../../../api/tutor';
import { tutorInfo } from '../../../redux/modules/tutorSlice';
import { tutorang_logo } from '../../../assets';
import supabase from '../../../supabase';
import * as S from './Header.styled';
import { RootState } from '../../../redux/config/configStore';
import HeaderModal from './HeaderModal';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: '튜터찾기', path: '/list' },
  { title: '채팅', path: '/chat' },
];

const Header = () => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const { data: tutor } = useQuery(['tutor_info_join'], tutorInfoJoin);

  // matching 테이블 모든 데이터
  const { data: matchData } = useQuery(['matching'], () => getMatchData());
  useEffect(() => {
    if (matchData) {
      dispatch(matchingList(matchData));
    }
    if (tutor) {
      dispatch(tutorInfo(tutor));
    }
  }, [tutor, matchData, dispatch]);

  // TODO 로그아웃 함수 --> 일단은 main에 넣어둠
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  //스크롤 방지
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
              <S.NavLogoImg src={tutorang_logo} alt="logo"></S.NavLogoImg>
              <S.LogoH1>튜터랑</S.LogoH1>
            </S.LogoWrap>
            <S.Gnb>
              {HeaderMenu.map((item, index) => (
                <S.NavLinkSt key={index} to={item.path}>
                  {item.title}
                </S.NavLinkSt>
              ))}
            </S.Gnb>
          </S.HeaderLeft>
          {/* 미디어쿼리 */}
          <S.MobileLogo to="/">
            <div>
              <S.NavLogoImg src={tutorang_logo} alt="logo"></S.NavLogoImg>
              튜터랑
            </div>
          </S.MobileLogo>

          <S.Hamburger onClick={() => setSideNavOpen(!sideNavOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill=" #fe902f" height="1.2em" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </S.Hamburger>

          {/* {sideNavOpen ? <HeaderModal sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} loginUser={loginUser} signOut={signOut} /> : null} */}
          <HeaderModal sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} loginUser={loginUser} signOut={signOut} />
          {/* 미디어쿼리 */}
          <S.LoginBtn>
            {loginUser ? (
              <>
                <Link to="/mypage">
                  <img style={{ width: 35, borderRadius: '50%' }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" />
                </Link>
                <S.LoginBtnSignUp
                  onClick={() => {
                    signOut();
                    navigate('/');
                  }}
                >
                  로그아웃
                </S.LoginBtnSignUp>
              </>
            ) : (
              <NavLink to="/signin">
                <S.LoginSignUpDiv>
                  <span>로그인</span> <span>회원가입</span>
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

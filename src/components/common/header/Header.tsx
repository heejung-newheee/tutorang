import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { matchingList } from '../../../redux/modules/matching';
import { tutorInfoJoin } from '../../../api/tutor';
import { tutorInfo } from '../../../redux/modules/tutorSlice';
import logo from '../../../assets/logo.png';
import supabase from '../../../supabase';
import * as S from './Header.styled';
import { openModal } from '../../../redux/modules';
import { RootState } from '../../../redux/config/configStore';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: '튜터찾기', path: '/list' },
  { title: '채팅', path: '/chat' },
];

const Header = () => {
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
  //모달
  const handleHiddenDiv = () => {
    dispatch(openModal({ type: 'navbabr' }));
  };

  return (
    <>
      <S.NavContainer>
        <S.WidthLimitContainer>
          <S.HeaderLeft>
            <S.LogoWrap to="/">
              <S.NavLogoImg src={logo} alt="logo"></S.NavLogoImg>
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
          <S.MiddleLogo to="/">
            <div>
              <S.NavLogoImg src={logo} alt="logo"></S.NavLogoImg>
              튜터랑
            </div>
          </S.MiddleLogo>

          <S.Hamberger onClick={handleHiddenDiv}>
            <svg xmlns="http://www.w3.org/2000/svg" fill=" #fe902f" height="1.2em" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </S.Hamberger>
          {/* <S.HiddenBarDiv></S.HiddenBarDiv> */}

          {/* 미디어쿼리 */}
          <S.LoginBtn>
            {loginUser ? (
              <>
                <Link to="/mypage">마이페이지 </Link>
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
              <NavLink to="/signin">로그인 | 회원가입</NavLink>
            )}
          </S.LoginBtn>
        </S.WidthLimitContainer>
      </S.NavContainer>
    </>
  );
};

export default Header;

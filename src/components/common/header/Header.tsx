import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { fetchData } from '../../../api/user';
import { matchingList } from '../../../redux/modules/matching';
import { tutorInfoJoin } from '../../../api/tutor';
import { tutorInfo } from '../../../redux/modules/tutorSlice';
import { setUser } from '../../../redux/modules/user';
import supabase from '../../../supabase';
import * as Styled from './Header.styled';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: 'Home', path: '/' },
  { title: '튜텨찾기', path: '/list' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: allUser, isLoading: userIsLoading, isError: userIsError } = useQuery(['profiles'], fetchData);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor_info_join'], tutorInfoJoin);

  // matching 테이블 모든 데이터
  const { data: matchData, isLoading, isError } = useQuery(['matching'], () => getMatchData());
  // console.log('matchData', matchData);
  // console.log('tutor_info_join', tutor);

  const [email, setEmail] = useState<string>();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setEmail(user?.email);
  };
  const user = allUser?.find((item) => {
    return item.email === email;
  });

  useEffect(() => {
    getUser();
    if (user) {
      dispatch(setUser(user));
    }
    if (matchData) {
      dispatch(matchingList(matchData));
    }
    if (tutor) {
      dispatch(tutorInfo(tutor));
    }
  }, [user, matchData, tutor, dispatch]);

  const handleHome = () => {
    navigate('/');
  };

  // TODO 로그아웃 함수 --> 일단은 main에 넣어둠
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  if (userIsLoading) {
    return <div>로딩중~~~~~~~~~~~스피너~~</div>;
  }
  if (userIsError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  return (
    <>
      <Styled.NavContainer>
        <Styled.WidthLimitContainer>
          <Styled.LogoWrap>
            {/* <Styled.NavLogoImg src="" alt="logo"></Styled.NavLogoImg>  */}
            <h1 onClick={handleHome}>Logo</h1>
            {HeaderMenu.map((item, index) => (
              <Styled.NavLinkSt key={index} to={item.path}>
                {item.title}
              </Styled.NavLinkSt>
            ))}
          </Styled.LogoWrap>
          {/* 미디어쿼리 */}
          <Styled.Hamberger>=</Styled.Hamberger>
          <Styled.MiddleLogo onClick={handleHome}>Logo</Styled.MiddleLogo>
          {/* 미디어쿼리 */}
          <Styled.LoginBtn>
            <Link to="/mypage">마이페이지 </Link>
            <NavLink to="/signin">로그인 | 회원가입</NavLink>
            <span onClick={() => signOut()}>LogOut</span>
          </Styled.LoginBtn>
        </Styled.WidthLimitContainer>
      </Styled.NavContainer>
    </>
  );
};

export default Header;

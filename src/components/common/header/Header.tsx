import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Styled from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../supabase';
import { setUser } from '../../../redux/modules/user';
import { fetchData } from '../../../api/user';
import { getMatchData } from '../../../api/match';
import { matchingList } from '../../../redux/modules/matching';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: 'Home', path: '/' },
  { title: '튜텨찾기', path: '/list' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: allUser, isLoading: userIsLoading, isError: userIsError } = useQuery(['profiles'], fetchData);

  const { data: matchData, isLoading, isError } = useQuery(['matching'], () => getMatchData());
  console.log('matchData', matchData);

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
  }, [user, dispatch]);

  const handleHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div>로딩중~~~~~~~~~~~스피너~~</div>;
  }
  if (isError) {
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
            <NavLink to="/signin">로그인 | 회원가입</NavLink>
            <span>LogOut</span>
          </Styled.LoginBtn>
        </Styled.WidthLimitContainer>
      </Styled.NavContainer>
    </>
  );
};

export default Header;

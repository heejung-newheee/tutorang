<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
=======
>>>>>>> fb337fb3ad2e54d1dfc6766c700f2f79e4b963eb
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMatchData } from '../../../api/match';
import { fetchData } from '../../../api/user';
import { matchingList } from '../../../redux/modules/matching';
<<<<<<< HEAD
import logo from '../../../assets/logo.png';
=======
import { setUser } from '../../../redux/modules/user';
import supabase from '../../../supabase';
import * as Styled from './Header.styled';
>>>>>>> fb337fb3ad2e54d1dfc6766c700f2f79e4b963eb

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: 'Home', path: '/' },
  { title: '튜텨찾기', path: '/list' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: allUser, isLoading: userIsLoading, isError: userIsError } = useQuery(['profiles'], fetchData);
  console.log(userIsError, userIsLoading);
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

  // TODO 로그아웃 함수 --> 일단은 main에 넣어둠
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  if (isLoading) {
    return <div>로딩중~~~~~~~~~~~스피너~~</div>;
  }
  if (isError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  return (
    <>
      <S.NavContainer>
        <S.WidthLimitContainer>
          <S.LogoWrap>
            <S.NavLogoImg src={logo} alt="logo"></S.NavLogoImg>
            <h1 onClick={handleHome}>튜터랑</h1>
            {HeaderMenu.map((item, index) => (
              <S.NavLinkSt key={index} to={item.path}>
                {item.title}
              </S.NavLinkSt>
            ))}
          </S.LogoWrap>
          {/* 미디어쿼리 */}
          <S.Hamberger>=</S.Hamberger>
          <S.MiddleLogo onClick={handleHome}>Logo</S.MiddleLogo>
          {/* 미디어쿼리 */}
<<<<<<< HEAD
          <S.LoginBtn>
            <NavLink to="/signin">로그인</NavLink>
            <NavLink to="/signup">
              <S.LoginBtnSignUp>회원가입</S.LoginBtnSignUp>
            </NavLink>
            {/* <span>LogOut</span> */}
          </S.LoginBtn>
        </S.WidthLimitContainer>
      </S.NavContainer>
=======
          <Styled.LoginBtn>
            <NavLink to="/signin">로그인 | 회원가입</NavLink>
            <span onClick={() => signOut()}>LogOut</span>
          </Styled.LoginBtn>
        </Styled.WidthLimitContainer>
      </Styled.NavContainer>
>>>>>>> fb337fb3ad2e54d1dfc6766c700f2f79e4b963eb
    </>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Styled from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../supabase';
import { setUser } from '../../../redux/modules/user';
import { fetchData } from '../../../api/user';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: 'Home', path: '/' },
  { title: '튜텨찾기', path: '/list' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: allUser, isLoading: userIsLoading, isError: userIsError } = useQuery(['profiles'], fetchData);
  const [email, setEmail] = useState<string>();

  // const dd = supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session);
  // });
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
  }, [user, dispatch]);

  const handleHome = () => {
    navigate('/');
  };

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

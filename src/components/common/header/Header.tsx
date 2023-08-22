import * as Styled from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

type HEADERMENU = { title: string; path: string }[];

const HeaderMenu: HEADERMENU = [
  { title: 'Home', path: '/' },
  { title: '튜텨찾기', path: '/list' },
];

const Header = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  // style={({ isActive }) => (isActive ? { color: 'red' } : {})}
  return (
    <>
      <Styled.NavContainer>
        <Styled.WidthLimitContainer>
          <Styled.LogoWrap>
            {/* <Styled.NavLogoImg src="" alt="로고"></Styled.NavLogoImg>  */}
            <div onClick={handleHome}>Logo</div>
            {HeaderMenu.map((item, index) => (
              // <Styled.NextLogo key={index}>
              <Styled.NavLinkSt to={item.path}>{item.title}</Styled.NavLinkSt>
              // </Styled.NextLogo>
            ))}
          </Styled.LogoWrap>

          <Styled.LoginBtn>
            <span>LogIn / SingIn</span>
            <span>LogOut</span>
          </Styled.LoginBtn>
        </Styled.WidthLimitContainer>
      </Styled.NavContainer>
    </>
  );
};

export default Header;

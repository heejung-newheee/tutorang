import { useState } from 'react';
import * as Styled from './Header.styled';

type HEADERMENU = string[];

const HeaderMenu: HEADERMENU = ['Home', '튜텨찾기'];

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleSelectedMenu = (item: string) => {
    setSelectedMenu(item);
  };
  return (
    <>
      <Styled.NavContainer>
        <Styled.WidthLimitContainer>
          <Styled.LogoWrap>
            {/* <Styled.NavLogoImg src="" alt="로고"></Styled.NavLogoImg>  */}
            <div>Logo</div>
            {HeaderMenu.map((item) => (
              <Styled.NextLogo $selectedMenu={selectedMenu === item ? true : false}>
                <span onClick={() => handleSelectedMenu(item)}>{item}</span>
              </Styled.NextLogo>
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

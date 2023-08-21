import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100vw;
  height: auto;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const WidthLimitContainer = styled.div`
  max-width: 1200px;
  height: 60px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: saddlebrown;
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLogoImg = styled.img`
  width: auto;
  height: 20px;
`;

export const NextLogo = styled.span<{ $selectedMenu: boolean }>`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  opacity: ${(props) => (props.$selectedMenu ? 1 : 0.6)};

  &:hover {
    opacity: 1;
  }

  span {
    margin: 0 5px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 15px;
  }
`;

export const LoginBtn = styled.div`
  cursor: pointer;
  color: white;
`;

import * as S from './Header.styled';
import styled, { keyframes } from 'styled-components';
import { closeModal } from '../../../redux/modules';
import { useDispatch } from 'react-redux';

const HeaderModal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalContainer onClick={handleClose}>
      <div
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <S.MobileMenuWrapper>
          <S.SignMobileWrapper>
            <button>로그인</button>
            <button>로그아웃</button>
          </S.SignMobileWrapper>
          <nav>
            <S.GnbMobile>
              <S.GnbMobileItem>튜터찾기</S.GnbMobileItem>
              <S.GnbMobileItem>매칭후기</S.GnbMobileItem>
              <S.GnbMobileItem>매칭후기</S.GnbMobileItem>
              <S.GnbMobileItem>커뮤니티</S.GnbMobileItem>
              <S.GnbMobileItem>고객센터</S.GnbMobileItem>
            </S.GnbMobile>
          </nav>
        </S.MobileMenuWrapper>
      </div>
    </ModalContainer>
  );
};

export default HeaderModal;

const slide = keyframes`
	0%{
    transform: translate(0px, -50%);
    }
    100%{
      transform: translate(-140px, -50%);
    }
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 999999;
  top: 50%;
  left: 50%;
  transform: translate(-140px, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: ${slide} 0.5s ease-in-out forwards;

  & > div {
    width: 280px;
    height: 100vh;
    background-color: #ffffff;
  }
`;

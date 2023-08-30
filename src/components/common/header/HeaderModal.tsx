import styled, { keyframes } from 'styled-components';
import { closeModal } from '../../../redux/modules';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/logo.png';

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
        <div>
          {' '}
          <div>
            <img src={logo} alt="logo"></img>
            <h1>Logo</h1>
            <div>
              <li>튜터찾기</li>
              <li>매칭후기</li>
              <li>매칭후기</li>
              <li>커뮤니티</li>
              <li>고객센터</li>
            </div>
          </div>
          <div>
            <button>login</button>
            <button>logout</button>
          </div>
        </div>
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

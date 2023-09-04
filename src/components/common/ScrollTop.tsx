import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { arrow_top } from '../../assets';

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      setVisible(window.scrollY > 500);
    };
    document.onscroll = handleShowButton;
    return () => {
      document.onscroll = null;
    };
  }, []);
  return (
    <div>
      {visible && (
        <div id="scrolltop">
          <StTopBtn onClick={scrollToTop} type="button">
            <img src={arrow_top} alt="home top button" />
          </StTopBtn>
        </div>
      )}
    </div>
  );
};

export default ScrollTop;

const StTopBtn = styled.button`
  border: 0;
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.3s;
  img {
    width: 100%;
  }
`;

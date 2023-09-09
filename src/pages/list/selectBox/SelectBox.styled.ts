import styled, { keyframes } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const FilterContainer = styled.div`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0 0 8px 8px;
`;

export const LocationDiv = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 40px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  background-color: ${colors.primary};
  color: ${colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;

  & > img {
    height: 15px;
    margin-right: 10px;
  }
`;

export const FilterStart = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.gray_100};

  & > img {
    height: 15px;
    margin-right: 10px;
  }
`;

export const FilterBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 30px;
  display: flex;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterUl = styled.ul`
  width: 100%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 30px;
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterLi = styled.li<{ $isIn: boolean }>`
  height: 34px;
  padding: 0 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border: 1px solid ${colors.gray_200};
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  cursor: pointer;

  border-color: ${(props) => (props.$isIn === true ? `${colors.primary}` : `${colors.gray_200}`)};
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

export const InnerHidden = styled.div<{ $isChevronOpen: boolean; $dddddd: boolean }>`
  width: 100%;
  margin: 20px 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  animation: ${(props) => (props.$isChevronOpen ? slideDown : slideUp)} 1s ease;

  & > div {
    & > input {
      cursor: pointer;
    }
    & > label {
      cursor: pointer;
    }
  }
  @media all and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const InnerHiddenPrice = styled.div<{ $isChevronOpen: boolean; $dddddd: boolean }>`
  width: 100%;
  margin: 30px 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  animation: ${(props) => (props.$isChevronOpen ? slideDown : slideUp)} 1s ease;

  & > div {
    padding: 10px;

    & > input {
      cursor: pointer;
    }
    & > label {
      cursor: pointer;
    }
  }

  @media all and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PriceClassType = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: 800;
  color: ${colors.primary};

  & > div > span {
    border-left: 3px solid ${colors.primary};
    padding-left: 5px;
    cursor: pointer;
  }
`;

export const FilterBar = styled.div`
  width: 100%;
  height: 55px;
  padding: 0 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FiterWrap = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FiterWrapButton = styled.div`
  padding: 6px 12px;
  margin-right: 9px;
  display: flex;
  align-items: center;
  display: block;
  border: 1px solid ${colors.primary};
  border-radius: 20px;
  font-size: 14px;
  color: ${colors.white};
  background-color: ${colors.primary};

  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > svg {
    margin-left: 5px;
    cursor: pointer;
  }
`;

export const ResetDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.white};
  box-shadow: 0px 0px 20px 20px ${colors.white};
  cursor: pointer;
  z-index: 1;
`;

export const ChevronSpan = styled.span<{ $chevron: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$chevron === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

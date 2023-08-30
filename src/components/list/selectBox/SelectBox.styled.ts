import styled from 'styled-components';

export const FilterBox = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  height: auto;
  display: flex;
  overflow: scroll;
  padding: 0 30px;

  /* @media all and (max-width: 1200px) {
    padding: 0 10px;
  } */
`;

export const InnerBox = styled.div<{ $isIn: boolean }>`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid black;
  white-space: nowrap;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border-color: ${(props) => (props.$isIn === true ? '#FE902F' : '#dadce0')};
  position: relative;
`;

export const InnerHidden = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* background-color: #f5f3f3; */
  white-space: nowrap;
  margin: 20px 0;
  padding: 0 20px;

  @media all and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > div {
    width: 50%;
    padding: 10px;

    & > input {
      cursor: pointer;
    }
    & > label {
      cursor: pointer;
    }
  }
`;

export const InnerHiddenPrice = styled.div`
  width: 50%;
  /* max-width: 400px; */
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* background-color: #f5f3f3; */
  white-space: nowrap;
  margin: 20px 0;
  padding: 0 20px;

  @media all and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > div {
    width: 50%;
    padding: 10px;

    & > input {
      cursor: pointer;
    }
    & > label {
      cursor: pointer;
    }
  }
`;

export const PriceClassType = styled.div`
  font-weight: 800;
  color: #fe902f;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > span {
    border-left: 3px solid #fe902f;
    padding-left: 5px;
    cursor: pointer;
  }

  & > div > {
    border-left: 3px solid #fe902f;
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
  /* background-color: #f5f3f3; */
  /* border-bottom: 1px solid #eaeaea; */
  /* border-top: 1px solid #eaeaea; */

  overflow-x: scroll;
  white-space: nowrap;
`;

export const ResetDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 1px solid white;
  box-shadow: 0px 0px 20px 20px white;
  z-index: 1;
`;

export const FiterWrap = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;
`;

export const FiterWrapButton = styled.div`
  border: 1px solid #fe902f;
  padding: 6px 12px;
  margin-right: 9px;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  background-color: #fe902f;
  display: flex;
  align-items: center;
  display: block;

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > svg {
    margin-left: 5px;
    cursor: pointer;
  }
`;

export const ChevronSpan = styled.span<{ $chevron: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$chevron === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

export const InputRangeDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  & > div {
    border: 1px solid #fe902f;
    border-radius: 3px;
    color: #b1b1b1;
  }
  & > div > input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 80px;
    height: 36px;
    padding-left: 10px;
  }

  & > div > span {
    margin: 0 5px;
  }

  & > span {
    margin: 0 5px;
  }
`;

export const InputRangeBtn = styled.button`
  border: 1px solid #fe902f;
  background-color: #fe902f;
  border-radius: 5px;
  color: #ffffff;
  padding: 10px 20px;
  margin-left: 10px;

  @media all and (max-width: 330px) {
    display: none;
  }
`;
export const InputRangeBtnMobile = styled.button`
  border: 1px solid #fe902f;
  background-color: #fe902f;
  height: 50px;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;

  @media all and (min-width: 330px) {
    display: none;
  }
`;

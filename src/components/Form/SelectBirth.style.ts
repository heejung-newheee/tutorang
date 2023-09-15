import styled from 'styled-components';

export const DropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #696969;
  border-radius: 3px;
`;

export const DropDownHeader = styled.div`
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

export const OptionContainer = styled.div<{ $selectOptionsType?: string }>`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 180px;
  background-color: #fff;
  border: 1px solid #696969;
  overflow-y: scroll;
  z-index: ${({ $selectOptionsType }) => {
    if ($selectOptionsType === 'location1') return '3';
    else return '1';
  }};
`;
export const Select = styled.ul``;

export const Option = styled.li<{ $selectedOption: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }};
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

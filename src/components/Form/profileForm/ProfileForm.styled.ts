import { styled } from 'styled-components';

export const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  width: 100%;
  border: 1px solid #696969;
  border-radius: 3px;
  position: relative;
`;
export const SDropDownHeader = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
export const SOptionContainer = styled.div<{ $selectOptionsType?: string }>`
  /* display: none; */
  background-color: #fff;
  border: 1px solid #696969;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  z-index: ${({ $selectOptionsType }) => {
    if ($selectOptionsType === 'location1') return '3';
    else return '1';
  }};
`;
export const Select = styled.ul``;

export const SOption = styled.li<{ $selectedOption: boolean }>`
  box-sizing: border-box;
  padding: 12px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }};
`;

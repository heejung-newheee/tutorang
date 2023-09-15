import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  min-width: 135px;
  border: 1px solid #696969;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    min-width: 105px;
  }
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
export const SpanDefaultText = styled.span<{ $selectedOption: string }>`
  width: 100%;
  color: ${({ $selectedOption }) => ($selectedOption === '' ? '#aeaeae;' : '#000')};
`;
export const OptionContainer = styled.div`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 180px;
  background-color: #fff;
  border: 1px solid #696969;
  overflow-y: scroll;
  z-index: 1;
  opacity: 1;
`;
export const Select = styled.ul``;

export const Option = styled.li<{ $optionValue: string; $selectedOption: string }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: ${({ $optionValue, $selectedOption }) => {
    if ($optionValue === $selectedOption) {
      return '#eee';
    } else {
      return '#fff';
    }
  }};
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

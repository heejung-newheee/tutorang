import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  box-sizing: border-box;
  max-width: 250px;
  min-width: 180px;
  border: 1px solid #fe902f;
  position: relative;
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
export const SpanDefaultText = styled.span<{ $selectedOption: number }>`
  width: 100%;
  color: ${({ $selectedOption }) => ($selectedOption === 0 ? '#aeaeae;' : '#000')};
`;
export const OptionContainer = styled.div<{ $tuitionType: string }>`
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  opacity: 1;
  z-index: ${({ $tuitionType }) => {
    if ($tuitionType === 'online') return '3';
    if ($tuitionType === 'offline') return '1';
  }};
  border: 1px solid #fe902f;
`;
export const Select = styled.ul``;

export const Option = styled.li<{ $optionValue: number; $selectedOption: number }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  cursor: pointer;
  background-color: ${({ $optionValue, $selectedOption }) => {
    if ($optionValue === $selectedOption) {
      return '#eee';
    } else {
      return '#fff';
    }
  }};
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

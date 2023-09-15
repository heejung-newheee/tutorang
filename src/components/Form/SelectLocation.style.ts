import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #696969;
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
export const SpanDefaultText = styled.span<{ $locationDomain: string; $selectedOption: string }>`
  width: 100%;
`;
export const OptionContainer = styled.div<{ $locationType: string }>`
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  opacity: 1;
  z-index: ${({ $locationType }) => {
    if ($locationType === 'locationType1') return '3';
    if ($locationType === 'locationType2') return '1';
  }};
  border: 1px solid #696969;
`;
export const Select = styled.ul``;

export const Option = styled.li<{ $optionValue: string; $selectedOption: string }>`
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

export const DropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

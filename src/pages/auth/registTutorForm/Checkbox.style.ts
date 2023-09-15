import styled from 'styled-components';

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

export const Label = styled.label<{ $labelType: string; $isChecked: boolean; $ableMoreCheck: boolean }>`
  width: ${({ $labelType }) => {
    if ($labelType === 'personality') {
      return '32%';
    } else {
      return '32%';
    }
  }};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${({ $isChecked }) => {
    if ($isChecked === true) {
      return '1px solid #FE902F';
    } else {
      return '1px solid #696969';
    }
  }};
  color: ${({ $isChecked }) => {
    if ($isChecked === true) {
      return '#FE902F';
    } else {
      return '#696969';
    }
  }};

  cursor: pointer;
  border-radius: 3px;

  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;

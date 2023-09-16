import styled from 'styled-components';

export const Input = styled.input<{ id?: string }>`
  box-sizing: border-box;
  width: 100%;
  min-width: ${({ id }) => {
    if (id === 'email') {
      return '220px';
    } else {
      return '320px';
    }
  }};
  width: 100%;
  height: 50px;
  font-size: 16px;
  vertical-align: middle;
  border: 1px solid #696969;
  border-radius: 3px;
  color: #000;
  padding: ${({ id }) => {
    if (id === 'email' || id === 'confirm_pwd' || id === 'password') {
      return '5px 50px 5px 12px';
    } else {
      return '5px 12px 5px 12px';
    }
  }};

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
    padding: ${({ id }) => {
      if (id === 'email' || id === 'confirm_pwd' || id === 'password') {
        return '5px 40px 5px 12px';
      } else {
        return '5px 12px 5px 12px';
      }
    }};
  }
`;

export const GuideMessage = styled.div<{ $guideMessageColor?: string }>`
  min-width: 10px;
  height: 18px;
  line-height: 18px;
  display: flex;
  align-content: center;
  font-size: 12px;
  color: ${({ $guideMessageColor }) => {
    if ($guideMessageColor === '확인') {
      return '#1b7b18';
    } else if ($guideMessageColor === '안내') {
      return '#696969';
    } else {
      return '#d71f1f';
    }
  }};
  & .guide_span {
    width: '18px';
    height: '18px';
    padding: '3px 0';
  }
`;

export const EmailInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 320px;
  @media screen and (max-width: 420px) {
    min-width: 220px;
  }
`;

export const EmailButton = styled.button<{ disabled: boolean }>`
  min-width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  border-radius: 3px;
  background-color: ${({ disabled }) => {
    if (disabled) {
      return '#fe902f57';
    } else {
      return '#FE902F';
    }
  }};
  color: #fff;
  cursor: ${({ disabled }) => {
    if (disabled) {
      return 'default';
    } else {
      return 'pointer';
    }
  }};
  @media screen and (max-width: 420px) {
    min-width: 90px;
    height: 45px;
    line-height: 45px;
  }
`;

export const ResetButton = styled.button`
  position: absolute;
  right: 136px;
  top: 18px;
  z-index: 2;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  font-size: 16px;
  .reset_input_btn {
    fill: #cdcdcd;
  }
  &:hover {
    cursor: pointer;
    .reset_input_btn:hover {
      fill: #696969;
    }
  }
  &:focus {
    .reset_input_btn:hover {
      fill: #696969;
    }
  }
  @media screen and (max-width: 420px) {
    right: 115px;
    top: 15.5px;
    font-size: 15px;
  }
`;

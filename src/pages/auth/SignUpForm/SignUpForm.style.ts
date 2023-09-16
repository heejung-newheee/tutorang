import styled from 'styled-components';

export const Container = styled.div``;

export const PartitionLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  & p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    & span {
      background-color: #fff;
    }
  }
`;

export const FormContainer = styled.div``;

export const Form = styled.form`
  box-sizing: border-box;
  padding: 40px 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 420px) {
    padding: 30px 0px;
  }
`;

export const UnderForm = styled.div`
  box-sizing: border-box;
  padding: 0px 20px 80px;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 12px;
  & .mar23 {
    margin-bottom: 23px;
  }
`;

export const PasswordLabel = styled.label`
  position: 'relative';
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input<{ $color: boolean; $noFocusedColor: boolean; id?: string }>`
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
  line-height: 50px;
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
  }
`;

export const UnderFormSubmitButtonContainer = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 0 20px;
`;

export const Button = styled.button<{ disabled: boolean }>`
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 30px 0 auto;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};

  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  border-radius: 3px;
  font-size: 16px;
`;

export const FormItemHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;
  & span {
    vertical-align: bottom;
  }
`;

export const PGuideMessage = styled.p<{ $guideMessageColor?: string }>`
  min-width: 10px;
  height: 18px;
  display: flex;
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
`;

export const FormItemBody = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;
`;

export const FormItemBodySection = styled.section`
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FormItemTitle = styled.span``;

export const PasswordEyeButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 14px;
  z-index: 3;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 20px;
  cursor: pointer;
  .pw_button_hidden_color {
    fill: #cdcdcd;
  }
  .pw_button_shown_color {
    fill: #696969;
  }
  &:hover {
    cursor: pointer;
    .reset_input_btn {
      fill: #696969;
    }
  }
  &:focus {
    .reset_input_btn {
      fill: #696969;
    }
  }
  @media screen and (max-width: 420px) {
    right: 20px;
    bottom: 13px;
    width: 18px;
    height: 18px;
    font-size: 18px;
  }
`;

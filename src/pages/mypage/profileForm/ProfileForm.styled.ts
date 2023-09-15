import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const SDropdownWrapper = styled.div`
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
  background-color: #fff;
  border: 1px solid #696969;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: auto;
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

export const Inner = styled.div`
  max-width: 610px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    margin: 50px 0 0;
    width: 100%;
    padding: 20px 0;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c2c2c;
  padding: 0 0 0 10px;
  border-left: solid 3px ${colors.primary};
`;
export const ProfileImgBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin: 0px auto;
  margin-bottom: 50px;
`;
export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const EditPhotoBtn = styled.button`
  width: 32px;
  height: 32px;
  position: absolute;
  bottom: 5px;
  right: 10px;
  border-radius: 50%;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  img {
    height: 100%;
  }
`;
export const EditInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #696969;
  color: #000;
  vertical-align: middle;
  padding: 5px 10px;
  margin: 5px 0;
  &.edit-photo {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &.edit-photo {
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
`;

export const UserData = styled.div`
  width: 100%;
  height: 40px;
  line-height: 38px;
  border-radius: 5px;
  border: 1px solid #696969;
  background: #f1f1f1;
  vertical-align: middle;
  padding: 0 10px;
  cursor: default;
  margin: 5px 0 20px;
`;
export const PasswordChangeWrap = styled.div`
  gap: 0 12px;
  margin-top: 30px;
  position: relative;
`;
export const ConfirmPass = styled.div`
  font-size: 12px;
  color: #ff003e;
`;

export const PasswordWrap = styled.div`
  position: relative;
`;
export const PasswordEyeButton = styled.div`
  position: absolute;
  right: 20px;
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
    right: 15px;
    bottom: 16px;
    width: 18px;
    height: 18px;
    font-size: 18px;
  }
`;

export const EditSubmitButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 16px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3 ease;
  line-height: 1;
  background-color: #fe902f;
  color: #fff;
  width: 100%;
  height: 48px;
  margin: 50px 0;

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

import { styled } from 'styled-components';

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
export const EditFormTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CloseBtn = styled.button`
  position: absolute;
  right: 30px;
  height: 30px;
  img {
    height: 100%;
  }
`;
export const ProfileImgBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 20px;
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const EditPhotoBtn = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0%;
  left: 0;
  padding: 7px 0;
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
  border: 1px solid #696969;
  color: #000;
  vertical-align: middle;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  margin: 5px 0;
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
export const EditFormFlex = styled.div`
  display: flex;
  p {
    width: 30%;
  }
`;
export const PasswordChangeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 12px;
  margin-top: 30px;
  > p {
    width: 100%;
  }
  > div {
    width: calc((100% - 20px) / 2);
  }
`;
export const ConfirmPass = styled.div`
  color: #9d9d9d;
  font-size: 0.8rem;
`;

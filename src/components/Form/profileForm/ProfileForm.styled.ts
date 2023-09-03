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
export const EditFormTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CloseBtn = styled.button`
  height: 30px;
  img {
    height: 100%;
  }
`;
export const ProfileImg = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const EditInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  border: 1px solid #696969;
  color: #000;
  vertical-align: middle;
  border-radius: 3px;
  padding: 5px;
  margin: 5px 0;
  &:focus {
    outline: none;
  }
`;
export const EditFormFlex = styled.div`
  display: flex;
  p {
    width: 30%;
  }
`;
export const ConfirmPass = styled.div`
  color: #9d9d9d;
  font-size: 0.8rem;
`;

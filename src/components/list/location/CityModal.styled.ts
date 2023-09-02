import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const InnerModalBox = styled.div`
  width: 70%;
  max-width: 650px;
  height: 80%;
  padding: 0 10px;
  padding-bottom: 70px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${colors.gray_100};

  @media all and (min-width: 0px) and (max-width: 600px) {
    width: 100%;
    height: 80%;
  }
`;

export const Title = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  font-weight: 700;

  & > img {
    width: 15px;
    margin-right: 10px;
  }
`;

//pc버전
export const PcSiWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  border-left: 1px solid ${colors.gray_200};

  @media all and (max-width: 768px) {
    display: none;
  }
`;
//pc버전 글자
export const PcSiTitleBlock = styled.div<{ $color: boolean }>`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 1px 0 0 0 #e2e2e2, 0px 1px 0 0 #e2e2e2, 1px 1px 0 0 #e2e2e2, 0px 0 0 0 #e2e2e2 inset, 0 1px 0 0 #e2e2e2 inset;
  cursor: pointer;

  color: ${(props) => (props.$color === true ? `${colors.primary}` : 'black')};
`;

//모바일
export const MobileSiWrap = styled.div<{ $isOpen: boolean }>`
  width: 250px;
  padding: 20px;
  margin: 40px 0 20px 0px;
  display: none;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media all and (max-width: 768px) {
    display: block;
  }
`;
//꺽세모양
export const ChevronSpan = styled.div<{ $isDistrictDropdown: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$isDistrictDropdown === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

//모바일버전 시버튼 클릭하면 나오는 창
export const HiddenDropMenu = styled.div`
  width: 250px;
  height: 50%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.primary};
  border-radius: 7px;
  overflow-y: scroll;

  @media all and (max-width: 768px) {
    display: block;
  }

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  & > div {
    width: 100%;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${colors.gray_200};
    cursor: pointer;
  }
  & > div:last-child {
    border: none;
  }
`;

//군/구
export const GunGuBox = styled.div`
  width: 100%;
  overflow-y: scroll;

  & > div {
    width: 100%;
    padding: 12px 25px;
    border-bottom: 1px solid ${colors.gray_200};
  }

  //체크박스 클릭
  & > div > label {
    cursor: pointer;
  }
  //체크박스 클릭
  & > div > input {
    cursor: pointer;
  }

  & > div:last-child {
    border: none;
  }
  @media all and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    & > div {
      border: none;
    }
  }
`;

//모바일 전용 - 선택버튼
export const Btn = styled.button`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-size: 15px;

  @media all and (min-width: 768px) {
    display: none;
  }
`;

//x버튼 - 모바일 전용
export const XButton = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;

  @media all and (min-width: 768px) {
    display: none;
  }
`;

//pc전용
export const PcBtn = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};

  & > button {
    width: 50%;
    height: 100%;
    color: ${colors.white};
    font-size: 15px;
  }
  & > button:first-child {
    background-color: ${colors.gray_200};
  }
  @media all and (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
`;

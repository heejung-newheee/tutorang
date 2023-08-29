import styled from 'styled-components';

export const InnerModalBox = styled.div`
  width: 70%;
  max-width: 600px;
  height: 80%;
  background-color: #fafafa;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 70px;
  padding-top: 20px;
  position: relative;

  & > h1 {
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 10px;
    color: #fe902f;
  }

  @media all and (min-width: 0px) and (max-width: 600px) {
    width: 100%;
    height: 70%;
  }
`;

//pc버전
export const PcSiWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 0 30px;
  text-align: center;
  margin-bottom: 30px;

  @media all and (max-width: 768px) {
    display: none;
  }
`;
//pc버전 글자
export const PcSiString = styled.p<{ $color: boolean }>`
  color: ${(props) => (props.$color === true ? '#fe902f' : 'black')};
  margin: 5px 15px;
  text-align: center;
  cursor: pointer;
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

//모바일
export const MobileSiWrap = styled.div<{ $isOpen: boolean }>`
  border: 1px solid #fe902f;
  width: 250px;
  padding: 20px;
  margin: 40px 0 20px 0px;
  border-radius: 5px;
  display: flex;
  display: none;
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
export const ChevronSpan = styled.div<{ $isDropdown: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$isDropdown === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

//모바일버전 시버튼 클릭하면 나오는 창
export const HiddenDropMenu = styled.div`
  width: 250px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fe902f;
  border-radius: 7px;
  min-height: 200px;
  max-height: 400px;
  overflow-y: scroll;

  & > div {
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & > div:last-child {
    border: none;
  }
`;

//군/구
export const GunGuBox = styled.div`
  overflow-y: scroll;
  width: 100%;

  & > div {
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    padding: 12px 25px;
    /* cursor: pointer; */
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

//모바일 전용
export const Btn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe902f;
  font-size: 15px;
  color: white;

  @media all and (min-width: 768px) {
    display: none;
  }
`;

//pc전용
export const PcBtn = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe902f;

  & > button {
    width: 50%;
    height: 100%;
    color: white;
    font-size: 15px;
  }
  & > button:first-child {
    background-color: #e3e3e3;
  }
  @media all and (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
`;

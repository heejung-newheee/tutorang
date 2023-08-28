import styled from 'styled-components';
import { AREA0, 서울, 인천, 대전, 광주, 대구, 울산, 부산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 } from '../../api/city';
import { Dispatch, SetStateAction } from 'react';

interface CityData {
  [key: string]: string[];
}
const cities: CityData = { AREA0, 서울, 인천, 대전, 광주, 대구, 울산, 부산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 };

type Props = {
  isDropdown: boolean;
  setisDropdown: (item: boolean) => void;
  checkedcity: string;
  handleDropAndSi: (item: string, version: string) => void;
  setCheckedGunGu: Dispatch<SetStateAction<string>>;
  handelCloseModalAndSelect: () => void;
  checkedGunGu: string;
  handleCloseModal: () => void;
};

const CityModal = ({ isDropdown, setisDropdown, checkedcity, handleDropAndSi, setCheckedGunGu, checkedGunGu, handelCloseModalAndSelect, handleCloseModal }: Props) => {
  return (
    <InnerModalBox>
      <h1>지역선택</h1>
      <XButton onClick={handleCloseModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 384 512">
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </XButton>
      {/* 모바일  */}
      <MobileSiWrap onClick={() => setisDropdown(!isDropdown)} $isOpen={false}>
        {' '}
        <div>
          <span>{checkedcity}</span>
          <ChevronSpan $isDropdown={isDropdown}></ChevronSpan>
        </div>
      </MobileSiWrap>
      {/* pc, 태블릿 버전 */}
      <PcSiWrap>
        {cities['AREA0'].map((item, index) => (
          <PcTabletSiP $color={checkedcity === item} key={index} onClick={() => handleDropAndSi(item, 'pc')}>
            {item}
          </PcTabletSiP>
        ))}
      </PcSiWrap>
      {isDropdown ? (
        <HiddenDropMenu>
          {cities['AREA0'].map((item, index) => (
            <div key={index} onClick={() => handleDropAndSi(item, 'mobile')}>
              <input type="checkbox" id="check-si" checked={checkedcity === item} />
              <label htmlFor="check-si">{item}</label>
            </div>
          ))}
        </HiddenDropMenu>
      ) : null}
      {/* 군/구 */}
      <GunGuBox>
        {!isDropdown &&
          cities[checkedcity]?.map((item, index) => (
            <div key={index} onClick={() => setCheckedGunGu(item)}>
              <input type="checkbox" id="check-gungu" checked={checkedGunGu.includes(item)} />
              <label htmlFor="check-gungu">{item}</label>
            </div>
          ))}
      </GunGuBox>
      <Btn onClick={handelCloseModalAndSelect}>select</Btn>

      <PcBtn>
        <button onClick={handleCloseModal}>취소</button>
        <button onClick={handelCloseModalAndSelect}>select</button>
      </PcBtn>
    </InnerModalBox>
  );
};

export default CityModal;

const InnerModalBox = styled.div`
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
//x버튼
const XButton = styled.span`
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
const MobileSiWrap = styled.div<{ $isOpen: boolean }>`
  border: 1px solid #fe902f;
  width: 250px;
  padding: 20px;
  margin: 40px 0 20px 0px;
  border-radius: 5px;
  display: flex;
  display: none;
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
const ChevronSpan = styled.div<{ $isDropdown: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$isDropdown === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

//pc버전
const PcSiWrap = styled.div`
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
const PcTabletSiP = styled.p<{ $color: boolean }>`
  color: ${(props) => (props.$color === true ? '#fe902f' : 'black')};
  margin: 5px 15px;
  text-align: center;
`;

//모바일버전 시버튼 클릭하면 나오는 창
const HiddenDropMenu = styled.div`
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
  }
  & > div:last-child {
    border: none;
  }
`;

//군/구
const GunGuBox = styled.div`
  overflow-y: scroll;
  width: 100%;

  & > div {
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    padding: 12px 25px;
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

const Btn = styled.button`
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

const PcBtn = styled.div`
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

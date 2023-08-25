import styled from 'styled-components';
import { city, cityObj } from '../../api/city';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

type Props = {
  isDropdown: boolean;
  setisDropdown: (item: boolean) => void;
  checkedcity: string;
  handleDropAndSi: (item: string) => void;
  setCheckedGunGu: (item: string) => void;
  handelCloseModalAndSelect: () => void;
};

const CityModal = ({ isDropdown, setisDropdown, checkedcity, handleDropAndSi, setCheckedGunGu, handelCloseModalAndSelect }: Props) => {
  return (
    <InnerModalBox>
      {/* 모바일  */}
      <MobileSi onClick={() => setisDropdown(!isDropdown)}>{checkedcity} ^</MobileSi>
      {/* pc, 태블릿 버전 */}
      <PcTabletSi>
        {city.map((item) => (
          <p onClick={() => handleDropAndSi(item)}>{item}</p>
        ))}
      </PcTabletSi>
      {isDropdown ? (
        <HiddenDropMenu>
          {city.map((item, index) => (
            <div onClick={() => handleDropAndSi(item)}>ㅁ{item}</div>
          ))}
        </HiddenDropMenu>
      ) : null}
      <GunGuBox>
        {!isDropdown &&
          cityObj[checkedcity].map((item: string, index: number) => (
            <div key={index} onClick={() => setCheckedGunGu(item)}>
              ㅁ{item}
            </div>
          ))}
      </GunGuBox>
      <Btn onClick={handelCloseModalAndSelect}>검색</Btn>
    </InnerModalBox>
  );
};

export default CityModal;

const InnerModalBox = styled.div`
  width: 60%;
  height: 80%;
  background-color: #fafafa;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 70px;

  @media only screen and (max-width: 590px) {
    width: 100%;
    height: 70%;
  }
`;

const MobileSi = styled.div`
  border: 1px solid black;
  width: 250px;
  padding: 20px;
  margin: 40px 0 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  @media all and (max-width: 768px) {
    display: block;
  }
`;

const PcTabletSi = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 10px;
  & > p {
    margin-right: 20px;
  }

  & > p:active,
  & > p:focus,
  & > p:visited,
  & > p:checked ~ p {
    color: saddlebrown;
  }

  @media all and (max-width: 768px) {
    display: none;
  }
`;

const HiddenDropMenu = styled.div`
  width: 250px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #37507d;
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

  @media all and (min-width: 780px) {
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
  background-color: #bbf5b6;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

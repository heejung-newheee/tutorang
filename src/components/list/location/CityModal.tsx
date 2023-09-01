import { AREA0, 서울, 인천, 대전, 광주, 대구, 울산, 부산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 } from '../utility';
import { Dispatch, SetStateAction } from 'react';
import * as S from './CityModal.styled';
import Checkbox from '@mui/material/Checkbox';
import location from '../../../assets/marker-location.png';

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
    <S.InnerModalBox>
      <S.Title>
        <img src={location} alt="" />
        지역을 통해 찾기
      </S.Title>

      {/* pc 버전 */}
      <S.PcSiWrap>
        {cities['AREA0'].map((item, index) => (
          <S.PcSiTitleBlock $color={checkedcity === item} key={index} onClick={() => handleDropAndSi(item, 'pc')}>
            {item}
          </S.PcSiTitleBlock>
        ))}
      </S.PcSiWrap>
      {/* 모바일  */}
      <S.MobileSiWrap onClick={() => setisDropdown(!isDropdown)} $isOpen={false}>
        {' '}
        <div>
          <span>{checkedcity}</span>
          <S.ChevronSpan $isDropdown={isDropdown}></S.ChevronSpan>
        </div>
      </S.MobileSiWrap>
      {isDropdown ? (
        <S.HiddenDropMenu>
          {cities['AREA0'].map((item, index) => (
            <div key={index} onClick={() => handleDropAndSi(item, 'mobile')}>
              <Checkbox
                sx={{
                  color: 'gray',
                  padding: 0.5,

                  '&.Mui-checked': {
                    color: '#fe902f',
                  },
                }}
                id={`check-${item}-si`}
                checked={checkedcity === item}
                inputProps={{ 'aria-label': 'controlled' }}
              />

              <label htmlFor={`check-${item}-si`}>{item}</label>
            </div>
          ))}
        </S.HiddenDropMenu>
      ) : null}
      {/* 군/구 */}
      <S.GunGuBox>
        {!isDropdown &&
          cities[checkedcity]?.map((item) => (
            <div key={Math.random() * 22229999} onClick={() => setCheckedGunGu(item)}>
              <Checkbox
                sx={{
                  color: 'gray',
                  '&.Mui-checked': {
                    color: '#fe902f',
                  },
                }}
                id={`check-${item}-gungu`}
                checked={checkedGunGu === item}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <label htmlFor={`check-${item}-gungu`}>{item}</label>
            </div>
          ))}
      </S.GunGuBox>
      <S.Btn onClick={handelCloseModalAndSelect}>select</S.Btn>

      <S.PcBtn>
        <button onClick={handleCloseModal}>취소</button>
        <button onClick={handelCloseModalAndSelect}>select</button>
      </S.PcBtn>
      {/* 모바일 취소버튼 */}
      <S.XButton onClick={handleCloseModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 384 512">
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </S.XButton>
    </S.InnerModalBox>
  );
};

export default CityModal;

import { Dispatch, SetStateAction } from 'react';
import { marker_location } from '../../../assets';
import { AREA0, 강원, 경기, 경남, 경북, 광주, 대구, 대전, 부산, 서울, 울산, 인천, 전남, 전북, 제주, 충남, 충북 } from '../../../constants/location.constant';
import * as S from './CityModal.styled';
import CheckBoxCompo from '../../../components/list/location/CheckBoxCompo';
import { handleCityModalFilter } from '../utility';
import { SelectedFilters } from '../../../@types/list/listType';

interface CityData {
  [key: string]: string[];
}
const cities: CityData = { AREA0, 서울, 인천, 대전, 광주, 대구, 울산, 부산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 };

type Props = {
  isDistrictDropdown: boolean;
  checkedcity: string;
  checkedGunGu: string;
  setisDistrictDropdown: (item: boolean) => void;
  setCheckedCity: Dispatch<SetStateAction<string>>;
  setCheckedGunGu: Dispatch<SetStateAction<string>>;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
  setSelectedArr: Dispatch<SetStateAction<string[][]>>;
  closeModal: () => void;
};

const CityModal = ({ isDistrictDropdown, checkedcity, checkedGunGu, setisDistrictDropdown, setCheckedCity, setCheckedGunGu, setSelectedFilters, setSelectedArr, closeModal }: Props) => {
  const handleDropAndSi = (item: string, version: string) => {
    setCheckedCity(item);
    setCheckedGunGu('전체');
    version === 'pc' ? null : setisDistrictDropdown(!isDistrictDropdown);
  };

  const handelCloseModalAndSelect = () => {
    handleCityModalFilter(setSelectedFilters, setSelectedArr, checkedcity, checkedGunGu);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <S.InnerModalBox>
      <S.Title>
        <img src={marker_location} alt="location search" />
        지역을 통해 찾기
      </S.Title>

      <S.PcSiWrap>
        {cities['AREA0'].map((item, index) => (
          <S.PcSiTitleBlock $color={checkedcity === item} key={index} onClick={() => handleDropAndSi(item, 'pc')}>
            {item}
          </S.PcSiTitleBlock>
        ))}
      </S.PcSiWrap>

      <S.MobileSiWrap onClick={() => setisDistrictDropdown(!isDistrictDropdown)} $isOpen={false}>
        <div>
          <span>{checkedcity}</span>
          <S.ChevronSpan $isDistrictDropdown={isDistrictDropdown}></S.ChevronSpan>
        </div>
      </S.MobileSiWrap>

      {isDistrictDropdown ? (
        <S.HiddenDropMenu>
          {cities['AREA0'].map((item, index) => (
            <div key={index} onClick={() => handleDropAndSi(item, 'mobile')}>
              <CheckBoxCompo item={item} checkedGunGu={checkedGunGu} />
            </div>
          ))}
        </S.HiddenDropMenu>
      ) : null}

      <S.GunGuBox>
        {!isDistrictDropdown &&
          cities[checkedcity]?.map((item) => (
            <div key={Math.random() * 22229999} onClick={() => setCheckedGunGu(item)}>
              <CheckBoxCompo item={item} checkedGunGu={checkedGunGu} />
            </div>
          ))}
      </S.GunGuBox>

      <S.Btn onClick={handelCloseModalAndSelect}>select</S.Btn>

      <S.PcBtn>
        <button onClick={handleCloseModal}>취소</button>
        <button onClick={handelCloseModalAndSelect}>select</button>
      </S.PcBtn>

      <S.XButton onClick={handleCloseModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fe902f" height="1em" viewBox="0 0 384 512">
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </S.XButton>
    </S.InnerModalBox>
  );
};

export default CityModal;

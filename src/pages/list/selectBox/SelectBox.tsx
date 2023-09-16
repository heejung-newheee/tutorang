import { Dispatch, SetStateAction, useState } from 'react';
import { filterIcon, icon_location } from '../../../assets';
import CheckBoxPrice from '../../../components/list/selectBox/CheckBoxPrice';
import CheckBoxSelect from '../../../components/list/selectBox/CheckBoxSelect';
import FilterBarCompo from '../../../components/list/selectBox/FilterBarCompo';
import FilterList from '../../../components/list/selectBox/FilterList';
import { filterMenuObj, price } from '../../../constants/signup.constant';
import { handleAgeFilter, handleDeleteFilterBar, handleGenderFilter, handleLanguageFilter, handleLevelFilter } from '../utility';
import * as S from './SelectBox.styled';

import { Price, SelectedFilters } from '../../../@types/list/listType';

type Props = {
  initialSelectedFilters: SelectedFilters;
  selectedArr: string[][];
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
  setSelectedArr: Dispatch<SetStateAction<string[][]>>;
  openModal: () => void;
};

const SelectBox = ({ initialSelectedFilters, selectedArr, selectedFilters, setSelectedArr, setSelectedFilters, openModal }: Props) => {
  const [filteredMenu, setfilteredMenu] = useState('');
  const [isChevronOpen, setIsChevronOpen] = useState(false);

  const onOffPriceChange = () => {
    const onOff = selectedFilters.classStyle === 'onLine' ? 'offLine' : 'onLine';
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, classStyle: onOff });
  };

  const DeleteFilterBar = (item: string[]) => {
    handleDeleteFilterBar(item, setSelectedFilters, setSelectedArr);
  };

  const reset = () => {
    setSelectedArr([]);
    setSelectedFilters(initialSelectedFilters);
  };

  const handleFilterdObj = (item: string, category: string) => {
    switch (category) {
      case 'gender':
        handleGenderFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      case 'level':
        handleLevelFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      case 'age':
        handleAgeFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      case 'speakingLanguage':
        handleLanguageFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      default:
        break;
    }
  };

  const isChecked = (item: string) => {
    let isTrue = selectedArr.some((i) => i[0] === filteredMenu && i[1] === item);
    let DefaltCheck = selectedArr.some((i) => i[0] === filteredMenu);

    if (!DefaltCheck && item === '전체') {
      return true;
    }

    if (isTrue === true) {
      return true;
    }

    return false;
  };

  return (
    <>
      <S.LocationDiv onClick={openModal}>
        <img src={icon_location} />
        <p> 지역을 통해서 찾기</p>
      </S.LocationDiv>

      <S.FilterContainer>
        <S.FilterStart>
          <img src={filterIcon} />
          <p>필터로 자세히 찾기</p>
        </S.FilterStart>

        <FilterList filteredMenu={filteredMenu} selectedArr={selectedArr} setfilteredMenu={setfilteredMenu} setIsChevronOpen={setIsChevronOpen} isChevronOpen={isChevronOpen} />

        {filteredMenu !== 'price' && isChevronOpen ? (
          <S.InnerHidden key={filteredMenu} $isChevronOpen={isChevronOpen}>
            {filterMenuObj[filteredMenu]?.map((item: string) => (
              <CheckBoxSelect key={`${filteredMenu}+${item}`} item={item} filteredMenu={filteredMenu} handleFilterdObj={handleFilterdObj} isChecked={isChecked} />
            ))}
          </S.InnerHidden>
        ) : null}

        {filteredMenu === 'price' && isChevronOpen ? (
          <S.InnerHiddenPrice key={filteredMenu} $isChevronOpen={isChevronOpen}>
            <S.PriceClassType>
              <div>
                {selectedFilters.classStyle === 'onLine' ? <span>OnLine - Class </span> : null}
                {selectedFilters.classStyle === 'offLine' ? <span>OffLine - Class </span> : null}

                <svg onClick={() => onOffPriceChange()} xmlns="http://www.w3.org/2000/svg" fill="#9d9d9d" height="1em" viewBox="0 0 512 512">
                  <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                </svg>
              </div>
            </S.PriceClassType>
            <div></div>

            {price.map((item: Price) => (
              <CheckBoxPrice key={`${filteredMenu}+${item.optionPrice}`} item={item} setSelectedFilters={setSelectedFilters} setSelectedArr={setSelectedArr} isChecked={isChecked} />
            ))}
          </S.InnerHiddenPrice>
        ) : null}
      </S.FilterContainer>

      {selectedArr.length > 0 ? <FilterBarCompo selectedArr={selectedArr} DeleteFilterBar={DeleteFilterBar} reset={reset} /> : null}
    </>
  );
};

export default SelectBox;

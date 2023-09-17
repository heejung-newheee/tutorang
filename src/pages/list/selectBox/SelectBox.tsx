import { Dispatch, SetStateAction, useState } from 'react';
import { filterIcon, icon_location, select_refresh } from '../../../assets';
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

                <img src={select_refresh} alt="" onClick={() => onOffPriceChange()} />
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

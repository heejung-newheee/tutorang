import { Dispatch, SetStateAction } from 'react';
import * as S from '../../../pages/list/selectBox/SelectBox.styled';

type Props = {
  filteredMenu: string;
  selectedArr: string[][];
  isChevronOpen: boolean;
  setfilteredMenu: Dispatch<SetStateAction<string>>;
  setIsChevronOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterList = ({ filteredMenu, selectedArr, isChevronOpen, setfilteredMenu, setIsChevronOpen }: Props) => {
  const handleHiddenBox = (category: string) => {
    setfilteredMenu(category);
    setIsChevronOpen((pre) => (pre === true && filteredMenu !== category ? true : !pre));
  };

  const isColorTrue = (item: string) => {
    let isTrue = selectedArr.find((i) => i[0] === item);

    if (isTrue?.length !== undefined) {
      return true;
    } else false;

    return false;
  };

  const handleChevronOpen = (item: string) => {
    return isChevronOpen === true && filteredMenu === item;
  };

  return (
    <S.FilterUl>
      <S.FilterLi $isIn={isColorTrue('speakingLanguage')} onClick={() => handleHiddenBox('speakingLanguage')}>
        언어
        <S.ChevronSpan $chevron={handleChevronOpen('speakingLanguage')}></S.ChevronSpan>
      </S.FilterLi>

      <S.FilterLi $isIn={isColorTrue('level')} onClick={() => handleHiddenBox('level')}>
        난이도
        <S.ChevronSpan $chevron={handleChevronOpen('level')}></S.ChevronSpan>
      </S.FilterLi>
      <S.FilterLi $isIn={isColorTrue('gender')} onClick={() => handleHiddenBox('gender')}>
        성별
        <S.ChevronSpan $chevron={handleChevronOpen('gender')}></S.ChevronSpan>
      </S.FilterLi>

      <S.FilterLi $isIn={isColorTrue('age')} onClick={() => handleHiddenBox('age')}>
        연령대
        <S.ChevronSpan $chevron={handleChevronOpen('age')}></S.ChevronSpan>
      </S.FilterLi>

      <S.FilterLi $isIn={selectedArr.some((i) => i[0] === 'price') ? true : false} onClick={() => handleHiddenBox('price')}>
        가격
        <S.ChevronSpan $chevron={handleChevronOpen('price')}></S.ChevronSpan>
      </S.FilterLi>
    </S.FilterUl>
  );
};

export default FilterList;

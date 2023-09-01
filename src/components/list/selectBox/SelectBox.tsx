import { Dispatch, SetStateAction, useState } from 'react';
import { gender, level, age, handleDeleteFilterBar, price, Price, handleGenderFilter, handleLevelFilter, handleAgeFilter } from '../utility';
import * as S from './SelectBox.styled';
// import { Slider } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { SelectedFilters, FilterMenuObj } from '../utility';
import filterIcon from '../../../assets/funnel.png';
import icon_location from '../../../assets/marker-location.png';

const obj: FilterMenuObj = {
  gender,
  level,
  age,
};

// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: '#fe902f;', // 변경하고자 하는 색상 지정
//     },
//   },
// });

type Props = {
  initialSelectedFilters: SelectedFilters;
  openModal: () => void;
  selectedArr: string[][];
  setSelectedArr: Dispatch<SetStateAction<string[][]>>;
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

//price debounce
// let timerId: ReturnType<typeof setTimeout> | null = null;

const SelectBox = ({ initialSelectedFilters, openModal, selectedArr, setSelectedArr, selectedFilters, setSelectedFilters }: Props) => {
  const [filteredMenu, setfilteredMenu] = useState('');
  const [isChevronOpen, setIsChevronOpen] = useState(false);

  // const [minPriceNum, setMinPriceNum] = useState<undefined | number>(0);
  // const [maxPriceNum, setMaxPriceNum] = useState<undefined | number>(100000);
  // const [Value, setValue] = useState<number>(0);

  //체크박스 노출여부
  const handleHiddenBox = (category: string) => {
    setfilteredMenu(category);
    setIsChevronOpen((pre) => (pre === true && filteredMenu !== category ? true : !pre));
    // setIsChevronOpen((pre) => !pre);
  };

  //온,오프라인 설정
  const onOffPriceChange = () => {
    const onOff = selectedFilters.classStyle === 'onLine' ? 'offLine' : 'onLine';
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, classStyle: onOff });
  };

  //필터값 삭제
  const DeleteFilterBar = (item: string[]) => {
    handleDeleteFilterBar(item, setSelectedFilters, selectedFilters, setSelectedArr);
  };

  //초기화
  const reset = () => {
    setSelectedArr([]);
    setSelectedFilters(initialSelectedFilters);

    // setMaxPriceNum(0);
    // setMinPriceNum(0);
  };

  //체크박스 클릭
  const handleFilterdObj = (item: string, category: string) => {
    switch (category) {
      //성별
      case 'gender':
        handleGenderFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      //난이도
      case 'level':
        handleLevelFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      //나이
      case 'age':
        handleAgeFilter(item, setSelectedFilters, selectedFilters, setSelectedArr);
        break;

      default:
        break;
    }
  };

  //체크박스 클릭 - price가격 업데이트
  const handleFilterdObjPrice = (item: Price) => {
    console.log(item);
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, maxPrice: item.max, minPrice: item.min });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
    setSelectedArr((pre) => [...pre, ['price', item.optionPrice]]);
    // setSelectedArr((pre) => [...pre, ['price', `${minPriceNum?.toLocaleString('ko-KR')}~${item?.toLocaleString('ko-KR')}`]]);
  };

  // //price가격 debounce
  // const priceDebounce = (fn: (item: number) => void, delay: number) => {
  //   if (timerId) {
  //     clearTimeout(timerId);
  //   }
  //   timerId = setTimeout(() => {
  //     fn(Value);
  //     timerId = null;
  //   }, delay);
  // };

  // //price가격 onchange
  // const handleSliderChange = (event: Event, newValue: number | number[]) => {
  //   setValue(newValue as number); // 슬라이더 값이 변경되면 state 업데이트
  //   priceDebounce(() => handelInputPrice(newValue as number), 1000);
  // };

  //선택되면 색깔바뀜
  const isColorTrue = (item: string) => {
    let isTrue = selectedArr.find((i) => i[0] === item);

    if (isTrue?.length !== undefined) {
      return true;
    } else false;

    return false;
  };

  //꺽세모양
  const ischevronOpen = (item: string) => {
    return isChevronOpen === true && filteredMenu === item;
  };

  //체크박스
  const isChecked = (item: string) => {
    let isTrue = selectedArr.some((i) => i[0] === filteredMenu && i[1] === item);
    let DefaltCheck = selectedArr.some((i) => i[0] === filteredMenu);

    if (!DefaltCheck && item === '전체') {
      return true;
    }

    if (isTrue === true) {
      return true;
    } else if (!DefaltCheck && item === '전체') true;

    return false;
  };

  return (
    <>
      <S.LocationDiv onClick={openModal}>
        <span>
          <img src={icon_location} />
          <p> 지역을 통해서 찾기</p>
        </span>
      </S.LocationDiv>

      <S.FilterContainer $isChevronOpen={isChevronOpen}>
        <S.FilterStart>
          {' '}
          <img src={filterIcon} />
          필터로 자세히 찾기
        </S.FilterStart>

        <S.FilterUl>
          <S.FilterLi $isIn={isColorTrue('gender')} onClick={() => handleHiddenBox('gender')}>
            성별
            <S.ChevronSpan $chevron={ischevronOpen('gender')}></S.ChevronSpan>
          </S.FilterLi>

          <S.FilterLi $isIn={isColorTrue('level')} onClick={() => handleHiddenBox('level')}>
            난이도
            <S.ChevronSpan $chevron={ischevronOpen('level')}></S.ChevronSpan>
          </S.FilterLi>

          <S.FilterLi $isIn={isColorTrue('age')} onClick={() => handleHiddenBox('age')}>
            연령대
            <S.ChevronSpan $chevron={ischevronOpen('age')}></S.ChevronSpan>
          </S.FilterLi>

          <S.FilterLi $isIn={selectedArr.some((i) => i[0] === 'price') ? true : false} onClick={() => handleHiddenBox('price')}>
            가격
            <S.ChevronSpan $chevron={ischevronOpen('price')}></S.ChevronSpan>
          </S.FilterLi>
        </S.FilterUl>

        {/* 체크박스 - 가격 제외*/}
        {filteredMenu !== 'price' && isChevronOpen ? (
          <S.InnerHidden key={filteredMenu} $isChevronOpen={isChevronOpen} $dddddd={filteredMenu !== 'price' && isChevronOpen}>
            {obj[filteredMenu]?.map((item: string) => (
              <div>
                <Checkbox
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: '#fe902f',
                    },
                  }}
                  id={`check-${item}`}
                  onClick={() => handleFilterdObj(item, filteredMenu)}
                  checked={isChecked(item)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <label htmlFor={`check-${item}`}>{item}</label>
              </div>
            ))}
          </S.InnerHidden>
        ) : null}

        {/* 체크박스 - 가격*/}
        {filteredMenu === 'price' && isChevronOpen ? (
          <S.InnerHiddenPrice key={filteredMenu} $isChevronOpen={isChevronOpen} $dddddd={filteredMenu === 'price' && isChevronOpen}>
            {/* 수정해야 함 */}
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
              <div>
                <Checkbox
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: '#fe902f',
                    },
                  }}
                  id={`check-${item.optionPrice}`}
                  onClick={() => handleFilterdObjPrice(item)}
                  checked={isChecked(item.optionPrice)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <label htmlFor={`check-${item.optionPrice}`}>{item.optionPrice}</label>
              </div>
            ))}

            {/* <ThemeProvider theme={theme}>
              <Slider getAriaLabel={() => 'Temperature range'} valueLabelDisplay="auto" min={0} max={100000} value={Value} step={1000} onChange={handleSliderChange} color="secondary" />
            </ThemeProvider> */}
          </S.InnerHiddenPrice>
        ) : null}
      </S.FilterContainer>

      {/* 필터 바 */}
      {selectedArr.length > 0 && selectedArr.filter((i) => i[1] === '전체').length !== selectedArr.length ? (
        <S.FilterBar>
          <S.FiterWrap>
            {selectedArr.map((item) =>
              item[1] === '전체' ? null : (
                <S.FiterWrapButton onClick={() => DeleteFilterBar(item)}>
                  {' '}
                  <div>
                    {item[1]}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 384 512">
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </div>
                </S.FiterWrapButton>
              ),
            )}
          </S.FiterWrap>

          <S.ResetDiv onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#9d9d9d" height="1em" viewBox="0 0 512 512">
              <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
            </svg>
          </S.ResetDiv>
        </S.FilterBar>
      ) : null}
    </>
  );
};

export default SelectBox;

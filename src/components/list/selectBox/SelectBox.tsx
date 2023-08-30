import { Dispatch, SetStateAction, useState } from 'react';
import { gender, level, age, handleAgeNum } from '../utility';
// import locationIcon from '../../assets/location-icon.png';
import * as S from './SelectBox.styled';
import styled from 'styled-components';
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { debounce } from '../utility';
// import { styled } from '@mui/system';

const obj: any = {
  gender,
  level,
  age,
  // price,
};

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fe902f;', // 변경하고자 하는 색상 지정
    },
  },
});

type Props = {
  handleFilterdObj: (item: string, category: string) => void;
  openModal: () => void;
  selectedArr: string[][];
  setSelectedArr: Dispatch<SetStateAction<any[]>>;
  selectedFilters: any;
  setSelectedFilters: Dispatch<SetStateAction<any>>;
};

let timerId: ReturnType<typeof setTimeout> | null = null;

const SelectBox = ({ handleFilterdObj, openModal, selectedArr, setSelectedArr, selectedFilters, setSelectedFilters }: Props) => {
  const [filteredMenu, setfilteredMenu] = useState('gender');
  const [isOpen, setIsOpen] = useState(true);

  const [minPriceNum, setMinPriceNum] = useState<undefined | number>(0);
  const [maxPriceNum, setMaxPriceNum] = useState<undefined | number>(100000);
  const [Value, setValue] = useState<number>(0);

  const handleHiddenBox = (category: string) => {
    setfilteredMenu(category);
    // setIsOpen((pre) => !pre);
  };

  const onOffChange = () => {
    const onOff = selectedFilters.classStyle === 'onLine' ? 'offLine' : 'onLine';
    setSelectedFilters((pre: any) => pre && { ...pre, classStyle: onOff });
  };

  const DeleteFilterBar = (item: string[]) => {
    switch (item[0]) {
      //성별
      case 'gender':
        console.log(item);
        setSelectedFilters((pre: any) => {
          if (pre) {
            return { ...pre, gender: pre.gender.filter((i: string) => i !== item[1]) };
          }
        });
        setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));

        break;
      //난이도
      case 'level':
        setSelectedFilters((pre: any) => {
          if (pre) {
            return { ...pre, level: pre.level.filter((i: string) => i !== item[1]) };
          }
        });
        setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));

        break;

      //나이
      case 'age':
        let ageNum = handleAgeNum(item[1]);

        setSelectedFilters((pre: any) => pre && { ...pre, age: pre.age.filter((i: any) => i !== ageNum) });
        setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));

        break;
      //지역1
      case 'location1':
        setSelectedFilters((pre: any) => {
          if (pre) {
            return { ...pre, location1: '', location2: '' };
          }
        });
        setSelectedArr((pre) => pre.filter((i) => i[0] !== 'location1'));
        setSelectedArr((pre) => pre.filter((i) => i[0] !== 'location2'));

        break;
      //지역2
      case 'location2':
        setSelectedFilters((pre: any) => {
          if (pre) {
            return { ...pre, location2: '' };
          }
        });
        setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));

        break;
      //가격
      case 'price':
        setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
        setSelectedFilters((pre: any) => pre && { ...pre, minPrice: 0, maxPrice: 100000, priceType: '전체' });
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setSelectedArr([]);
    setSelectedFilters({
      gender: [],
      level: [],
      minPrice: 0,
      maxPrice: 100000,
      location1: '',
      location2: [],
      age: [],
    });

    setMaxPriceNum(0);
    setMinPriceNum(0);
  };

  // const handleRangeMinNum = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMinPriceNum(Number(e.target.value.replace(/[^0-9]/g, '')));
  // };

  // const handleRangeMaxNum = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMaxPriceNum(Number(e.target.value.replace(/[^0-9]/g, '')));
  // };

  const handelInputPrice = (item: number) => {
    setSelectedFilters((pre: any) => pre && { ...pre, maxPrice: item, minPrice: minPriceNum });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
    setSelectedArr((pre) => [...pre, ['price', `${minPriceNum?.toLocaleString('ko-KR')}~${item?.toLocaleString('ko-KR')}`]]);
  };

  const debounce = (fn: (item: number) => void, delay: number) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(Value);
      timerId = null;
    }, delay);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number); // 슬라이더 값이 변경되면 state 업데이트
    debounce(() => handelInputPrice(newValue as number), 1000);
  };

  // const debouncedOnChange = debounce(5000);

  const isColorTrue = (item: string) => {
    return selectedFilters[item].length !== 0;
  };

  const ischevronOpen = (item: string) => {
    return isOpen === true && filteredMenu === item;
  };

  const isChecked = (item: string) => {
    return (selectedFilters[filteredMenu]?.length === 0 && item === '전체') || selectedArr.some((i) => i[0] === filteredMenu && i[1] === item);
  };

  //asdadasdasda

  // const isCheckedPrice = (item: { priceNum: string; min: number; max: number }) => {
  //   if (selectedFilters['priceType'] === '전체' && item['priceNum'] === '전체') {
  //     return true;
  //   }

  //   if (selectedFilters['priceType'] === item['priceNum']) {
  //     return true;
  //   }

  //   return false;
  // };
  return (
    <>
      <Search>지역을 통해서 찾기</Search>

      {/* <DDDD>지역을 통해서 찾기</DDDD> */}
      <FilterContainer>
        <LocationDiv>
          {' '}
          {/* <img src={locationIcon} /> */}
          필터로 자세히 찾기
        </LocationDiv>

        <S.FilterBox>
          <S.InnerBox $isIn={isColorTrue('gender')} onClick={() => handleHiddenBox('gender')}>
            성별
            <S.ChevronSpan $chevron={ischevronOpen('gender')}></S.ChevronSpan>
          </S.InnerBox>

          <S.InnerBox $isIn={isColorTrue('level')} onClick={() => handleHiddenBox('level')}>
            난이도
            <S.ChevronSpan $chevron={ischevronOpen('level')}></S.ChevronSpan>
          </S.InnerBox>

          <S.InnerBox $isIn={isColorTrue('age')} onClick={() => handleHiddenBox('age')}>
            연령대
            <S.ChevronSpan $chevron={ischevronOpen('age')}></S.ChevronSpan>
          </S.InnerBox>

          <S.InnerBox onClick={openModal} $isIn={isColorTrue('location1')}>
            지역
            <button>+</button>
          </S.InnerBox>

          <S.InnerBox $isIn={selectedArr.some((i) => i[0] === 'price') ? true : false} onClick={() => handleHiddenBox('price')}>
            가격
            <S.ChevronSpan $chevron={ischevronOpen('price')}></S.ChevronSpan>
          </S.InnerBox>
        </S.FilterBox>

        {/* 체크박스 - 가격 제외*/}
        {filteredMenu !== 'price' ? (
          <S.InnerHidden>
            {obj[filteredMenu]?.map((item: string) => (
              <div key={Math.random() * 22229999}>
                <input type="checkbox" id="check" checked={isChecked(item)} readOnly />
                <label htmlFor="check" onClick={() => handleFilterdObj(item, filteredMenu)}>
                  {item}
                </label>
              </div>
            ))}
          </S.InnerHidden>
        ) : null}
        {/* 체크박스 - 가격*/}
        {filteredMenu === 'price' ? (
          <S.InnerHiddenPrice>
            {/* 수정해야 함 */}
            <S.PriceClassType>
              <div>
                {selectedFilters.classStyle === 'onLine' ? <span>OnLine - Class </span> : null}
                {selectedFilters.classStyle === 'offLine' ? <span>OffLine - Class </span> : null}

                <svg onClick={() => onOffChange()} xmlns="http://www.w3.org/2000/svg" fill="#9d9d9d" height="1em" viewBox="0 0 512 512">
                  <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                </svg>
              </div>
            </S.PriceClassType>
            <ThemeProvider theme={theme}>
              <Slider getAriaLabel={() => 'Temperature range'} valueLabelDisplay="auto" min={0} max={100000} value={Value} step={1000} onChange={handleSliderChange} color="secondary" />
            </ThemeProvider>
            {/* <S.InputRangeDiv>
              <div>
                <input type="text" value={minPriceNum?.toLocaleString('ko-KR')} onChange={(e) => handleRangeMinNum(e)} />
                <span>원</span>
              </div>
              <span>~</span>
              <div>
                <input type="text" value={maxPriceNum?.toLocaleString('ko-KR')} onChange={(e) => handleRangeMaxNum(e)} />
                <span>원</span>
              </div>
              <S.InputRangeBtn onClick={handelInputPrice}>검색</S.InputRangeBtn>
            </S.InputRangeDiv> */}
            {/* <S.InputRangeBtnMobile onClick={handelInputPrice}>검색</S.InputRangeBtnMobile> */}
          </S.InnerHiddenPrice>
        ) : null}
      </FilterContainer>

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

const Search = styled.div`
  margin-top: 180px;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const FilterContainer = styled.div`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const DDDD = styled.div`
  margin-top: 30px;
  width: 100%;
  width: 100px;
  height: 50px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  background-color: #fe902f;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const LocationDiv = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: #fe902f; */
  display: flex;
  align-items: center;
  /* margin-top: 100px; */
  padding-left: 10px;
  border-bottom: 1px solid #eaeaea;
`;

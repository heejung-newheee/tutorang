import styled from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
import { gender, level, age, price } from './MobileModal';

const obj: any = {
  gender,
  level,
  age,
  price,
};

type Props = {
  handleFilterdObj: (item: string, category: string) => void;
  openModal: () => void;
  selectedArr: string[][];
  setSelectedArr: Dispatch<SetStateAction<any[]>>;
  selectedFilters: any;
  setSelectedFilters: Dispatch<SetStateAction<any>>;
};

const SelectBox = ({ handleFilterdObj, openModal, selectedArr, setSelectedArr, selectedFilters, setSelectedFilters }: Props) => {
  const [filteredMenu, setfilteredMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [minPriceNum, setMinPriceNum] = useState<undefined | number>(undefined);
  const [maxPriceNum, setMaxPriceNum] = useState<undefined | number>(undefined);

  const handleHiddenBox = (category: string) => {
    setfilteredMenu(category);
    setIsOpen((pre) => !pre);
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

      //나이
      case 'age':
        let ageNum = 0;
        switch (item[1]) {
          case '10대':
            ageNum = 10;
            break;
          case '20대':
            ageNum = 20;

            break;
          case '30대':
            ageNum = 30;

            break;
          case '40대':
            ageNum = 40;

            break;
          case '50대':
            ageNum = 50;

            break;
          case '60대':
            ageNum = 60;

            break;

          default:
            break;
        }

        setSelectedFilters((pre: any) => (pre ? { ...pre, age: pre.age.filter((i: any) => i !== ageNum) } : null));
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

  const handleRangeMinNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceNum(Number(e.target.value.replace(/[^0-9]/g, '')));
  };

  const handleRangeMaxNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceNum(Number(e.target.value.replace(/[^0-9]/g, '')));
  };

  const handelInputPrice = () => {
    setSelectedFilters((pre: any) => (pre ? { ...pre, maxPrice: maxPriceNum, minPrice: minPriceNum } : {}));
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
    setSelectedArr((pre) => [...pre, ['price', `${minPriceNum?.toLocaleString('ko-KR')}~${maxPriceNum?.toLocaleString('ko-KR')}`]]);
  };

  console.log(selectedFilters['minPrice'] > 0, 'asdsd');
  console.log(selectedFilters['maxPrice'], 'asdsd');

  return (
    <>
      <FilterBox>
        <InnerBox $isIn={selectedFilters.gender.length !== 0} onClick={() => handleHiddenBox('gender')}>
          성별
          <ChevronSpan $chevron={isOpen === true && filteredMenu === 'gender'}></ChevronSpan>
        </InnerBox>

        <InnerBox $isIn={selectedFilters.level.length !== 0} onClick={() => handleHiddenBox('level')}>
          난이도
          <ChevronSpan $chevron={isOpen === true && filteredMenu === 'level'}></ChevronSpan>
        </InnerBox>

        <InnerBox $isIn={selectedFilters.age.length !== 0} onClick={() => handleHiddenBox('age')}>
          연령대
          <ChevronSpan $chevron={isOpen === true && filteredMenu === 'age'}></ChevronSpan>
        </InnerBox>

        <InnerBox onClick={openModal} $isIn={selectedFilters.location1.length !== 0}>
          지역
          <button>+</button>
        </InnerBox>

        <InnerBox $isIn={selectedArr.some((i) => i[0] === 'price') ? true : false} onClick={() => handleHiddenBox('price')}>
          가격
          <ChevronSpan $chevron={isOpen === true && filteredMenu === 'price'}></ChevronSpan>
        </InnerBox>
      </FilterBox>

      {/* 체크박스 */}
      {isOpen && filteredMenu !== 'price' ? (
        <InnerHidden>
          {obj[filteredMenu]?.map((item: string, index: number) => (
            <div key={index} onClick={() => handleFilterdObj(item, filteredMenu)}>
              <input type="checkbox" id="check" checked={(selectedFilters[filteredMenu]?.length === 0 && item === '전체') || selectedArr.some((i) => i[0] === filteredMenu && i[1] === item && item !== '전체')} />
              <label htmlFor="check">{item}</label>
            </div>
          ))}
        </InnerHidden>
      ) : null}

      {isOpen && filteredMenu === 'price' ? (
        <InnerHidden>
          {/* 수정해야 함 */}
          <ClassType>
            <span>OffLine - Class</span>
          </ClassType>
          <ClassType>
            <span>OnLine - Class</span>
          </ClassType>

          {obj[filteredMenu]?.map((item: { priceNum: string; min: number; max: number }, index: number) => (
            <div key={index} onClick={() => handleFilterdObj(item['priceNum'], filteredMenu)}>
              <input type="checkbox" id="check" checked={(selectedFilters['minPrice'] === 0 && selectedFilters['maxPrice'] > 40000 && item.priceNum === '전체') || selectedArr.some((i) => i[0] === filteredMenu && i[1] === item['priceNum'])} />
              <label htmlFor="check">{item['priceNum']}</label>
            </div>
          ))}
          <InputRangeDiv>
            <div>
              <input type="text" value={minPriceNum?.toLocaleString('ko-KR')} onChange={(e) => handleRangeMinNum(e)} />
              <span>원</span>
            </div>
            <span>~</span>
            <div>
              <input type="text" value={maxPriceNum?.toLocaleString('ko-KR')} onChange={(e) => handleRangeMaxNum(e)} />
              <span>원</span>
            </div>
            <InputRangeBtn onClick={handelInputPrice}>검색</InputRangeBtn>
          </InputRangeDiv>
          <InputRangeBtnMobile onClick={handelInputPrice}>검색</InputRangeBtnMobile>
        </InnerHidden>
      ) : null}

      {/* 필터 바 */}
      {selectedArr.length > 0 && selectedArr.filter((i) => i[1] === '전체').length !== selectedArr.length ? (
        <FilterBar>
          <FiterWrap>
            {selectedArr.map((item) =>
              item[1] === '전체' ? null : (
                <div onClick={() => DeleteFilterBar(item)}>
                  {' '}
                  <div>
                    {item[1]}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 384 512">
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </div>
                </div>
              ),
            )}
          </FiterWrap>

          <ResetDiv onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#9d9d9d" height="1em" viewBox="0 0 512 512">
              <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
            </svg>
          </ResetDiv>
        </FilterBar>
      ) : null}
    </>
  );
};

export default SelectBox;

const FilterBox = styled.div`
  width: 100%;
  margin-top: 100px;
  height: auto;
  display: flex;
  overflow: scroll;
  padding: 0 10px;
`;

const InnerBox = styled.div<{ $isIn: boolean }>`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid black;
  white-space: nowrap;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border-color: ${(props) => (props.$isIn === true ? '#FE902F' : '#dadce0')};

  /* @media only screen and (max-width: 1200px) {
    margin: 0 10px;
  } */

  /* border-bottom: 1px solid rgb(247, 249, 250); */
`;

const InnerHidden = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #f5f3f3;
  white-space: nowrap;
  margin: 20px 0;

  @media all and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > div {
    width: 50%;
    padding: 10px;
    cursor: pointer;
  }
`;
const ClassType = styled.div`
  font-weight: 800;
  color: #fe902f;
  & > span {
    border-left: 3px solid #fe902f;
    padding-left: 5px;
    cursor: pointer;
  }
`;

const FilterBar = styled.div`
  width: 100%;
  height: 55px;
  padding: 0 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f3f3;
  overflow-x: scroll;
  white-space: nowrap;
`;

const ResetDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-shadow: 0px 0px 20px 20px #f5f3f3;
  z-index: 1;
`;

const FiterWrap = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  & > div {
    border: 1px solid #fe902f;
    padding: 6px 12px;
    margin-right: 9px;
    border-radius: 20px;
    color: white;
    font-size: 14px;
    background-color: #fe902f;
    display: flex;
    align-items: center;
    display: block;
  }

  & > div > div {
    display: flex;
    align-items: center;
  }

  & > div > div > svg {
    margin-left: 5px;
  }
`;

const ChevronSpan = styled.span<{ $chevron: boolean }>`
  width: 12px;
  height: 12px;
  margin-left: 3px;
  background-image: ${(props) => (props.$chevron === false ? `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_up-12.svg)` : `url(https://www.ssfshop.com/v3/images/uxui/icon/chevron_down-12.svg)`)};
`;

const InputRangeDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  & > div {
    border: 1px solid #fe902f;
    border-radius: 3px;
    color: #b1b1b1;
  }
  & > div > input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 80px;
    height: 36px;
    padding-left: 5px;
  }

  & > div > span {
    margin: 0 5px;
  }

  & > span {
    margin: 0 5px;
  }
`;

const InputRangeBtn = styled.button`
  border: 1px solid #fe902f;
  background-color: #fe902f;
  border-radius: 5px;
  color: #ffffff;
  padding: 10px 20px;
  margin-left: 10px;

  @media all and (max-width: 330px) {
    display: none;
  }
`;
const InputRangeBtnMobile = styled.button`
  border: 1px solid #fe902f;
  background-color: #fe902f;
  height: 50px;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;

  @media all and (min-width: 330px) {
    display: none;
  }
`;

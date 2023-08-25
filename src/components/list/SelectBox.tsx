import styled from 'styled-components';
import { useState } from 'react';
import { gender, level, isPossibleKorean, age } from './MobileModal';

const obj: any = {
  gender,
  level,
  isPossibleKorean,
  age,
};

type Props = {
  handleFilterdObg: (item: string, category: string) => void;
  checkedcity: string;
  checkedGunGu: string;
  openModal: () => void;
  selectedArr: string[];
  filterdObj: any;
  setFilterdObj: any;
};

const SelectBox = ({ handleFilterdObg, openModal, selectedArr, filterdObj, setFilterdObj }: Props) => {
  const [filterdMenu, setfilterdMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleHiddenBox = (category: string) => {
    setfilterdMenu(category);
    setIsOpen((pre) => !pre);
  };

  const DeleteFilterBar = (item: string) => {
    const keysOfFilter = Object.keys(filterdObj);

    let key = keysOfFilter.find((key) => filterdObj[key] === item);

    switch (key) {
      case 'gender':
        delete filterdObj.gender;
        setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        break;

      case 'level':
        delete filterdObj.level;
        setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        break;

      case 'isPossibleKorean':
        delete filterdObj.isPossibleKorean;
        setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        break;

      case 'age':
        delete filterdObj.age;
        setFilterdObj((pre: any) => (pre ? { ...pre } : null));
        break;

      default:
        break;
    }
    return setFilterdObj((pre: any) => (pre ? { ...pre } : null));
  };
  return (
    <>
      <FilterBox>
        <InnerBox $isIn={filterdObj['gender'] ? true : false} onClick={() => handleHiddenBox('gender')}>
          성별
          {isOpen === true && filterdMenu === 'gender' ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </InnerBox>
        <InnerBox $isIn={filterdObj['level'] ? true : false} onClick={() => handleHiddenBox('level')}>
          난이도
          {isOpen === true && filterdMenu === 'level' ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </InnerBox>
        <InnerBox $isIn={filterdObj['isPossibleKorean'] ? true : false} onClick={() => handleHiddenBox('isPossibleKorean')}>
          한국어 가능
          {isOpen === true && filterdMenu === 'isPossibleKorean' ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </InnerBox>
        <InnerBox $isIn={filterdObj['age'] ? true : false} onClick={() => handleHiddenBox('age')}>
          연령대
          {isOpen === true && filterdMenu === 'age' ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </InnerBox>
        <InnerBox $isIn={filterdObj['location1'] || filterdObj['location2'] ? true : false}>
          지역
          <button onClick={openModal}>+</button>
        </InnerBox>
        <InnerBox $isIn={filterdObj['location1'] ? true : false} onClick={() => handleHiddenBox('price')}>
          가격
          {isOpen === true && filterdMenu === 'price' ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          )}
        </InnerBox>
      </FilterBox>

      {isOpen ? (
        <InnerHidden>
          {obj[filterdMenu]?.map((item: string, index: number) => (
            <div key={index} onClick={() => handleFilterdObg(item, filterdMenu)}>
              ㅁ{item}
            </div>
          ))}
          {filterdMenu === 'price' ? <div>asdasd</div> : null}
        </InnerHidden>
      ) : null}

      {selectedArr.length > 0 ? (
        <FilterBar>
          {selectedArr.map((item) => (
            <div onClick={() => DeleteFilterBar(item)}> {item}X</div>
          ))}
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
  border-color: ${(props) => (props.$isIn === true ? 'red' : null)};

  @media only screen and (max-width: 1200px) {
    margin: 0 10px;
  }

  /* border-bottom: 1px solid rgb(247, 249, 250); */
`;

const InnerHidden = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #f5f3f3;
  white-space: nowrap;
  margin: 20px 0;

  & > div {
    /* border: 1px solid gray; */
    width: 50%;
    padding: 10px;
  }
`;

const FilterBar = styled.div`
  width: 100%;
  height: 55px;
  padding-left: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: #f5f3f3;
  overflow-x: scroll;

  & > div {
    border: 1px solid #9abbff;
    padding: 6px 12px;
    margin-right: 9px;
    border-radius: 20px;
    color: white;
    font-size: 14px;
    background-color: #9abbff;
  }
`;
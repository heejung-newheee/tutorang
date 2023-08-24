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
};

const SelectBox = ({ handleFilterdObg, openModal, selectedArr, filterdObj }: Props) => {
  const [filterdMenu, setfilterdMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleHiddenBox = (category: string) => {
    setfilterdMenu(category);
    setIsOpen((pre) => !pre);
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
              {item}
            </div>
          ))}
          {filterdMenu === 'price' ? <div>asdasd</div> : null}
        </InnerHidden>
      ) : null}

      {selectedArr.length > 0 ? (
        <FilterBar>
          {selectedArr.map((item) => (
            <div>{item}X</div>
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
  height: 40px;
  padding: 0 10px;
  margin: 0 10px;
  border: 1px solid black;
  white-space: nowrap;
  border: 1px solid #dadce0;
  border-radius: 4px;

  border-color: ${(props) => (props.$isIn === true ? 'red' : null)};

  /* border-bottom: 1px solid rgb(247, 249, 250); */
`;

const InnerHidden = styled.div`
  width: 100%;
  height: 300px;
  background-color: gray;
  white-space: nowrap;
`;

const FilterBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: gray;
`;

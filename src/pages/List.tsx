import { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabase';

const gender: string[] = ['전체', '여성', '남성'];
const level: string[] = ['전체', '초급', '중급', '고급'];
const isPossibleKorean: string[] = ['전체', '상', '중', '하'];
const age: string[] = ['전체', '10대', '20대', '30대', '40대', '50대'];

type FilterdObg = {
  gender: string;
  level: string;
  isPossibleKorean: string;
  age: string;
  price: number;
};

const List = () => {
  const [filterdObj, setFilterdObj] = useState<FilterdObg>({
    gender: '전체',
    level: '전체',
    isPossibleKorean: '전체',
    age: '전체',
    price: 100000,
  });

  const handleFilterdObg = (item: string, categoty: string) => {
    if (categoty === 'gender') {
      setFilterdObj({ ...filterdObj, gender: item });
    } else if (categoty === 'level') {
      setFilterdObj({ ...filterdObj, level: item });
    } else if (categoty === 'isPossibleKorean') {
      setFilterdObj({ ...filterdObj, isPossibleKorean: item });
    } else if (categoty === 'age') {
      setFilterdObj({ ...filterdObj, age: item });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data, error } = await supabase.from('tutor_info').select('*').range(0, 1).match({ user_id: 'fd32cf82-7866-4d4c-90fc-3539ef165556', price: 20000 });
      console.log(data);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filterdObj);
  return (
    <Container>
      <SelectBox>
        <InnerBox>
          <div>성별</div>
          {gender.map((item, index) => (
            <button key={index} onClick={() => handleFilterdObg(item, 'gender')}>
              {item}
            </button>
          ))}
        </InnerBox>
        <InnerBox>
          <div>난이도</div>
          {level.map((item, index) => (
            <button key={index} onClick={() => handleFilterdObg(item, 'level')}>
              {item}
            </button>
          ))}
        </InnerBox>
        <InnerBox>
          <div> 한국어 가능</div>
          {isPossibleKorean.map((item, index) => (
            <button key={index} onClick={() => handleFilterdObg(item, 'isPossibleKorean')}>
              {item}
            </button>
          ))}
        </InnerBox>
        <InnerBox>
          <div>연령대</div>
          {age.map((item, index) => (
            <button key={index} onClick={() => handleFilterdObg(item, 'age')}>
              {' '}
              {item}
            </button>
          ))}
        </InnerBox>
        <InnerPriceBox>
          <div>가격</div>
          <div>price</div>
        </InnerPriceBox>
      </SelectBox>
      <TutorList>
        <div>
          <img src="http://thumbnail.10x10.co.kr/webimage/image/basic/524/B005247708.jpeg?cmd=thumb&fit=true&ws=false&w=300&h=300" />
          <p>adadas</p>
          <p>adadaasdadsadadsdadasdasdadasdadss</p>
          <p>adadas</p>
          <p>adadas</p>
        </div>
        <div>
          <img src="http://thumbnail.10x10.co.kr/webimage/image/basic/524/B005247708.jpeg?cmd=thumb&fit=true&ws=false&w=300&h=300" />
          <p>adadas</p>
          <p>adadaasdadsadadsdadasdasdadasdadss</p>
          <p>adadas</p>
          <p>adadas</p>
        </div>
        <div>
          <img src="http://thumbnail.10x10.co.kr/webimage/image/basic/524/B005247708.jpeg?cmd=thumb&fit=true&ws=false&w=300&h=300" />
          <p>adadas</p>
          <p>adadaasdadsadadsdadasdasdadasdadss</p>
          <p>adadas</p>
          <p>adadas</p>
        </div>
        <div>
          <img src="http://thumbnail.10x10.co.kr/webimage/image/basic/524/B005247708.jpeg?cmd=thumb&fit=true&ws=false&w=300&h=300" />
          <p>adadas</p>
          <p>adadaasdadsadadsdadasdasdadasdadss</p>
          <p>adadas</p>
          <p>adadas</p>
        </div>
      </TutorList>
    </Container>
  );
};

export default List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectBox = styled.div`
  width: 100%;
  margin-top: 100px;
  height: auto;
  border: 1px solid gray;
  /* background-color: aliceblue; */
`;

const InnerBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px;
  /* padding: 10px; */
  overflow-x: scroll;
  border-bottom: 1px solid rgb(247, 249, 250);

  & > div {
    padding-right: 10px;
    flex: none;
  }

  & > button {
    background-color: #f2f2f2;
    margin: 0 10px;
    padding: 3px 15px;
    border-radius: 13px;
    flex: none;
    border: 1px solid salmon;
  }
`;
const InnerPriceBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  overflow-x: scroll;
  padding: 0 30px;

  & > div {
    padding-right: 10px;
    flex: none;
  }
`;

const TutorList = styled.div`
  margin-top: 100px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media only screen and (max-width: 890px) {
    grid-template-columns: repeat(2, 1fr);
  }

  & > div {
    background-color: beige;
    word-break: break-all;
  }

  & > div img {
    width: 100%;
  }
`;

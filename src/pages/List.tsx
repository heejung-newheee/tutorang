import React from 'react';
import styled from 'styled-components';

const List = () => {
  return (
    <Container>
      <SelectBox>
        <InnerBox>
          <div>성별</div>
          <button>전체</button>
          <button>여성</button>
          <button>남성</button>
        </InnerBox>
        <InnerBox>
          <div>난이도</div>
          <button>전체</button>
          <button>초급</button>
          <button>중급</button>
          <button>고급</button>
        </InnerBox>
        <InnerBox>
          <div> 한국어 가능</div>
          <button>상</button>
          <button>중</button>
          <button>하</button>
        </InnerBox>
        <InnerBox>
          <div>연령대</div>
          <button>전체</button>
          <button>10대</button>
          <button>20대</button>
          <button>30대</button>
          <button>40대</button>
          <button>50대</button>
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

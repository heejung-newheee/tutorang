import styled from 'styled-components';
import useModal from '../../hooks/useModal';

type Props = {
  mobileModalName: string;
  openModal: () => void;
};

type price = { priceNum: string; min: number; max: number }[];

export const gender: string[] = ['전체', '여성', '남성'];
export const level: string[] = ['전체', '초급', '중급', '고급'];
export const age: string[] = ['전체', '10대', '20대', '30대', '40대', '50대'];
export const price: price = [
  { priceNum: '전체', min: 0, max: 100000 },
  { priceNum: '0 ~ 10,000', min: 0, max: 10000 },
  { priceNum: '10,000 ~ 15,000', min: 10000, max: 15000 },
  { priceNum: '15,000 ~ 20,000', min: 15000, max: 20000 },
  { priceNum: '20,000 ~ 25,000', min: 20000, max: 25000 },
  { priceNum: '25,000 ~ 30,000', min: 25000, max: 30000 },
];

export const priceOnline: price = [
  { priceNum: '전체', min: 0, max: 100000 },
  { priceNum: '10,000 ~ 20,000', min: 100000, max: 20000 },
  { priceNum: '20,000 ~ 30,000', min: 20000, max: 30000 },
  { priceNum: '30,000 ~ 40,000', min: 30000, max: 40000 },
  // { priceNum: '40,000 ~ 50,000', min: 40000, max: 50000 },
  // { priceNum: '25,000 ~ 30,000', min: 25000, max: 30000 },
];

const mobileObj: any = {
  gender,
  level,
  age,
};

const MobileModal = ({ mobileModalName, openModal }: Props) => {
  console.log(mobileObj, mobileModalName);

  return (
    <InnerModalBox>
      {mobileObj[mobileModalName]?.map((item: string) => (
        <div>{item}</div>
      ))}
    </InnerModalBox>
  );
};

export default MobileModal;

const InnerModalBox = styled.div`
  width: 60%;
  height: 80%;
  background-color: salmon;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 590px) {
    width: 100%;
    height: 70%;
  }
`;

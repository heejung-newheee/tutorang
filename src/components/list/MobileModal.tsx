import styled from 'styled-components';
import useModal from '../../hooks/useModal';

type Props = {
  mobileModalName: string;
  openModal: () => void;
};

export const gender: string[] = ['전체', '여성', '남성'];
export const level: string[] = ['전체', '초급', '중급', '고급'];
export const isPossibleKorean: string[] = ['전체', '상', '중', '하'];
export const age: string[] = ['전체', '10대', '20대', '30대', '40대', '50대'];

const mobileObj: any = {
  gender,
  level,
  isPossibleKorean,
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

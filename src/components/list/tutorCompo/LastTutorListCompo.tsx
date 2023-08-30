import styled from 'styled-components';

type Props = {
  LastelementRef: (node: HTMLDivElement) => void;
  // userInfo: TutorInfoIdType;
};
// type TutorInfoIdType = TutorLists<'id'>;

const TutorListCompo = ({ LastelementRef }: Props) => {
  return (
    <TutorContainer ref={LastelementRef}>
      <img src="http://thumbnail.10x10.co.kr/webimage/image/basic/524/B005247708.jpeg?cmd=thumb&fit=true&ws=false&w=300&h=300" />
      <div>
        <div>{'LastelementRef'}</div>
        <div>
          <div>Name(sdfsf)</div>
          <div>
            <div>address | address</div>
            <div>graduate</div>
          </div>
          <div>
            <span>adads</span>
            <span>adads</span>
            <span>adads</span>
          </div>
        </div>
      </div>
    </TutorContainer>
  );
};

export default TutorListCompo;

const TutorContainer = styled.div`
  border-radius: 10px;
  //나중에
  box-shadow: 3px 4px 3px -5px black;

  & > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  & > div {
    margin: 10px;
  }
  & > div > div:first-child {
    margin: 20px 0;
    border-left: 3px solid #fe902f;
    padding-left: 7px;
    /* margin-top: 10px; */
  }

  & > div > div:last-child {
    padding: 10px;

    & > div {
      display: flex;

      & > span {
        margin-right: 10px;
        border: 1px solid black;
      }
      & > div {
        margin-right: 10px;
      }
    }
  }
`;

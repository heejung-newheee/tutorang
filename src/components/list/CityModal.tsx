import styled from 'styled-components';
import { city, cityObj } from '../../api/city';

type Props = {
  isDropdown: boolean;
  setisDropdown: (item: boolean) => void;
  checkedcity: string;
  handleDropAndSi: (item: string) => void;
  setCheckedGunGu: (item: string) => void;
  handelCloseModalAndSelect: () => void;
};

const CityModal = ({ isDropdown, setisDropdown, checkedcity, handleDropAndSi, setCheckedGunGu, handelCloseModalAndSelect }: Props) => {
  return (
    <InnerModalBox>
      =<div onClick={() => setisDropdown(!isDropdown)}>{checkedcity} ^</div>
      {isDropdown ? (
        <HiddenDropMenu>
          {city.map((item, index) => (
            <p onClick={() => handleDropAndSi(item)}>{item}</p>
          ))}
        </HiddenDropMenu>
      ) : null}
      <div>
        {cityObj[checkedcity].map((item: string, index: number) => (
          <p key={index} onClick={() => setCheckedGunGu(item)}>
            {item}
          </p>
        ))}
      </div>
      <button onClick={handelCloseModalAndSelect}>adad</button>
    </InnerModalBox>
  );
};

export default CityModal;

const InnerModalBox = styled.div`
  width: 60%;
  height: 80%;
  background-color: salmon;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > input {
    color: salmon;
  }

  @media only screen and (max-width: 590px) {
    width: 100%;
    height: 70%;
  }
`;

const HiddenDropMenu = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #37507d;
  border-radius: 7px;
  max-height: 200px;
  overflow-y: scroll;
`;

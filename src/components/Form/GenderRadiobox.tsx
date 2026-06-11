import { styled } from 'styled-components';

type TypeGenderRadioboxProps = {
  $checkedGender: string;
  $setCheckedGender: React.Dispatch<React.SetStateAction<string>>;
};

const GenderRadiobox = ({ $checkedGender, $setCheckedGender }: TypeGenderRadioboxProps) => {
  const genderChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    $setCheckedGender(event.target.value);
  };

  return (
    <SRadioField>
      <SRadioLabel htmlFor="female" $isGenderChecked={$checkedGender === '여성'}>
        여성
      </SRadioLabel>
      <SHiddenInput type="radio" id="female" name="gender" value="여성" checked={$checkedGender === '여성'} onChange={genderChangeHandler} />
      <SRadioLabel htmlFor="male" $isGenderChecked={$checkedGender === '남성'}>
        남성
      </SRadioLabel>
      <SHiddenInput type="radio" id="male" name="gender" value="남성" checked={$checkedGender === '남성'} onChange={genderChangeHandler} />
    </SRadioField>
  );
};

export default GenderRadiobox;

const SHiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const SRadioField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SRadioLabel = styled.label<{ $isGenderChecked: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => {
    if (props.$isGenderChecked === true) {
      return '1px solid #FE902F';
    } else {
      return '1px solid #696969';
    }
  }};
  color: ${(props) => {
    if (props.$isGenderChecked === true) {
      return ' #FE902F';
    } else {
      return '#696969';
    }
  }};

  cursor: pointer;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;

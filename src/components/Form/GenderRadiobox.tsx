import { styled } from 'styled-components';

type TypeGenderRadioboxProps = {
  $checkedGender: {
    female: boolean;
    male: boolean;
  };
  $setCheckedGender: React.Dispatch<
    React.SetStateAction<{
      female: boolean;
      male: boolean;
    }>
  >;
};

const GenderRadiobox: React.FC<TypeGenderRadioboxProps> = ({ $checkedGender, $setCheckedGender }) => {
  const genderChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ($checkedGender.male !== $checkedGender.female && event.target.name === 'female') $setCheckedGender((prev) => ({ male: !prev.male, female: !prev.female }));
    if ($checkedGender.male === $checkedGender.female && event.target.name === 'female') $setCheckedGender((prev) => ({ ...prev, female: true }));
    if ($checkedGender.male !== $checkedGender.female && event.target.name === 'male') $setCheckedGender((prev) => ({ male: !prev.male, female: !prev.female }));
    if ($checkedGender.male === $checkedGender.female && event.target.name === 'male') $setCheckedGender((prev) => ({ ...prev, male: true }));
  };

  return (
    <SRadioField>
      <SRadioLabel htmlFor="female" $isGenderChecked={$checkedGender.female}>
        여성
      </SRadioLabel>
      <SHiddenInput type="radio" id="female" name="female" value="female" checked={$checkedGender.female} onChange={genderChangeHandler} />
      <SRadioLabel htmlFor="male" $isGenderChecked={$checkedGender.male}>
        남성
      </SRadioLabel>
      <SHiddenInput type="radio" id="male" name="male" value="male" checked={$checkedGender.male} onChange={genderChangeHandler} />
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

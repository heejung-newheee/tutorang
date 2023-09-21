import { useEffect, useState } from 'react';
import { CheckboxOptionType } from '../../../constants/signup.constant';
import * as S from './Checkbox.style';

type CheckboxType = {
  $checkboxType: string;
  option: CheckboxOptionType;
  handleCheckedItems: (checkBoxType: string, value: string, isChecked: boolean) => void;
  checkItems: string[];
};

const Checkbox = ({ $checkboxType, option, handleCheckedItems, checkItems }: CheckboxType) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checkItems.includes(option.value));
  }, [checkItems, option.value]);

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checkItems.length >= 3 && event.target.checked === true) return false;
    setChecked(!checked);
    handleCheckedItems($checkboxType, event.target.value, event.target.checked);
  };

  return (
    <>
      <S.Label htmlFor={option.value} $labelType={$checkboxType} $isChecked={checked} $ableMoreCheck={checkItems.length <= 3 ? true : false}>
        {option.text}
      </S.Label>
      <S.HiddenInput id={option.value} type="checkbox" name={$checkboxType} value={option.value} checked={checked} onChange={(e) => handleCheckedChange(e)} />
    </>
  );
};

export default Checkbox;

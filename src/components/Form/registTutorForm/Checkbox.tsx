import { useState } from 'react';
import { styled } from 'styled-components';
import { CheckboxOptionType } from './constant';

type CheckboxType = {
  $checkboxType: string;
  option: CheckboxOptionType;
  handleCheckedItems: (checkBoxType: string, value: string, isChecked: boolean) => void;
  checkItems: string[];
};

const Checkbox: React.FC<CheckboxType> = ({ $checkboxType, option, handleCheckedItems, checkItems }) => {
  // checked state는 Checkbox 컴포넌트 내에서만 체크 상태관리
  const [checked, setChecked] = useState(false);

  // 외부 컴포넌트로 변경사항 전달 (RegistTutorForm에서 checked된 personality 저장)
  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checkItems.length >= 3 && event.target.checked === true) return false;
    setChecked(!checked);
    handleCheckedItems($checkboxType, event.target.value, event.target.checked);
  };

  return (
    <>
      <SLabel htmlFor={option.value} $labelType={$checkboxType} $isChecked={checked} $ableMoreCheck={checkItems.length <= 3 ? true : false}>
        {option.text}
      </SLabel>
      <SHiddenInput id={option.value} type="checkbox" name={$checkboxType} value={option.value} checked={checked} onChange={(e) => handleCheckedChange(e)} />
    </>
  );
};

export default Checkbox;

const SHiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const SLabel = styled.label<{ $labelType: string; $isChecked: boolean; $ableMoreCheck: boolean }>`
  /* width props로 안받고 하나로 통일할지 확인후 통일 */
  width: ${({ $labelType }) => {
    if ($labelType === 'personality') {
      return '32%';
    } else {
      return '32%';
    }
  }};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${({ $isChecked }) => {
    if ($isChecked === true) {
      // return '2.5px solid #FE902F';
      return '1px solid #FE902F';
    } else {
      return '1px solid #696969';
    }
  }};
  color: ${({ $isChecked }) => {
    if ($isChecked === true) {
      return '#FE902F';
    } else {
      return '#696969';
    }
  }};

  cursor: pointer;
  border-radius: 3px;

  /* cursor: ${({ $ableMoreCheck, $isChecked }) => ((!$ableMoreCheck && $isChecked) || $ableMoreCheck ? 'pointer' : 'default')}; */
  // if (!$ableMoreCheck && $isChecked) return 'pointer';
  // else if ($ableMoreCheck) return 'pointer';
  // else if (!$ableMoreCheck && !$isChecked) return 'defalut';
  // else {
  //   return 'defalut';
  // }
`;

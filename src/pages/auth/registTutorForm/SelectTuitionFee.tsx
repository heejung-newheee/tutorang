import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import * as C from './../../../components/Form/SelectBoxCommon.style';
import * as S from './SelectTuitionFee.style';

const TUITION_FEE_ONLINE = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
const TUITION_FEE_OFFLINE = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

type SelectTuitionFeeType = {
  $tuitionType: string;
  $selectTuitionFee: (option: number, tuitionType: string) => void;
  $prevValue: number;
};

const SelectTuitionFee = ({ $tuitionType, $selectTuitionFee, $prevValue }: SelectTuitionFeeType) => {
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState($prevValue || 0);

  let options: number[] = [];
  if ($tuitionType === 'online') {
    options = TUITION_FEE_ONLINE;
  } else if ($tuitionType === 'offline') {
    options = TUITION_FEE_OFFLINE;
  }

  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false);
  const handleOptionClick = async (option: number) => {
    setSelectedOption(option);
    setIsDropMenuOpen(false);
    $selectTuitionFee(option, $tuitionType);
  };

  useEffect(() => {
    const handleOutSideClose = (event: MouseEvent) => {
      if (isDropMenuOpen && !dropContainerRef.current?.contains(event.target as Node)) setIsDropMenuOpen(false);
    };
    document.addEventListener('click', handleOutSideClose);
    return () => document.removeEventListener('click', handleOutSideClose);
  }, [isDropMenuOpen]);

  return (
    <S.DropdownWrapper ref={dropContainerRef}>
      <S.DropDownHeader id={$tuitionType + 'Selectbox'} onClick={() => setIsDropMenuOpen((prev) => !prev)}>
        <S.SpanDefaultText $selectedOption={selectedOption}>{selectedOption === 0 ? '선택하세요' : selectedOption}</S.SpanDefaultText>
        <C.SvgAngleUpDownCover>{isDropMenuOpen ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
      </S.DropDownHeader>
      {isDropMenuOpen && (
        <S.OptionContainer $tuitionType={$tuitionType}>
          <S.Select>
            {options.map((option, index) => (
              <S.Option key={option + index} $optionValue={option} $selectedOption={selectedOption} onClick={() => handleOptionClick(option)}>
                {option}
              </S.Option>
            ))}
          </S.Select>
        </S.OptionContainer>
      )}
    </S.DropdownWrapper>
  );
};

export default SelectTuitionFee;

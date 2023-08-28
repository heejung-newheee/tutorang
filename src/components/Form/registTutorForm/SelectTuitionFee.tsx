import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { styled } from 'styled-components';

const TUITION_FEE_ONLINE = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
const TUITION_FEE_OFFLINE = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

type SelectTuitionFeeType = {
  $tuitionType: string;
  $selectTuitionFee: (option: number, tuitionType: string) => void;
};

const SelectTuitionFee: React.FC<SelectTuitionFeeType> = ({ $tuitionType, $selectTuitionFee }) => {
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(0);
  let options: number[] = [];
  if ($tuitionType === 'online') {
    options = TUITION_FEE_ONLINE;
  } else if ($tuitionType === 'offline') {
    options = TUITION_FEE_OFFLINE;
  }
  // const onlineFeeMenuRef = useRef<HTMLDivElement>(null);
  // const offlineFeeMenuRef = useRef<HTMLDivElement>(null);
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
    <SDropdownWrapper ref={dropContainerRef}>
      <SDropDownHeader id={$tuitionType + 'Selectbox'} onClick={() => setIsDropMenuOpen((prev) => !prev)}>
        <SpanDefaultText $selectedOption={selectedOption}>{selectedOption === 0 ? '선택하세요' : selectedOption}</SpanDefaultText>
        <FaAngleDown />
      </SDropDownHeader>
      {isDropMenuOpen && (
        <SOptionContainer $tuitionType={$tuitionType}>
          <Select>
            {options.map((option, index) => (
              <SOption key={option + index} $optionValue={option} $selectedOption={selectedOption} onClick={() => handleOptionClick(option)}>
                {option}
              </SOption>
            ))}
          </Select>
        </SOptionContainer>
      )}
    </SDropdownWrapper>
  );
};

export default SelectTuitionFee;

const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  box-sizing: border-box;
  /* width: 190px; */
  max-width: 250px;
  min-width: 180px;
  border: 1px solid #fe902f;
  position: relative;
  border-radius: 3px;
`;

const SDropDownHeader = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
`;
const SpanDefaultText = styled.span<{ $selectedOption: number }>`
  width: 100%;
  color: ${({ $selectedOption }) => ($selectedOption === 0 ? '#cdcdcd;' : '#000')};
`;
const SOptionContainer = styled.div<{ $tuitionType: string }>`
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  opacity: 1;
  z-index: ${({ $tuitionType }) => {
    if ($tuitionType === 'online') return '3';
    if ($tuitionType === 'offline') return '1';
  }};
  border: 1px solid #fe902f;
`;
const Select = styled.ul``;

// const SOption = styled.li<{ $selectedOption: boolean }>`
const SOption = styled.li<{ $optionValue: number; $selectedOption: number }>`
  box-sizing: border-box;
  padding: 12px;
  cursor: pointer;
  background-color: ${({ $optionValue, $selectedOption }) => {
    if ($optionValue === $selectedOption) {
      return '#eee';
    } else {
      return '#fff';
    }
  }};
`;
/* background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }}; */

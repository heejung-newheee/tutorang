import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { styled } from 'styled-components';
import { ENROLLMENT_STATUS } from './constant';

type TypeSelectEnrollmentStatus = {
  $setEnrollmentStatus: React.Dispatch<React.SetStateAction<string>>;
};

const SelectEnrollmentStatus: React.FC<TypeSelectEnrollmentStatus> = ({ $setEnrollmentStatus }) => {
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false);
  const handleOptionClick = async (option: string) => {
    setSelectedOption(option);
    setIsDropMenuOpen(false);
    $setEnrollmentStatus(option);
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
      <SDropDownHeader id="selectbox" onClick={() => setIsDropMenuOpen((prev) => !prev)}>
        <SpanDefaultText $selectedOption={selectedOption}>{selectedOption === '' ? '재학여부' : selectedOption}</SpanDefaultText>
        <FaAngleDown />
      </SDropDownHeader>
      {isDropMenuOpen && (
        <SOptionContainer>
          <Select>
            {ENROLLMENT_STATUS.map((option) => (
              <SOption key={option.value} $optionValue={option.text} $selectedOption={selectedOption} onClick={() => handleOptionClick(option.text)}>
                {option.text}
              </SOption>
            ))}
          </Select>
        </SOptionContainer>
      )}
    </SDropdownWrapper>
  );
};

export default SelectEnrollmentStatus;

const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  box-sizing: border-box;
  /* width: 190px; */
  height: 40px;
  max-width: 150px;
  min-width: 100px;
  border: 1px solid #696969;
  position: relative;
  border-radius: 3px;
`;

const SDropDownHeader = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
`;
const SpanDefaultText = styled.span<{ $selectedOption: string }>`
  width: 100%;
  color: ${({ $selectedOption }) => ($selectedOption === '' ? '#aeaeae;' : '#000')};
`;
const SOptionContainer = styled.div`
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  opacity: 1;
  border: 1px solid #696969;
  z-index: 1;
`;
const Select = styled.ul``;

// const SOption = styled.li<{ $selectedOption: boolean }>`
const SOption = styled.li<{ $optionValue: string; $selectedOption: string }>`
  box-sizing: border-box;
  height: 40px;
  padding: 8px;
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

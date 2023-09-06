import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { styled } from 'styled-components';
import { ENROLLMENT_STATUS } from '../../../constants/signup.constant';

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
        {isDropMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
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
  position: relative;
  box-sizing: border-box;
  min-width: 135px;
  border: 1px solid #696969;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    min-width: 105px;
  }
`;

const SDropDownHeader = styled.div`
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;
const SpanDefaultText = styled.span<{ $selectedOption: string }>`
  width: 100%;
  color: ${({ $selectedOption }) => ($selectedOption === '' ? '#aeaeae;' : '#000')};
`;
const SOptionContainer = styled.div`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 180px;
  background-color: #fff;
  border: 1px solid #696969;
  overflow-y: scroll;
  z-index: 1;
  opacity: 1;
`;
const Select = styled.ul``;

const SOption = styled.li<{ $optionValue: string; $selectedOption: string }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: ${({ $optionValue, $selectedOption }) => {
    if ($optionValue === $selectedOption) {
      return '#eee';
    } else {
      return '#fff';
    }
  }};
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

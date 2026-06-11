import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { ENROLLMENT_STATUS } from '../../../constants/signup.constant';
import * as C from './../../../components/Form/SelectBoxCommon.style';
import * as S from './SelectEnrollmentStatus.style';

type TypeSelectEnrollmentStatus = {
  $setEnrollmentStatus: React.Dispatch<React.SetStateAction<string>>;
  $selectedOption: string;
};

const SelectEnrollmentStatus = ({ $setEnrollmentStatus, $selectedOption }: TypeSelectEnrollmentStatus) => {
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>($selectedOption);

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
    <S.DropdownWrapper ref={dropContainerRef}>
      <S.DropDownHeader id="selectbox" onClick={() => setIsDropMenuOpen((prev) => !prev)}>
        <S.SpanDefaultText $selectedOption={selectedOption}>{selectedOption === '' ? '재학여부' : selectedOption}</S.SpanDefaultText>
        <C.SvgAngleUpDownCover>{isDropMenuOpen ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
      </S.DropDownHeader>
      {isDropMenuOpen && (
        <S.OptionContainer>
          <S.Select>
            {ENROLLMENT_STATUS.map((option) => (
              <S.Option key={option.value} $optionValue={option.text} $selectedOption={selectedOption} onClick={() => handleOptionClick(option.text)}>
                {option.text}
              </S.Option>
            ))}
          </S.Select>
        </S.OptionContainer>
      )}
    </S.DropdownWrapper>
  );
};

export default SelectEnrollmentStatus;

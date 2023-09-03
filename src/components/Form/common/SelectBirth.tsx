import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { styled } from 'styled-components';

type TypeSelectBirthType = {
  $setBirth: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
    }>
  >;
};

const SelectBirth: React.FC<TypeSelectBirthType> = ({ $setBirth }) => {
  const yearDropContainerRef = useRef<HTMLDivElement>(null);
  const monthDropContainerRef = useRef<HTMLDivElement>(null);
  const dayDropContainerRef = useRef<HTMLDivElement>(null);
  const now = new Date();

  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [isDateOpen, setIsDateOpen] = useState({
    year: false,
    month: false,
    day: false,
  });

  const birthYearOptions = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    birthYearOptions.push(y);
  }

  // 월, 일 2자리
  const birthMonthOptions = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      birthMonthOptions.push('0' + m.toString());
    } else {
      birthMonthOptions.push(m.toString());
    }
  }

  const birthDayOptions = [];
  const date = new Date(+birth.year, +birth.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      birthDayOptions.push('0' + d.toString());
    } else {
      birthDayOptions.push(d.toString());
    }
  }

  const selectDateOption = (value: string, dateType: string) => {
    // console.log(value, dateType);
    if (dateType === 'year') {
      setBirth((prev) => ({ ...prev, year: value }));
      $setBirth((prev) => ({ ...prev, year: value }));
      setIsDateOpen((prev) => ({ ...prev, year: !prev.year }));
    }
    if (dateType === 'month') {
      setBirth((prev) => ({ ...prev, month: value }));
      $setBirth((prev) => ({ ...prev, month: value }));
      setIsDateOpen((prev) => ({ ...prev, month: !prev.month }));
    }
    if (dateType === 'day') {
      setBirth((prev) => ({ ...prev, day: value }));
      $setBirth((prev) => ({ ...prev, day: value }));
      setIsDateOpen((prev) => ({ ...prev, day: !prev.day }));
    }
  };

  useEffect(() => {
    const handleOutSideClose = (event: MouseEvent) => {
      if (
        (isDateOpen.year && !yearDropContainerRef.current?.contains(event.target as Node)) ||
        (isDateOpen.month && !monthDropContainerRef.current?.contains(event.target as Node)) ||
        (isDateOpen.day && !dayDropContainerRef.current?.contains(event.target as Node))
      )
        setIsDateOpen({
          year: false,
          month: false,
          day: false,
        });
    };
    document.addEventListener('click', handleOutSideClose);
    return () => document.removeEventListener('click', handleOutSideClose);
  }, [isDateOpen]);

  return (
    <SDropdownField>
      <SDropdownWrapper ref={yearDropContainerRef}>
        <SDropDownHeader id="birthYearDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, year: !prev.year }))}>
          <span>{birth.year || '년도'}</span>
          {isDateOpen.year ? <FaAngleDown /> : <FaAngleUp />}
        </SDropDownHeader>
        {isDateOpen.year && (
          <SOptionContainer>
            <Select>
              {birthYearOptions.map((option) => (
                <SOption key={option} $selectedOption={birth.year === option.toString()} onClick={() => selectDateOption(option.toString(), 'year')}>
                  {option}
                </SOption>
              ))}
            </Select>
          </SOptionContainer>
        )}
      </SDropdownWrapper>
      <SDropdownWrapper ref={monthDropContainerRef}>
        <SDropDownHeader id="birthMonthDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, month: !prev.month }))}>
          <span>{birth.month || '월'}</span>
          {isDateOpen.month ? <FaAngleDown /> : <FaAngleUp />}
        </SDropDownHeader>
        {isDateOpen.month && (
          <SOptionContainer>
            <Select>
              {birthMonthOptions.map((option) => (
                <SOption key={option} $selectedOption={birth.month === option} onClick={() => selectDateOption(option, 'month')}>
                  {option}
                </SOption>
              ))}
            </Select>
          </SOptionContainer>
        )}
      </SDropdownWrapper>
      <SDropdownWrapper ref={dayDropContainerRef}>
        <SDropDownHeader id="birthDayDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, day: !prev.day }))}>
          <span>{birth.day || '일'}</span>
          {isDateOpen.day ? <FaAngleDown /> : <FaAngleUp />}
        </SDropDownHeader>
        {isDateOpen.day && (
          <SOptionContainer>
            <Select>
              {birthDayOptions.map((option) => (
                <SOption key={option} $selectedOption={birth.day === option} onClick={() => selectDateOption(option, 'day')}>
                  {option}
                </SOption>
              ))}
            </Select>
          </SOptionContainer>
        )}
      </SDropdownWrapper>
    </SDropdownField>
  );
};

export default SelectBirth;

/* select box (drop down)  */
const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  position: relative;
  width: 100%;
  border: 1px solid #696969;
  border-radius: 3px;
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

const SOptionContainer = styled.div<{ $selectOptionsType?: string }>`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 180px;
  background-color: #fff;
  border: 1px solid #696969;
  overflow-y: scroll;
  z-index: ${({ $selectOptionsType }) => {
    if ($selectOptionsType === 'location1') return '3';
    else return '1';
  }};
`;
const Select = styled.ul``;

const SOption = styled.li<{ $selectedOption: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: ${(props) => {
    if (props.$selectedOption === true) return '#eee';
    else return '#fff';
  }};
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

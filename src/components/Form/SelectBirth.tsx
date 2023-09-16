import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import * as S from './SelectBirth.style';
import * as C from './SelectBoxCommon.style';

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
    if (dateType === 'year') {
      setBirth((prev) => ({ ...prev, year: value }));
      $setBirth((prev) => ({ ...prev, year: value }));
      setIsDateOpen((prev) => ({ ...prev, year: !prev.year }));
    }
    if (dateType === 'month') {
      setBirth((prev) => ({ ...prev, month: value }));
      $setBirth((prev) => ({ ...prev, month: value }));
      setIsDateOpen((prev) => ({ ...prev, month: !prev.month }));
      setBirth((prev) => ({ ...prev, day: '' }));
      $setBirth((prev) => ({ ...prev, day: '' }));
      setIsDateOpen((prev) => ({ ...prev, day: false }));
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
    <S.DropdownField>
      <S.DropdownWrapper ref={yearDropContainerRef}>
        <S.DropDownHeader id="birthYearDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, year: !prev.year }))}>
          <span>{birth.year || '년도'}</span>
          <C.SvgAngleUpDownCover>{isDateOpen.year ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
        </S.DropDownHeader>
        {isDateOpen.year && (
          <S.OptionContainer>
            <S.Select>
              {birthYearOptions.map((option) => (
                <S.Option key={option} $selectedOption={birth.year === option.toString()} onClick={() => selectDateOption(option.toString(), 'year')}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
          </S.OptionContainer>
        )}
      </S.DropdownWrapper>
      <S.DropdownWrapper ref={monthDropContainerRef}>
        <S.DropDownHeader id="birthMonthDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, month: !prev.month }))}>
          <span>{birth.month || '월'}</span>
          <C.SvgAngleUpDownCover>{isDateOpen.month ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
        </S.DropDownHeader>
        {isDateOpen.month && (
          <S.OptionContainer>
            <S.Select>
              {birthMonthOptions.map((option) => (
                <S.Option key={option} $selectedOption={birth.month === option} onClick={() => selectDateOption(option, 'month')}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
          </S.OptionContainer>
        )}
      </S.DropdownWrapper>
      <S.DropdownWrapper ref={dayDropContainerRef}>
        <S.DropDownHeader id="birthDayDropdown" onClick={() => setIsDateOpen((prev) => ({ ...prev, day: !prev.day }))}>
          <span>{birth.day || '일'}</span>
          <C.SvgAngleUpDownCover>{isDateOpen.day ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
        </S.DropDownHeader>
        {isDateOpen.day && (
          <S.OptionContainer>
            <S.Select>
              {birthDayOptions.map((option) => (
                <S.Option key={option} $selectedOption={birth.day === option} onClick={() => selectDateOption(option, 'day')}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
          </S.OptionContainer>
        )}
      </S.DropdownWrapper>
    </S.DropdownField>
  );
};

export default SelectBirth;

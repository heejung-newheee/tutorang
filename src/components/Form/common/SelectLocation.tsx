import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { styled } from 'styled-components';
import { AREA0, AREA1, AREA10, AREA11, AREA12, AREA13, AREA14, AREA15, AREA16, AREA2, AREA3, AREA4, AREA5, AREA6, AREA7, AREA8, AREA9 } from '../../../api/cities';
interface CityData {
  [key: string]: string[];
}

type TypeSelectLocationProps = {
  $locationType: string;
  $setLocation: React.Dispatch<
    React.SetStateAction<{
      sido1: string;
      gugun1: string;
      sido2: string;
      gugun2: string;
    }>
  >;
};

const cities: CityData = { AREA0, AREA1, AREA2, AREA3, AREA4, AREA5, AREA6, AREA7, AREA8, AREA9, AREA10, AREA11, AREA12, AREA13, AREA14, AREA15, AREA16 };

const SelectLocation: React.FC<TypeSelectLocationProps> = ({ $locationType, $setLocation }) => {
  const sidoDropContainerRef = useRef<HTMLDivElement>(null);
  const gugunDropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState({ sido: '시/도 선택', gugun: '구/군 선택' });
  const [gugunOptions, setGugunOptions] = useState<string[]>([]);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState({ sido: false, gugun: false });

  const handleOptionClick = async (option: string, locationDomain: string, preCode: string) => {
    if (locationDomain === 'sido') {
      setGugunOptions([]);
      setSelectedOption((prev) => ({ sido: option, gugun: prev.gugun }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, sido1: option })) : $setLocation((prev) => ({ ...prev, sido2: option }));

      setIsDropMenuOpen(() => ({ sido: false, gugun: false }));
      if (option === '전체') return setSelectedOption((prev) => ({ ...prev, gugun: '구/군 선택' }));

      const gugunCode = 'AREA' + preCode;
      const options = cities[gugunCode];
      setGugunOptions(options);
      setSelectedOption((prev) => ({ sido: prev.sido, gugun: options[0] }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, gugun1: options[0] })) : $setLocation((prev) => ({ ...prev, gugun2: options[0] }));
    }
    if (locationDomain === 'gugun') {
      setSelectedOption((prev) => ({ sido: prev.sido, gugun: option }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, gugun1: option })) : $setLocation((prev) => ({ ...prev, gugun2: option }));

      setIsDropMenuOpen(() => ({ sido: false, gugun: false }));
    }
  };

  useEffect(() => {
    const handleOutSideClose = (event: MouseEvent) => {
      if ((isDropMenuOpen.sido && !sidoDropContainerRef.current?.contains(event.target as Node)) || (isDropMenuOpen.gugun && !gugunDropContainerRef.current?.contains(event.target as Node))) setIsDropMenuOpen({ sido: false, gugun: false });
    };
    document.addEventListener('click', handleOutSideClose);
    return () => document.removeEventListener('click', handleOutSideClose);
  }, [isDropMenuOpen]);

  return (
    <SDropdownField>
      <SDropdownWrapper ref={sidoDropContainerRef}>
        <SDropDownHeader onClick={() => setIsDropMenuOpen((prev) => ({ sido: !prev.sido, gugun: false }))}>
          <SpanDefaultText $locationDomain={'sido'} $selectedOption={selectedOption.sido}>
            {selectedOption.sido}
          </SpanDefaultText>
          {isDropMenuOpen.sido ? <FaAngleDown /> : <FaAngleUp />}
        </SDropDownHeader>
        {isDropMenuOpen.sido && (
          <SOptionContainer $locationType={$locationType}>
            <Select>
              {cities.AREA0.map((option, index) => (
                <SOption key={option} $optionValue={option} $selectedOption={selectedOption.sido} onClick={() => handleOptionClick(option, 'sido', index.toString())}>
                  {option}
                </SOption>
              ))}
            </Select>
          </SOptionContainer>
        )}
      </SDropdownWrapper>
      <SDropdownWrapper ref={gugunDropContainerRef}>
        <SDropDownHeader onClick={() => setIsDropMenuOpen((prev) => ({ sido: false, gugun: !prev.gugun }))}>
          <SpanDefaultText $locationDomain={'gugun'} $selectedOption={selectedOption.gugun}>
            {selectedOption.gugun}
          </SpanDefaultText>
          {isDropMenuOpen.gugun ? <FaAngleDown /> : <FaAngleUp />}
        </SDropDownHeader>
        {isDropMenuOpen.gugun && (
          <SOptionContainer $locationType={$locationType}>
            <Select>
              {gugunOptions.map((option, index) => (
                <SOption key={option} $optionValue={option} $selectedOption={selectedOption.gugun} onClick={() => handleOptionClick(option, 'gugun', index.toString())}>
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

export default SelectLocation;

const SDropdownWrapper = styled.div`
  // 이거 width 100%로 해도 되는건가..
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #696969;
  position: relative;
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
const SpanDefaultText = styled.span<{ $locationDomain: string; $selectedOption: string }>`
  width: 100%;
`;
const SOptionContainer = styled.div<{ $locationType: string }>`
  background-color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  max-height: 180px;
  left: 0;
  overflow-y: scroll;
  opacity: 1;
  z-index: ${({ $locationType }) => {
    if ($locationType === 'locationType1') return '3';
    if ($locationType === 'locationType2') return '1';
  }};
  border: 1px solid #696969;
`;
const Select = styled.ul``;

const SOption = styled.li<{ $optionValue: string; $selectedOption: string }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  cursor: pointer;
  background-color: ${({ $optionValue, $selectedOption }) => {
    if ($optionValue === $selectedOption) {
      return '#eee';
    } else {
      return '#fff';
    }
  }};
  @media screen and (max-width: 420px) {
    height: 45px;
    line-height: 45px;
  }
`;

const SDropdownField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

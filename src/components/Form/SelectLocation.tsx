import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { AREA0, 강원, 경기, 경남, 경북, 광주, 대구, 대전, 부산, 서울, 울산, 인천, 전남, 전북, 제주, 충남, 충북 } from '../../constants/location.constant';
import * as C from './SelectBoxCommon.style';
import * as S from './SelectLocation.style';
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
  $prevValue?: {
    sido1: string;
    gugun1: string;
    sido2: string;
    gugun2: string;
  };
};

const preCities: CityData = { AREA0, 서울, 인천, 대전, 광주, 대구, 울산, 부산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 };
const cities: CityData = {};
const preCityKeys = Object.keys(preCities);
const preCityValues = Object.values(preCities);
for (let i = 0; i < preCityKeys.length; i++) {
  const key = preCityKeys[i];
  cities[key] = preCityValues[i].slice(1);
}

const SelectLocation: React.FC<TypeSelectLocationProps> = ({ $locationType, $setLocation, $prevValue }) => {
  const sidoDropContainerRef = useRef<HTMLDivElement>(null);
  const gugunDropContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState({ sido: '시/도 선택', gugun: '구/군 선택' });
  const [gugunOptions, setGugunOptions] = useState<string[]>([]);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState({ sido: false, gugun: false });

  useEffect(() => {
    if (!!$prevValue && $locationType === 'locationType1') {
      setSelectedOption({
        sido: $prevValue.sido1,
        gugun: $prevValue.gugun1,
      });
      const options = cities[$prevValue.sido1];
      setGugunOptions(options);
    }
    if (!!$prevValue && $locationType === 'locationType2') {
      setSelectedOption({
        sido: $prevValue.sido2,
        gugun: $prevValue.gugun2,
      });
      const options = cities[$prevValue.sido2];
      setGugunOptions(options);
    }
  }, []);
  useEffect(() => {
    const handleOutSideClose = (event: MouseEvent) => {
      if ((isDropMenuOpen.sido && !sidoDropContainerRef.current?.contains(event.target as Node)) || (isDropMenuOpen.gugun && !gugunDropContainerRef.current?.contains(event.target as Node))) setIsDropMenuOpen({ sido: false, gugun: false });
    };
    document.addEventListener('click', handleOutSideClose);
    return () => document.removeEventListener('click', handleOutSideClose);
  }, [isDropMenuOpen]);

  const handleOptionClick = async (option: string, locationDomain: string) => {
    if (locationDomain === 'sido') {
      setGugunOptions([]);
      setSelectedOption((prev) => ({ sido: option, gugun: prev.gugun }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, sido1: option })) : $setLocation((prev) => ({ ...prev, sido2: option }));

      setIsDropMenuOpen(() => ({ sido: false, gugun: false }));

      const options = cities[option];
      setGugunOptions(options);

      setSelectedOption((prev) => ({ sido: prev.sido, gugun: '구/군 선택' }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, gugun1: '구/군 선택' })) : $setLocation((prev) => ({ ...prev, gugun2: '구/군 선택' }));
    }
    if (locationDomain === 'gugun') {
      setSelectedOption((prev) => ({ sido: prev.sido, gugun: option }));
      $locationType === 'locationType1' ? $setLocation((prev) => ({ ...prev, gugun1: option })) : $setLocation((prev) => ({ ...prev, gugun2: option }));

      setIsDropMenuOpen(() => ({ sido: false, gugun: false }));
    }
  };

  return (
    <S.DropdownField>
      <S.DropdownWrapper ref={sidoDropContainerRef}>
        <S.DropDownHeader onClick={() => setIsDropMenuOpen((prev) => ({ sido: !prev.sido, gugun: false }))}>
          <S.SpanDefaultText $locationDomain={'sido'} $selectedOption={selectedOption.sido}>
            {selectedOption.sido}
          </S.SpanDefaultText>
          <C.SvgAngleUpDownCover>{isDropMenuOpen.sido ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
        </S.DropDownHeader>
        {isDropMenuOpen.sido && (
          <S.OptionContainer $locationType={$locationType}>
            <S.Select>
              {cities.AREA0.map((option) => (
                <S.Option key={option} $optionValue={option} $selectedOption={selectedOption.sido} onClick={() => handleOptionClick(option, 'sido')}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
          </S.OptionContainer>
        )}
      </S.DropdownWrapper>
      <S.DropdownWrapper ref={gugunDropContainerRef}>
        <S.DropDownHeader onClick={() => setIsDropMenuOpen((prev) => ({ sido: false, gugun: !prev.gugun }))}>
          <S.SpanDefaultText $locationDomain={'gugun'} $selectedOption={selectedOption.gugun}>
            {selectedOption.gugun}
          </S.SpanDefaultText>
          <C.SvgAngleUpDownCover>{isDropMenuOpen.gugun ? <FaAngleUp /> : <FaAngleDown />}</C.SvgAngleUpDownCover>
        </S.DropDownHeader>
        {isDropMenuOpen.gugun && (
          <S.OptionContainer $locationType={$locationType}>
            <S.Select>
              {gugunOptions.map((option) => (
                <S.Option key={option} $optionValue={option} $selectedOption={selectedOption.gugun} onClick={() => handleOptionClick(option, 'gugun')}>
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

export default SelectLocation;

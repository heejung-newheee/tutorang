import * as S from '../../../pages/list/selectBox/SelectBox.styled';

type Props = {
  selectedArr: string[][];
  DeleteFilterBar: (item: string[]) => void;
  reset: () => void;
};

const FilterBarCompo = ({ selectedArr, DeleteFilterBar, reset }: Props) => {
  return (
    <S.FilterBar>
      <S.FiterWrap>
        {selectedArr.map((item, index) => (
          <S.FiterWrapButton onClick={() => DeleteFilterBar(item)} key={index}>
            <div>
              {item[1]}
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </div>
          </S.FiterWrapButton>
        ))}
      </S.FiterWrap>
      <S.ResetDiv onClick={reset}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#9d9d9d" height="1em" viewBox="0 0 512 512">
          <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
        </svg>
      </S.ResetDiv>
    </S.FilterBar>
  );
};

export default FilterBarCompo;

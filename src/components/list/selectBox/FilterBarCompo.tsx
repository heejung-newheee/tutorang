import { select_reset, select_x } from '../../../assets';
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
              <img src={select_x} alt="" />
            </div>
          </S.FiterWrapButton>
        ))}
      </S.FiterWrap>
      <S.ResetDiv onClick={reset}>
        <img src={select_reset} alt="" />
      </S.ResetDiv>
    </S.FilterBar>
  );
};

export default FilterBarCompo;

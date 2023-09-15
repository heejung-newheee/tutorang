import Checkbox from '@mui/material/Checkbox';
import { Price, SelectedFilters } from '../../../@types/list/listType';
import { handlePriceFilter } from '../../../pages/list/utility';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  item: Price;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
  setSelectedArr: Dispatch<SetStateAction<string[][]>>;
  isChecked: (item: string) => boolean;
};

const CheckBoxPrice = ({ item, setSelectedFilters, setSelectedArr, isChecked }: Props) => {
  return (
    <div key={item.min}>
      <Checkbox
        sx={{
          color: 'gray',
          '&.Mui-checked': {
            color: '#fe902f',
          },
        }}
        id={`check-${item.optionPrice}`}
        onClick={() => handlePriceFilter(item, setSelectedFilters, setSelectedArr)}
        checked={isChecked(item.optionPrice)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <label htmlFor={`check-${item.optionPrice}`}>{item.optionPrice}</label>
    </div>
  );
};

export default CheckBoxPrice;

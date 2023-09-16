import Checkbox from '@mui/material/Checkbox';

type Props = {
  item: string;
  filteredMenu: string;
  handleFilterdObj: (item: string, category: string) => void;
  isChecked: (item: string) => boolean;
};

const CheckBoxSelect = ({ item, filteredMenu, handleFilterdObj, isChecked }: Props) => {
  return (
    <div key={`check-${item}`}>
      <Checkbox
        sx={{
          color: 'gray',
          '&.Mui-checked': {
            color: '#fe902f',
          },
        }}
        id={`check-${item}`}
        onClick={() => handleFilterdObj(item, filteredMenu)}
        checked={isChecked(item)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <label htmlFor={`check-${item}`}>{item}</label>
    </div>
  );
};

export default CheckBoxSelect;

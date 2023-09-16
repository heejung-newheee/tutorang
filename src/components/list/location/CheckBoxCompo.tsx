import Checkbox from '@mui/material/Checkbox';

type Props = {
  item: string;
  checkedGunGu: string;
};
const CheckBoxCompo = ({ item, checkedGunGu }: Props) => {
  return (
    <>
      <Checkbox
        sx={{
          color: 'gray',
          '&.Mui-checked': {
            color: '#fe902f',
          },
        }}
        id={`check-${item}-gungu`}
        checked={checkedGunGu === item}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <label htmlFor={`check-${item}-gungu`}>{item}</label>
    </>
  );
};

export default CheckBoxCompo;

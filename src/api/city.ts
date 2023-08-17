import axios from 'axios';
import { CityDataAll } from '../@types/city/cityType';

export const fetchCity = async (): Promise<CityDataAll> => {
  const response = await axios.get(
    `https://api.vworld.kr/req/data?key=${process.env.VITE_CITY_KEY}&domain=${process.env.VITE_DOMAIN}&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:4326&geomfilter=BOX(122.77143441739624, 32.689674111652815, 133.16466627619113, 42.0516845871052)&data=LT_C_ADSIDO_INFO`,
  );
  return response;
};

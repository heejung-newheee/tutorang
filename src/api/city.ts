// import axios from 'axios';
// import { CityDataAll } from '../@types/city/cityType';

// export const fetchCity = async (): Promise<CityDataAll> => {
//   const response = await axios.get(
//     `https://api.vworld.kr/req/data?key=${process.env.VITE_CITY_KEY}&domain=${process.env.VITE_DOMAIN}&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:4326&geomfilter=BOX(122.77143441739624, 32.689674111652815, 133.16466627619113, 42.0516845871052)&data=LT_C_ADSIDO_INFO`,
//   );
//   return response;
// };

// export const fetchGoon = async (): Promise<CityDataAll> => {
//   const response = await axios.get(
//   `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIGG_INFO&key=${process.env.VITE_CITY_KEY}&domain=${process.env.VITE_DOMAIN}&format=json&attrFilter=full_nm:like:%${}&geometry=false`,
//   );
//   return response;
//   };

const city = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '세종', '전북', '전남', '경북', '경남', '제주'];

const cityObj = {
  서울: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  부산: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
  대구: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
};

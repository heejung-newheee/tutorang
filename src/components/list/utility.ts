export const AREA0 = ['전체', '서울', '인천', '대전', '광주', '대구', '울산', '부산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

export const 서울 = [
  '전체',
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
];
export const 인천 = ['전체', '계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'];
export const 대전 = ['전체', '대덕구', '동구', '서구', '유성구', '중구'];
export const 광주 = ['전체', '광산구', '남구', '동구', '북구', '서구'];
export const 대구 = ['전체', '남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'];
export const 울산 = ['전체', '남구', '동구', '북구', '중구', '울주군'];
export const 부산 = ['전체', '강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'];
export const 경기 = [
  '전체',
  '고양시',
  '과천시',
  '광명시',
  '광주시',
  '구리시',
  '군포시',
  '김포시',
  '남양주시',
  '동두천시',
  '부천시',
  '성남시',
  '수원시',
  '시흥시',
  '안산시',
  '안성시',
  '안양시',
  '양주시',
  '오산시',
  '용인시',
  '의왕시',
  '의정부시',
  '이천시',
  '파주시',
  '평택시',
  '포천시',
  '하남시',
  '화성시',
  '가평군',
  '양평군',
  '여주군',
  '연천군',
];
export const 강원 = ['전체', '강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시', '태백시', '고성군', '양구군', '양양군', '영월군', '인제군', '정선군', '철원군', '평창군', '홍천군', '화천군', '횡성군'];
export const 충북 = ['전체', '제천시', '청주시', '충주시', '괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '증평군', '진천군', '청원군'];
export const 충남 = ['전체', '계룡시', '공주시', '논산시', '보령시', '서산시', '아산시', '천안시', '금산군', '당진군', '부여군', '서천군', '연기군', '예산군', '청양군', '태안군', '홍성군'];
export const 전북 = ['전체', '군산시', '김제시', '남원시', '익산시', '전주시', '정읍시', '고창군', '무주군', '부안군', '순창군', '완주군', '임실군', '장수군', '진안군'];
export const 전남 = ['전체', '광양시', '나주시', '목포시', '순천시', '여수시', '강진군', '고흥군', '곡성군', '구례군', '담양군', '무안군', '보성군', '신안군', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'];
export const 경북 = [
  '전체',
  '경산시',
  '경주시',
  '구미시',
  '김천시',
  '문경시',
  '상주시',
  '안동시',
  '영주시',
  '영천시',
  '포항시',
  '고령군',
  '군위군',
  '봉화군',
  '성주군',
  '영덕군',
  '영양군',
  '예천군',
  '울릉군',
  '울진군',
  '의성군',
  '청도군',
  '청송군',
  '칠곡군',
];
export const 경남 = ['전체', '거제시', '김해시', '마산시', '밀양시', '사천시', '양산시', '진주시', '진해시', '창원시', '통영시', '거창군', '고성군', '남해군', '산청군', '의령군', '창녕군', '하동군', '함안군', '함양군', '합천군'];
export const 제주 = ['전체', '서귀포시', '제주시', '남제주군', '북제주군'];

// type price = { priceNum: string; min: number; max: number }[];

export const gender: string[] = ['전체', '여성', '남성'];
export const level: string[] = ['전체', '초급', '중급', '고급'];
export const age: string[] = ['전체', '10대', '20대', '30대', '40대', '50대'];
// export const price: price = [
//   { priceNum: '전체', min: 0, max: 100000 },
//   { priceNum: '0 ~ 10,000', min: 0, max: 10000 },
//   { priceNum: '10,000 ~ 15,000', min: 10000, max: 15000 },
//   { priceNum: '15,000 ~ 20,000', min: 15000, max: 20000 },
//   { priceNum: '20,000 ~ 25,000', min: 20000, max: 25000 },
//   { priceNum: '25,000 ~ 30,000', min: 25000, max: 30000 },
// ];

export const handleAgeNum = (item: string) => {
  let ageNum = 0;
  switch (item) {
    case '10대':
      ageNum = 10;
      return ageNum;
    case '20대':
      ageNum = 20;
      return ageNum;
    case '30대':
      ageNum = 30;
      return ageNum;
    case '40대':
      ageNum = 40;
      return ageNum;
    case '50대':
      ageNum = 50;
      return ageNum;
    case '60대':
      ageNum = 60;
      return ageNum;

    default:
      break;
  }
};

//types
export type SelectedFilters = {
  gender: string[];
  level: string[];
  minPrice: number;
  maxPrice: number;
  priceType: string;
  location1: string;
  location2: string;
  age: number[];
  classStyle: string;
};

//debounceing

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);
    return result;
  };
};

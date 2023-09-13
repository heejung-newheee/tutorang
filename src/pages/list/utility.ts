import { Dispatch, SetStateAction } from 'react';
import { Price, SelectedFilters } from '../../@types/list/listType';

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

export const SearchDebounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
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

export const handleGenderFilter = (item: string, setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, selectedFilters: SelectedFilters, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  if (item === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: [] });
    setSelectedArr((pre: string[][]) => [...pre.filter((item) => item[0] !== 'gender')]);
    return;
  } else if (item !== '전체') {
    if (selectedFilters?.gender.find((i: string) => i === item) === undefined) {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: [...pre.gender, item] });
      setSelectedArr((pre: string[][]) => [...pre, ['gender', item]]);
      return;
    } else {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: pre.gender.filter((i: string) => i !== item) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
      return;
    }
  }
  return;
};

export const handleLevelFilter = (item: string, setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, selectedFilters: SelectedFilters, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  if (item === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: [] });
    setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'level')]);
  } else if (item !== '전체') {
    if (selectedFilters?.level.find((i: string) => i === item) === undefined) {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: [...pre.level, item] });
      setSelectedArr((pre: string[][]) => [...pre, ['level', item]]);
    } else {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: pre.level.filter((i: string) => i !== item) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
    }
  }
  return;
};

export const handleAgeFilter = (item: string, setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, selectedFilters: SelectedFilters, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  let ageNum = handleAgeNum(item);

  if (item === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: [] });
    setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'age')]);
  } else if (item !== '전체') {
    if (selectedFilters?.age.find((i: number) => i === ageNum) === undefined) {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: [...pre.age, Number(ageNum)] });
      setSelectedArr((pre: string[][]) => [...pre, ['age', item]]);
    } else {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: pre.age.filter((i: number) => i !== ageNum) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
    }
  }
  return;
};

export const handleLanguageFilter = (item: string, setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, selectedFilters: SelectedFilters, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  if (item === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, speakingLanguage: [] });
    setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'speakingLanguage')]);
  } else if (item !== '전체') {
    if (selectedFilters?.speakingLanguage.find((i: string) => i === item) === undefined) {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, speakingLanguage: [...pre.speakingLanguage, item] });
      setSelectedArr((pre: string[][]) => [...pre, ['speakingLanguage', item]]);
    } else {
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, speakingLanguage: pre.speakingLanguage.filter((i: string) => i !== item) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item));
    }
  }
  return;
};

export const handleCityModalFilter = (setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, _: SelectedFilters, setSelectedArr: Dispatch<SetStateAction<string[][]>>, checkedcity: string, checkedGunGu: string) => {
  if (checkedcity === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location1: '', location2: '' });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location1'));
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
  } else {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location1: checkedcity, location2: '' });

    setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location1'), ['location1', checkedcity]]);
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
  }

  if (checkedGunGu === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location2: '' });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'location2'));
  } else if (checkedGunGu) {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location2: checkedGunGu });

    setSelectedArr((pre) => [...pre.filter((item) => item[0] !== 'location2'), ['location2', checkedGunGu]]);
  }
  return;
};

export const handlePriceFilter = (item: Price, setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  if (item.optionPrice === '전체') {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, maxPrice: item.max, minPrice: item.min });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
  } else {
    setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, maxPrice: item.max, minPrice: item.min });
    setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
    setSelectedArr((pre) => [...pre, ['price', item.optionPrice]]);
  }
};

export const handleDeleteFilterBar = (item: string[], setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>, setSelectedArr: Dispatch<SetStateAction<string[][]>>) => {
  switch (item[0]) {
    case 'gender':
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, gender: pre.gender.filter((i: string) => i !== item[1]) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));
      break;

    case 'level':
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, level: pre.level.filter((i: string) => i !== item[1]) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));
      break;

    case 'age':
      let ageNum = handleAgeNum(item[1]);

      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, age: pre.age.filter((i: number) => i !== ageNum) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));
      break;

    case 'location1':
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location1: '', location2: '' });
      setSelectedArr((pre) => pre.filter((i) => i[0] !== 'location1'));
      setSelectedArr((pre) => pre.filter((i) => i[0] !== 'location2'));
      break;

    case 'location2':
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, location2: '' });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));
      break;

    case 'price':
      setSelectedArr((pre) => pre.filter((item) => item[0] !== 'price'));
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, minPrice: 0, maxPrice: 100000, priceType: '전체' });
      break;

    case 'speakingLanguage':
      setSelectedFilters((pre: SelectedFilters) => pre && { ...pre, speakingLanguage: pre.speakingLanguage.filter((i: string) => i !== item[1]) });
      setSelectedArr((pre) => pre.filter((i) => i[1] !== item[1]));
      break;

    default:
      break;
  }
};

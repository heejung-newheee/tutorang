export type Price = {
  optionPrice: string;
  min: number;
  max: number;
};
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
  speakingLanguage: string[];
};

export type FilterMenuObj = {
  [key: string]: string[];
};

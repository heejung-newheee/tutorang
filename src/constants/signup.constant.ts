import { Price } from '../@types/list/listType';

export type CheckboxOptionType = { value: string; text: string; description?: string };

export const PERSONALITY_LIST: CheckboxOptionType[] = [
  { value: 'intellectual', text: '지적인' },
  { value: 'calm', text: '차분한' },
  { value: 'humorous', text: '유머있는' },
  { value: 'optimistic', text: '낙천적인' },
  { value: 'passionate', text: '열정적인' },
  { value: 'emotional', text: '감성적인' },
  { value: 'introverted', text: '내향적인' },
  { value: 'extroverted', text: '외향적인' },
  { value: 'kind', text: '상냥한' },
  { value: 'unique', text: '개성있는' },
];

export const AVAILABLE_LANGUAGE_LIST: CheckboxOptionType[] = [
  { value: 'KR', text: '한국어' },
  { value: 'JP', text: '일본어' },
  { value: 'CH', text: '중국어' },
];

export const CLASSLEVEL_LIST: CheckboxOptionType[] = [
  { value: 'Beginner', text: '초급', description: '기본적인 인사와 간단한 일상 대화를 배우며 기초적인 문법과 어휘를 익히는 단계' },
  { value: 'Intermediate', text: '중급', description: '좀 더 복잡한 주제에 대해 의사소통하고 일상 대화 뿐만 아니라 간단한 토론과 의견 표현을 연습하는 단계.' },
  { value: 'Advanced', text: '고급', description: '심도 있는 토론과 주제에 대한 깊은 이해를 바탕으로 논리적인 의견을 표현하고 어려운 어휘와 문법을 다루는 단계' },
];

export const ENROLLMENT_STATUS: CheckboxOptionType[] = [
  { value: 'enrolled', text: '재학중' },
  { value: 'onLeave', text: '휴학중' },
  { value: 'graduated', text: '졸업' },
  { value: 'withdrawn', text: '중퇴' },
];

export const gender: string[] = ['전체', '여성', '남성'];
export const level: string[] = ['전체', '초급', '중급', '고급'];
export const age: string[] = ['전체', '10대', '20대', '30대', '40대', '50대'];
export const speakingLanguage: string[] = ['전체', '한국어', '일본어', '중국어'];

export const price: Price[] = [
  { optionPrice: '전체', min: 0, max: 100000 },
  { optionPrice: '5,000 ~ 10,000', min: 5000, max: 10000 },
  { optionPrice: '10,000 ~ 20,000', min: 10000, max: 20000 },
  { optionPrice: '20,000 ~ 30,000', min: 20000, max: 30000 },
  { optionPrice: '30,000 ~ 40,000', min: 30000, max: 40000 },
  { optionPrice: '50,000 ~', min: 50000, max: 100000 },
];

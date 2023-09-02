import supabase from '../supabase';
import { SelectedFilters } from '../components/list/utility';

const PAGE_SIZE = 5;

export const getTutorListPageData = async (page = 1, selectedFilters: SelectedFilters, searchText: string) => {
  const { gender, level, minPrice, maxPrice, location1, location2, age, classStyle, speakingLanguage } = selectedFilters;

  let query = supabase.from('tutor_info_join').select('*');

  //성별
  if (gender.length !== 0) {
    query = query.in('gender', gender);
  }
  //난이도
  if (level.length !== 0) {
    query = query.contains('class_level', level);
  }
  //언어
  if (speakingLanguage.length !== 0) {
    query = query.contains('speaking_language', speakingLanguage);
  }
  //나이
  if (age.length !== 0) {
    const minAge = age.sort()[0];
    const maxAge = age.sort()[age.length - 1];
    query = query.gte('age', minAge).lte('age', maxAge);
  }
  //검색
  if (searchText) {
    query = query.textSearch('tutor_name', `${searchText}`);
  }
  //가격
  if (minPrice >= 0 && maxPrice) {
    if (classStyle === 'onLine') {
      console.log('sdfsdf');
      query = query.gte('tuition_fee_online', minPrice).lte('tuition_fee_online', maxPrice);
    } else {
      query = query.gte('tuition_fee_offline', minPrice).lte('tuition_fee_offline', maxPrice);
    }
  }
  //시
  if (location1) {
    query = query.or(`location1_sido.eq.${location1},location2_sido.eq.${location1}`);

    //군구
    if (location2 !== '') {
      query = query.or(`location2_gugun.eq.${location2},location2_gugun.eq.${location2}`);
    }
  }

  const { data, error } = await query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

import { SelectedFilters } from '../@types/list/listType';
import supabase from '../supabase';

const PAGE_SIZE = 5;

export const getTutorListPageData = async (page = 1, selectedFilters: SelectedFilters, searchText: string) => {
  const { gender, level, minPrice, maxPrice, location1, location2, age, classStyle, speakingLanguage } = selectedFilters;

  let query = supabase.from('tutor_info_join').select('*').eq('role', 'tutor');

  if (gender.length !== 0) {
    query = query.in('gender', gender);
  }

  if (level.length !== 0) {
    query = query.contains('class_level', level);
  }

  if (speakingLanguage.length !== 0) {
    query = query.contains('speaking_language', speakingLanguage);
  }

  if (age.length !== 0) {
    const minAge = age.sort()[0];
    const maxAge = age.sort()[age.length - 1];
    query = query.gte('age', minAge).lte('age', maxAge);
  }

  if (searchText) {
    const searchPattern = `%${searchText}%`;
    query = query.filter('tutor_name', 'ilike', searchPattern);
  }

  if (minPrice >= 0 && maxPrice) {
    if (classStyle === 'onLine') {
      query = query.gte('tuition_fee_online', minPrice).lte('tuition_fee_online', maxPrice);
    } else {
      query = query.gte('tuition_fee_offline', minPrice).lte('tuition_fee_offline', maxPrice);
    }
  }

  if (location1) {
    query = query.or(`location1_sido.eq.${location1},location2_sido.eq.${location1}`);

    if (location2 !== '') {
      query = query.or(`location2_gugun.eq.${location2},location2_gugun.eq.${location2}`);
    }
  }

  const { data, error } = await query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

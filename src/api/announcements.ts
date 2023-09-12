import supabase from '../supabase';
import { Tables } from '../supabase/database.types';

export const ANNOUNCEMENTS_TABLE = 'announcements';
export const ANNOUNCEMENTS_QUERY_KEY = 'allAnnouncements';

export const getAllAnnouncements = async () => {
  const { data, error } = await supabase.from(ANNOUNCEMENTS_TABLE).select().order('create_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const insertNewAnnouncement = async (newAnnouncement: Tables<'announcements'>) => {
  const { error } = await supabase.from(ANNOUNCEMENTS_TABLE).insert(newAnnouncement);

  if (error) console.log(error);
};
